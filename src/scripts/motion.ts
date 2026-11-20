/**
 * ORVITO motion core.
 *
 * - Registers GSAP with ScrollTrigger, ScrollSmoother and SplitText.
 * - Runs every section's motion inside one gsap.matchMedia() so that
 *   reduced motion and mobile get their own (lighter) timelines and
 *   everything is reverted cleanly between Astro View Transitions.
 *
 * Section scripts call `registerMotion(setup)` once at module load.
 * `setup` runs on every page load and receives the active conditions.
 * Rules (CLAUDE.md): animate only transform and opacity; when
 * `reduced` is true use simple fades, with no pinning and no parallax.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export { gsap, ScrollTrigger, ScrollSmoother, SplitText };

export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767.98px)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const;

export type MotionConditions = Record<keyof typeof MEDIA, boolean>;
export type MotionSetup = (conditions: MotionConditions) => void | (() => void);

const setups: MotionSetup[] = [];
let mm: gsap.MatchMedia | null = null;

/** Register a section's motion. It runs inside the shared matchMedia on every page. */
export function registerMotion(setup: MotionSetup) {
  setups.push(setup);
  // If the page is already running, start this setup straight away.
  if (mm) mm.add(MEDIA, (ctx) => setup(ctx.conditions as MotionConditions));
}

/** The active ScrollSmoother, or null when smooth scrolling is off (reduced motion). */
export const getSmoother = () => ScrollSmoother.get() ?? null;

/** Resolves once web fonts are ready. Split text only after this, or lines break wrongly. */
export const fontsReady = () => document.fonts?.ready ?? Promise.resolve();

function init() {
  mm = gsap.matchMedia();

  // Core: smooth scrolling and the generic [data-reveal] fade.
  mm.add(MEDIA, (ctx) => {
    const { motion, reduced, mobile } = ctx.conditions as MotionConditions;

    let smoother: ScrollSmoother | null = null;
    if (motion && document.querySelector('#smooth-wrapper')) {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: mobile ? 0.6 : 1, // seconds to catch up with native scroll
        smoothTouch: false, // native scrolling on touch screens
        effects: !mobile, // data-speed / data-lag parallax on desktop only
        normalizeScroll: false,
      });
    }

    // Simple reveal for any element marked data-reveal.
    // Reduced motion: opacity only, shorter.
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: reduced ? 0 : 24,
        duration: reduced ? 0.4 : 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // Headings marked data-split: lines rise out of a mask as they enter (Brandemic-style).
    // Reduced motion: a plain fade, no movement.
    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      if (reduced) {
        el.classList.add('is-split');
        gsap.from(el, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
        return;
      }
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true, // re-split after fonts load or the width changes
        onSplit(self) {
          el.classList.add('is-split');
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        },
      });
    });

    // Groups marked data-stagger: their [data-stagger-item] children arrive as one wave.
    // The gaps shrink along the group (choreograph: never a uniform stagger).
    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
      if (!items.length) return;
      gsap.from(items, {
        autoAlpha: 0,
        y: reduced ? 0 : 28,
        duration: reduced ? 0.4 : 0.8,
        ease: 'power3.out',
        stagger: { amount: reduced ? 0.12 : Math.min(0.45, items.length * 0.08), ease: 'power2.out' },
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    });

    // Thin divider lines marked data-draw: they draw from left to right as they enter.
    // Reduced motion: they fade in instead.
    gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((line) => {
      gsap.from(line, {
        ...(reduced ? { autoAlpha: 0 } : { scaleX: 0, transformOrigin: '0% 50%' }),
        duration: reduced ? 0.4 : 0.9,
        ease: reduced ? 'power1.out' : 'power3.out',
        scrollTrigger: { trigger: line, start: 'top 92%', once: true },
      });
    });

    // Anchor links (#order, #contact, #enquiry): native jumps land in the wrong place inside
    // ScrollSmoother, so route them through it. Capture phase, so it runs before the page router.
    const scrollToHash = (hash: string, smooth: boolean) => {
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return false;
      const offset = (document.querySelector('header')?.offsetHeight ?? 72) + 16;
      if (smoother) smoother.scrollTo(target, smooth, `top ${offset}px`);
      else target.scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'auto' });
      if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
      return true;
    };
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.target === '_blank') return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      if (scrollToHash(url.hash, true)) {
        e.preventDefault();
        history.pushState(history.state, '', url.hash);
      }
    };
    document.addEventListener('click', onAnchorClick, true);
    if (location.hash) {
      fontsReady().then(() => {
        ScrollTrigger.refresh();
        scrollToHash(location.hash, false);
      });
    }

    return () => {
      smoother?.kill();
      document.removeEventListener('click', onAnchorClick, true);
    };
  });

  // Sections registered by components.
  for (const setup of setups) {
    mm.add(MEDIA, (ctx) => setup(ctx.conditions as MotionConditions));
  }

  // Layout can shift once fonts swap in; recalculate trigger positions.
  fontsReady().then(() => ScrollTrigger.refresh());
}

function destroy() {
  mm?.revert();
  mm = null;
}

// astro:page-load fires on the first load and after every View Transition.
document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
