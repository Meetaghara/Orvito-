# ORVITO: Google Flow prompts for temporary images and videos

These images and videos are temporary placeholders for building the site. Replace the cut-bar photo, the packs and anything showing the inside of the bar with the client's real photos before launch.

## How the client's animation reference (brandemic.in) is used

| Brandemic effect | ORVITO version | Asset from this file |
|---|---|---|
| Showreel video in the hero | A calm looping film of the bar | Video 1: hero loop |
| Headings revealing as you scroll | Serif headings rise in line by line | Built in code, no asset |
| Parallax images | Ingredient circles and the cut bar drift as you scroll | Images 3 and 4 |
| Moving logo strip | The honey band scrolls sideways | Built in code, no asset |
| Our signature addition | The wrapper opens as you scroll and the ingredients float out | Video 2: unwrap sequence |
| Smooth scrolling and page changes | Whole site glides | Built in code, no asset |

Video 5 is a rough preview of all of this together, to help you picture it before the build.

## Settings in Flow

- Attach two reference images to every image prompt: the **single upright bar** image and the **ORVITO logo** image.
- Generate 2–4 versions of each prompt and keep the best.
- For videos, use **Frames to video**: set the image you generated as the first frame, so the bar looks the same in the video.
- If the old "100% Natural" line appears on the wrapper, regenerate.

## Where to save the files

```
Orvito/public/images/bar-hero.jpg
Orvito/public/images/bar-open.jpg
Orvito/public/images/ingredients/makhana.jpg   (and dates, pumpkin-seeds, chana-dal, almonds, peanuts, chocolate, honey)
Orvito/public/images/cut-bar.jpg
Orvito/public/images/packs/single.jpg, box-6.jpg, box-12.jpg
Orvito/public/images/made-for/busy-days.jpg, long-journeys.jpg, between-meals.jpg, extra-energy.jpg
Orvito/public/video/hero-loop.mp4, hero-loop-mobile.mp4, unwrap.mp4
```

---

## Images

### 1. Hero bar (wide 16:9) → `bar-hero.jpg`

```
Premium product photo of the uploaded black ORVITO energy bar floating at a 30 degree angle in the centre of a pure black background. A soft rim light traces the edges of the glossy wrapper and a faint warm glow sits behind it. Crisp crimped ends. Use the uploaded logo for the exact ORVITO lettering, and show only "ORVITO" and "Energy Bar" on the wrapper. The bar fills about 60% of the frame height. Wide 16:9 image, no other text.
```

### 2. Bar half unwrapped (wide 16:9) → `bar-open.jpg`

This is the last frame of the unwrap video.

```
The same black ORVITO energy bar at the same 30 degree angle on the same pure black background and lighting, with the wrapper peeled back halfway to reveal the bar inside: a dense bar of makhana, dates, roasted nuts and seeds with dark chocolate. A few pieces of makhana, almonds and pumpkin seeds float around it. Wide 16:9 image, no other text.
```

### 3. Ingredients (square, one per ingredient) → `ingredients/<name>.jpg`

Run this 8 times, replacing `[INGREDIENT]` with: makhana (fox nuts), whole dates, pumpkin seeds, roasted chana dal, roasted almonds, roasted peanuts, chunks of dark chocolate, golden honey with a wooden honey dipper.

```
Top-down close-up photo of [INGREDIENT] filling the entire frame edge to edge on a pure black background. Soft studio light, warm natural colours, sharp detail, premium food photography. Square image, no text, no bowl edges visible.
```

### 4. Cut bar (wide) → `cut-bar.jpg`

Temporary only. Use the client's real photo before launch.

```
Extreme close-up of a dense energy bar cut in half on a matte black surface, showing makhana, dates, almonds, peanuts and pumpkin seeds bound together, with dark chocolate. Dramatic side light, shallow depth of field, a few crumbs and seeds scattered around. Wide 16:9 image, no text.
```

### 5. Packs (4:3, light grey background) → `packs/`

These match the light grey photo area on the pack cards in the chosen layout.

```
Product photo of the uploaded black ORVITO energy bar lying flat on a plain light grey background, soft even studio light, gentle shadow. Show only "ORVITO" and "Energy Bar" on the wrapper. 4:3 image.
```
```
Product photo of a matte black gift box holding 6 ORVITO energy bars, lid off and resting beside it, the white ORVITO wordmark on the lid, on a plain light grey background, soft studio light. Use the uploaded logo for the exact lettering. 4:3 image.
```
```
Product photo of a larger matte black box holding 12 ORVITO energy bars in two neat rows, lid resting beside it with the white ORVITO wordmark, on a plain light grey background, soft studio light. Use the uploaded logo for the exact lettering. 4:3 image.
```

### 6. Made for (portrait 4:5) → `made-for/`

No faces, so nothing looks like a fake customer.

```
Moody dark photo: a hand reaching for a black ORVITO energy bar beside a laptop on a dark wooden desk at night, warm desk-lamp light, no face visible. Portrait 4:5.
```
```
Moody dark photo: a black ORVITO energy bar tucked into the side pocket of a travel backpack in an airport at dusk, warm window light, no faces visible. Portrait 4:5.
```
```
Moody dark photo: a black ORVITO energy bar beside a cup of coffee on a dark stone table, soft afternoon light, no people. Portrait 4:5.
```
```
Moody dark photo: a black ORVITO energy bar resting on a gym bench next to a towel and a water bottle, low dramatic light, no faces visible. Portrait 4:5.
```

---

## Videos

Flow videos are about 8 seconds. The website plays them muted, so any sound Flow adds doesn't matter.

### Video 1: Hero loop (16:9) → `hero-loop.mp4`

Frames to video, first frame: `bar-hero.jpg`.

```
The black ORVITO energy bar floats gently in place on a pure black background and slowly rotates a few degrees back and forth. The rim light glides along the glossy wrapper and a few fine dust particles drift through the light. Static camera, calm and premium, slow movement that loops smoothly, no new text appears.
```

Make a portrait 9:16 version with the same prompt for phones → `hero-loop-mobile.mp4`.

### Video 2: Unwrap sequence (16:9) → `unwrap.mp4`

Frames to video, first frame: `bar-hero.jpg`, last frame: `bar-open.jpg`.

```
Slow, smooth product shot on a pure black background. The black ORVITO energy bar holds still, then its wrapper peels open from the top to reveal the bar inside. Pieces of makhana, dates, almonds and pumpkin seeds float gently out and settle around it. Static camera, no cuts, soft studio light, calm and premium.
```

Claude Code will turn this video into an image sequence that plays as the visitor scrolls.

### Video 3 (optional): Ingredients gather (16:9)

```
On a pure black background, eight ingredients float in slowly from the edges of the frame: makhana, dates, pumpkin seeds, roasted chana dal, almonds, peanuts, dark chocolate pieces and a drop of honey. They settle in a neat ring around the black ORVITO energy bar in the centre. Soft studio light, static camera, smooth and calm.
```

### Video 4 (optional): Cut bar push-in (16:9)

Frames to video, first frame: `cut-bar.jpg`.

```
A very slow camera push-in towards the cut energy bar, revealing more texture of the nuts, seeds and dates. A few crumbs settle. Dramatic side light, shallow depth of field, calm.
```

### Video 5: Rough preview of the whole site (16:9)

This is only to picture the motion; the text in it will warp. First, crop the desktop half of the client's chosen layout image (Windows Snipping Tool works), then use it as the first frame.

```
A smooth screen recording of this dark website scrolling slowly from top to bottom. The large white headline rises in line by line, the black energy bar floats and slowly turns, the round ingredient photos pop in one after another, the tilted golden band slides sideways like a news ticker, and the close-up photo of the bar zooms out slightly as it passes. Smooth, calm, premium, no mouse cursor.
```
