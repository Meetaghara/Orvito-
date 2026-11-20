# ORVITO website: build prompts for Claude Code

Paste these into Claude Code one at a time, in order. After each one, preview the site in your browser, ask for changes if needed, and move to the next prompt only when you are happy.

## Before you start

Put these files in your ORVITO folder:

```
orvito-website/
  CLAUDE.md                        (project instructions)
  design/
    layout-reference.jpg           (the layout the client chose)
  public/
    images/
      bar-hero.jpg                 (the bar on pure black, tilted, for the hero)
      ingredients/                 (8 square ingredient photos, see below)
      cut-bar.jpg                  (close-up of the bar cut open)
```

If you don't have an image yet, skip it. Claude Code will use a labelled grey placeholder.

### Temporary images and videos from Google Flow

Until the client sends real photos, make temporary images and videos in Flow using **ORVITO-flow-prompts.md**. It lists every prompt and the exact file name and folder for each result, including the `public/video/` files for the hero loop and the unwrap sequence.

Replace the cut-bar photo with the client's real photo before launch, so customers see the actual inside of the bar.

---

## Prompt 1: Set up the project

```
Read CLAUDE.md and look at design/layout-reference.jpg first.
Then set up the project:
1. Create a new Astro site in this folder with static output.
2. Install GSAP and set up ScrollTrigger, SplitText and ScrollSmoother, with a reduced-motion fallback.
3. Add the Bodoni Moda and Jost fonts, self-hosted as WOFF2.
4. Create CSS variables for the colours, fonts and spacing in CLAUDE.md.
5. Create src/data/site.ts and src/data/products.ts with TODO placeholders for every pending value.
6. Create an empty home page on the black background.
When done, tell me how to preview the site in my browser.
```

## Prompt 2: Navigation and footer

```
Build the navigation and the footer exactly as described in CLAUDE.md under "Chosen layout", matching design/layout-reference.jpg.
- Desktop navigation: ORVITO wordmark left, links The Bar, Our Story, Bulk & Gifting, FAQ, and a honey "Order on WhatsApp" button.
- Mobile navigation: wordmark and a menu icon that opens a full-screen menu, plus a sticky honey "Order on WhatsApp" button at the bottom of the screen.
- Footer: centred ORVITO wordmark, links, business details from src/data/site.ts and "Made with pride in India". On desktop, add the giant ORVITO wordmark that reveals on scroll.
The WhatsApp button should open a wa.me link built from src/data/site.ts.
Check it at 375 px and 1440 px wide.
```

## Prompt 3: Hero

```
Build the hero section to match design/layout-reference.jpg and CLAUDE.md.
- Left: "Energy for the long day." in large white Bodoni Moda over two lines, the sub-line in Jost Light, a honey "Order on WhatsApp" button and a white outlined "Bulk & Gifting" button.
- Right: if public/video/hero-loop.mp4 exists, play it muted and looping with public/images/bar-hero.jpg as the poster (use hero-loop-mobile.mp4 on phones); otherwise use bar-hero.jpg floating at about 30 degrees with a soft glow behind it.
- Motion: the headline reveals line by line on load, the word "day" cycles through day, meeting, journey and workout, the bar fades in and floats gently, and on desktop it tilts slightly towards the mouse.
- On mobile, put the bar above the text.
Use the animate skill for the timing and curves if it is installed.
```

## Prompt 4: What goes inside

```
Build the "What goes inside" section to match the layout image, with exactly 8 ingredients in this order: makhana, dates, pumpkin seeds, roasted chana dal, almonds, peanuts, chocolate, honey.
- Circular photos from public/images/ingredients/ with lowercase labels underneath, 4 per row in 2 rows on desktop and mobile.
- Motion: the heading reveals as it enters; the circles pop in one after another while the hero bar drifts and rotates as you scroll away from the hero.
Use the choreograph skill for the sequence if it is installed.
```

## Prompt 4b (when unwrap.mp4 is ready): Unwrap sequence

```
Turn public/video/unwrap.mp4 into an image sequence (WebP, about 60 frames for desktop and 30 for mobile). Trim the nearly still first second and last 1.5 seconds so every bit of scrolling moves the wrapper. Then build the pinned scroll section between the hero and "What goes inside": as the visitor scrolls, the frames play so the wrapper opens and the ingredients float out, then the page continues. Load the frames only after the hero has loaded, and show a single still frame instead when prefers-reduced-motion is on. Use the choreograph skill for the hand-off into the ingredient circles.
```

## Prompt 5: Honey band and cut bar

```
Build the next two sections from CLAUDE.md:
1. The stats band: a full-width honey band tilted about -3 degrees on desktop, reading "60 g · 8 ingredients · Sealed single-serve · Made in Rajkot" in black serif as a continuous ticker that speeds up with scroll speed and follows scroll direction. On mobile, a flat ivory band with #8A5A12 text.
2. The cut-bar section: public/images/cut-bar.jpg full width on black, with a slow zoom-out parallax as it scrolls.
```

## Prompt 6: Made for

```
Build the "Made for" section: four dark cards for Busy days, Long journeys, Between meals and Extra energy, each with a placeholder image and one short line. Style them to match the rest of the layout. The cards stagger in as they enter and lift slightly on hover.
```

## Prompt 7: Choose Your Pack and WhatsApp ordering

```
Build the "Choose Your Pack" section from CLAUDE.md and the layout image, reading all pack data from src/data/products.ts:
- Three dark cards: Single bar, Box of 6, Box of 12. Each has a product photo area, the pack name, one line of description, the MRP (incl. of all taxes) and a quantity stepper.
- Each card's "Order on WhatsApp" button opens WhatsApp with a pre-filled message: pack, quantity, total, and blank lines for pincode, name and address, plus an order reference such as ORV-WEB-6.
- Under the cards: "Contains milk, tree nuts and peanuts.", the delivery note and the reply hours.
- Build the order button as one component with a mode prop, so a payment gateway can replace WhatsApp later.
- On narrow phones the cards become a swipeable row.
```

## Prompt 8: Founder note, bulk teaser and FAQ preview

```
Build the last home page sections from CLAUDE.md, in the same style:
1. Founder note: a placeholder photo area, a short quote in italic serif and a signature line (all TODO placeholders).
2. Bulk & Gifting teaser: one line about hotels, offices and gifting, with an outlined "Enquire" button linking to /bulk-and-gifting.
3. FAQ preview: 4 questions that open and close smoothly, with a link to the full FAQ page.
Never write fake quotes or reviews.
```

## Prompt 9: Mobile check

```
Go through the whole home page at 375 px and 768 px wide and compare it with the mobile half of design/layout-reference.jpg. Fix spacing, font sizes, image sizes and anything that overflows. Make sure the sticky WhatsApp button never covers important content.
```

## Prompt 10: Other pages

```
Build the remaining pages in the same style, using src/data for all details:
1. The Bar: photo gallery, ingredients in label order, allergen line, nutrition table per 100 g and per 60 g bar (TODO values), net quantity, shelf life, storage, MRP, pack selector, FSSAI number, manufacturer address.
2. Our Story: founder story, why makhana and dates, made in Rajkot, how each batch is made.
3. Bulk & Gifting: who it suits, minimum order, custom gift boxes, an enquiry form that sends the details to WhatsApp, and a download link for the one-page product sheet.
4. FAQ & Contact: full FAQ, WhatsApp, email, enquiry form, business address and customer care details.
Add smooth page transitions between pages.
```

## Prompt 11: Legal pages

```
Create Privacy, Terms, Shipping and Returns pages as simple, readable text pages in the site's style. Write draft text that fits a small Indian food business taking orders on WhatsApp, with TODO markers wherever the client must confirm details. Link them all from the footer.
```

## Prompt 12: Polish and checks

```
Do a final review of the whole site:
1. Run the review-animations and animation-performance skills if they are installed, and fix what they find.
2. Check that prefers-reduced-motion turns off smooth scrolling, pinning and parallax.
3. Check performance on a throttled mobile connection against the targets in CLAUDE.md.
4. Check contrast, keyboard focus, alt text and heading order.
5. Search the whole site for any wording that breaks the rules in CLAUDE.md and fix it.
6. List every TODO placeholder that is still waiting for the client.
```

## Later: launch

When the client's details and photos are in, ask Claude Code to fill the TODO placeholders, then to help you deploy the site to Vercel or Netlify and connect the client's .in domain.
