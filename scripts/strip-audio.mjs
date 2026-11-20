/**
 * Remove audio tracks from MP4 files without re-encoding (no ffmpeg needed).
 * Keeps only video tracks, copies their chunks into a new mdat and writes
 * moov before mdat ("faststart") so playback can begin before the whole file loads.
 *
 * Usage: node scripts/strip-audio.mjs public/video/hero-loop.mp4 [more.mp4 ...]
 * The original is replaced in place. Re-run this on the sharper videos when they arrive.
 * (With ffmpeg installed, the equivalent is: ffmpeg -i in.mp4 -c copy -an -movflags +faststart out.mp4)
 */
import { readFileSync, writeFileSync } from 'node:fs';

const CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'dinf']);

function parseBoxes(buf, start, end) {
  const boxes = [];
  let p = start;
  while (p + 8 <= end) {
    let size = buf.readUInt32BE(p);
    const type = buf.toString('latin1', p + 4, p + 8);
    let header = 8;
    if (size === 1) {
      size = Number(buf.readBigUInt64BE(p + 8));
      header = 16;
    } else if (size === 0) size = end - p;
    if (size < header) throw new Error(`Bad box ${type} at ${p}`);
    const box = { type, start: p, end: p + size, header };
    if (CONTAINERS.has(type)) box.children = parseBoxes(buf, p + header, p + size);
    boxes.push(box);
    p += size;
  }
  return boxes;
}

const find = (boxes, path) => {
  let cur = boxes;
  let box;
  for (const t of path.split('/')) {
    box = cur?.find((b) => b.type === t);
    if (!box) return undefined;
    cur = box.children;
  }
  return box;
};

function handlerOf(buf, trak) {
  const hdlr = find(trak.children, 'mdia/hdlr');
  return buf.toString('latin1', hdlr.start + hdlr.header + 8, hdlr.start + hdlr.header + 12);
}

/** Byte ranges of each chunk of a track, in chunk order. */
function chunkRanges(buf, stbl) {
  const body = (t) => {
    const b = stbl.children.find((x) => x.type === t);
    return b && { pos: b.start + b.header + 4, box: b }; // skip version/flags
  };
  const stsz = body('stsz');
  const fixed = buf.readUInt32BE(stsz.pos);
  const count = buf.readUInt32BE(stsz.pos + 4);
  const sizes = Array.from({ length: count }, (_, i) => (fixed ? fixed : buf.readUInt32BE(stsz.pos + 8 + i * 4)));

  const stco = body('stco') ?? body('co64');
  const is64 = stco.box.type === 'co64';
  const nChunks = buf.readUInt32BE(stco.pos);
  const offsets = Array.from({ length: nChunks }, (_, i) =>
    is64 ? Number(buf.readBigUInt64BE(stco.pos + 4 + i * 8)) : buf.readUInt32BE(stco.pos + 4 + i * 4)
  );

  const stsc = body('stsc');
  const nEntries = buf.readUInt32BE(stsc.pos);
  const entries = Array.from({ length: nEntries }, (_, i) => ({
    first: buf.readUInt32BE(stsc.pos + 4 + i * 12),
    perChunk: buf.readUInt32BE(stsc.pos + 8 + i * 12),
  }));

  let sample = 0;
  const ranges = [];
  for (let c = 1; c <= nChunks; c++) {
    let perChunk = 0;
    for (const e of entries) if (e.first <= c) perChunk = e.perChunk;
    let size = 0;
    for (let s = 0; s < perChunk; s++) size += sizes[sample++];
    ranges.push({ offset: offsets[c - 1], size });
  }
  if (sample !== count) throw new Error(`Sample count mismatch: ${sample} vs ${count}`);
  return { ranges, stcoPos: stco.pos, is64 };
}

function stripAudio(file) {
  const buf = readFileSync(file);
  const top = parseBoxes(buf, 0, buf.length);
  const ftyp = top.find((b) => b.type === 'ftyp');
  const moov = top.find((b) => b.type === 'moov');
  if (!ftyp || !moov) throw new Error('Not a standard MP4 (missing ftyp or moov)');

  const traks = moov.children.filter((b) => b.type === 'trak');
  const keep = traks.filter((t) => handlerOf(buf, t) === 'vide');
  const drop = traks.filter((t) => handlerOf(buf, t) !== 'vide');
  if (!drop.length) {
    console.log(`${file}: no audio track, unchanged`);
    return;
  }

  // New moov = moov with dropped traks removed (stco values patched below).
  const parts = [];
  let p = moov.start;
  for (const t of drop.sort((a, b) => a.start - b.start)) {
    parts.push(buf.subarray(p, t.start));
    p = t.end;
  }
  parts.push(buf.subarray(p, moov.end));
  const newMoov = Buffer.concat(parts);
  newMoov.writeUInt32BE(newMoov.length, 0); // moov uses a 32-bit size here
  if (moov.header !== 8) throw new Error('64-bit moov size not supported');

  const removedBefore = (pos) => drop.filter((t) => t.end <= pos).reduce((n, t) => n + (t.end - t.start), 0);

  const ftypBuf = buf.subarray(ftyp.start, ftyp.end);
  const mdatStart = ftypBuf.length + newMoov.length;
  const data = [];
  let cursor = mdatStart + 8;

  for (const trak of keep) {
    const stbl = find(trak.children, 'mdia/minf/stbl');
    const { ranges, stcoPos, is64 } = chunkRanges(buf, stbl);
    const pos = stcoPos - moov.start - removedBefore(stcoPos); // position inside newMoov
    ranges.forEach((r, i) => {
      if (is64) newMoov.writeBigUInt64BE(BigInt(cursor), pos + 4 + i * 8);
      else newMoov.writeUInt32BE(cursor, pos + 4 + i * 4);
      data.push(buf.subarray(r.offset, r.offset + r.size));
      cursor += r.size;
    });
  }

  const mdatBody = Buffer.concat(data);
  const mdatHeader = Buffer.alloc(8);
  mdatHeader.writeUInt32BE(mdatBody.length + 8, 0);
  mdatHeader.write('mdat', 4, 'latin1');

  const out = Buffer.concat([ftypBuf, newMoov, mdatHeader, mdatBody]);
  writeFileSync(file, out);
  console.log(`${file}: removed ${drop.length} non-video track(s), ${buf.length} -> ${out.length} bytes`);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: node scripts/strip-audio.mjs <file.mp4> [...]');
  process.exit(1);
}
files.forEach(stripAudio);
