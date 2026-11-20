# ORVITO website

Website for ORVITO, a new energy bar brand from Rajkot, Gujarat, India. There is one product: a sealed 60 g single-serve energy bar. Orders are taken on WhatsApp; there is no payment gateway yet.

## Project status

- Layout: chosen and approved by the client. See "Chosen layout" below and the image `design/layout-reference.jpg`.
- Many client inputs are still pending. Use clearly marked placeholders (see "Placeholders") and never invent real-looking values.

## Chosen layout

The client approved the dark layout in `design/layout-reference.jpg` (desktop on the left, mobile on the right). Follow it closely. It is an AI concept image, so fix these mistakes instead of copying them:
- Show exactly 8 ingredients. The image repeats chana dal and leaves an empty slot.
- The middle pack is "Box of 6", not "Box of 8".
- All boxes are matte black with the white ORVITO wordmark, not brown cardboard.
- Ignore the small gibberish text on the wrapper and the pack cards.
- Text on the honey band is black, for contrast.

Look and feel: the whole site sits on black `#0B0B0B`. Headings are white; body text is white at about 75% opacity. The bar is the brightest object on screen, lit with a soft rim light. Plenty of empty space.

Home page, top to bottom:
1. **Navigation** on black: ORVITO wordmark on the left; links The Bar, Our Story, Bulk & Gifting, FAQ; a honey "Order on WhatsApp" button on the right. On mobile: wordmark and a menu icon, plus a sticky honey "Order on WhatsApp" button fixed to the bottom of the screen.
2. **Hero**: in the left column, the headline "Energy for the long day." in large white Bodoni Moda over two lines, the sub-line "Makhana, dates, roasted nuts, seeds, chocolate and honey." in Jost Light, a filled honey "Order on WhatsApp" button and a white outlined "Bulk & Gifting" button. In the right column, the black bar floating at about 30 degrees with a soft glow behind it. On mobile, the bar sits above the text.
3. **What goes inside**: a centred serif heading and 8 circular ingredient photos with lowercase labels underneath. Desktop: 4 per row in 2 rows. Mobile: 4 per row in 2 rows, smaller.
4. **Stats band**: a full-width honey band, tilted about -3 degrees on desktop, reading "60 g · 8 ingredients · Sealed single-serve · Made in India" in black serif and running as a slow continuous ticker. On mobile the band is flat, ivory `#F3EDE2`, with text in `#8A5A12`.
5. **Cut bar**: a full-width close-up photo of the bar cut open, showing the nuts and seeds, on black.
6. **Made for**: four dark cards (Busy days, Long journeys, Between meals, Extra energy). Not in the image; style it like the rest.
7. **Choose Your Pack**: three dark cards (`#151515` background, 1 px border at 10% white, 12 px corners). Each has a light grey product photo area on top, the pack name, a one-line description, the MRP and a honey "Order on WhatsApp" button. The allergen line and a delivery note sit under the cards. On narrow phones the cards become a swipeable row.
8. **Founder note**, **bulk and gifting teaser** and **FAQ preview** (4 questions). Not in the image; style them like the rest.
9. **Footer** (layout from the RXBAR footer, chosen 18 Nov 2026, in ORVITO black): three link columns (product, brand, help) with a honey "Order on WhatsApp" pill at the end of the third; a centred social row (Instagram, WhatsApp); "© year ORVITO · Made with pride in India"; underlined policy links (Privacy, Terms, Shipping, Returns); then the FSSAI business details in small mono type. Link data lives in `footerColumns` and `legalLinks` in `src/data/site.ts`. No giant wordmark; do not add it back.

The other pages use the same look: black background, serif headings, honey only on buttons and small highlights.

Motion for this layout:
- Hero: the headline reveals line by line on load and its last word cycles; the bar fades in, floats gently and tilts slightly towards the mouse on desktop.
- Scrolling from the hero: the bar drifts and rotates while the ingredient circles pop in one after another. Later, when the video frames exist, replace this with the pinned wrapper-opening sequence.
- Honey band: a continuous ticker that speeds up with scroll speed and follows scroll direction.
- Cut bar: a slow zoom-out parallax as it scrolls through the screen.
- Cards: stagger in as they enter; lift slightly on hover.

## Tech stack

- Astro with static output; plain CSS with custom properties. No CSS framework unless asked.
- GSAP 3.13 or later with ScrollTrigger, SplitText and ScrollSmoother for motion. GSAP and all its plugins are free for commercial use.
- Astro View Transitions for smooth page changes.
- No React unless a component truly needs it. Keep JavaScript small.
- Deploy as a static site (for example Vercel or Netlify) on the client's .in domain.

## Brand and design rules

Colours:
- Black `#0B0B0B` and white `#FFFFFF` are the main colours.
- Makhana ivory `#F3EDE2`: optional soft background, use sparingly.
- Honey amber `#C8902E`: primary buttons and small highlights only, under about 10% of any screen. Never use it for text on light backgrounds; on light backgrounds use `#8A5A12` for text.
- No gradients, gold foil or metallic effects.

Fonts (changed 18 Nov 2026; do not switch back to Bodoni Moda or Jost):
- Headings: Instrument Serif 400 (regular and italic), 24 px and above, italic for emphasis words. It has no bold, so never set headings above 400. It has no rupee sign, so prices use Geist.
- Body, navigation, buttons and prices: Geist (variable; 400 and 500).
- Label details: Geist Mono for eyebrows, ingredient names, product facts, nutrition, pack sizes, totals, order notes and footer business details.
- Tokens: `--font-serif`, `--font-sans`, `--font-mono`, `--font-logo` in `src/styles/tokens.css`. All self-hosted WOFF2 in `public/fonts`, set up in `src/styles/fonts.css`.

Style: premium, minimal, editorial and calm. Generous spacing, one idea per section, short confident sentences.

Logo: the ORVITO wordmark is a high-contrast serif. Use the client's logo file when it arrives; until then, the wordmark uses `--font-logo`, a five-letter subset of Bodoni Moda (`public/fonts/orvito-wordmark.woff2`) that matches the logo on the pack. Nothing else on the site uses it.

## Pages

1. Home `/`
2. The Bar `/the-bar`: product, ingredients and quality
3. Our Story `/our-story`
4. Bulk & Gifting `/bulk-and-gifting`: enquiry form, minimum order quantity, gift boxes, downloadable one-page product sheet (PDF)
5. FAQ & Contact `/faq-and-contact`
6. Legal: `/privacy`, `/terms`, `/shipping`, `/returns`

Home page sections: see "Chosen layout" above.

Ingredients, in this order unless the final label says otherwise: makhana, dates, pumpkin seeds, roasted chana dal, roasted almonds, roasted peanuts, chocolate, honey.

Allergens: "Contains milk, tree nuts and peanuts." Show this line next to every order button.

## Motion (reference: brandemic.in)

Use these effects:
- ScrollSmoother smooth scrolling across the site.
- SplitText heading reveals (lines or characters, masked, small stagger) as each section enters.
- Hero: the last word of the headline cycles (day, meeting, journey, workout).
- Parallax on ingredient photos and the cut-bar image.
- Thin divider lines that draw themselves.
- A horizontal text ticker: "Busy days · Long journeys · Between meals · Made in India".
- A custom cursor that reads "Order" over WhatsApp buttons (desktop with a fine pointer only).
- Signature moment: a pinned scroll sequence where the wrapper opens and the bar and ingredients appear. Use an image sequence or video, not 3D.
- Smooth transitions between pages.

Rules:
- Animate only `transform` and `opacity`.
- Respect `prefers-reduced-motion`: turn off smooth scrolling, pinning and parallax, and use simple fades instead.
- Use `gsap.matchMedia()` to give mobile lighter timelines.
- Emil Kowalski's skills are installed in `.claude/skills`. Use `animate` and `choreograph` for curves, durations and sequencing, and run `review-animations` and `animation-performance` before finishing each section.
- The effects listed above are approved by the client. Use the skills to tune how each effect feels, not to remove it. If a skill suggests dropping an approved effect, ask me first.
- Ignore `animate-expo`, `write-swift` and `ask-sonner`; they are for other platforms and libraries.

## WhatsApp ordering

- Keep all product and pack data in `src/data/products.ts` (name, pack size, net quantity, MRP, price, image, allergen text) and business details in `src/data/site.ts`.
- "Order on WhatsApp" buttons build a link of the form `https://wa.me/<number>?text=<URL-encoded message>`. The number is in international format, digits only, read from `src/data/site.ts`.
- The pre-filled message includes the pack, quantity, total, pincode, name, address and an order reference such as `ORV-WEB-6`.
- Pack selector: Single bar, Box of 6, Box of 12, with a quantity stepper; the price updates live.
- Build the order button as one component with a `mode` prop (`whatsapp` now, a payment gateway later) so checkout can be added without a redesign.
- Near every order button show: MRP inclusive of all taxes, delivery information, reply hours and the allergen line.

## Wording rules (FSSAI)

Never write:
- "100% natural", "all natural", "natural" describing the bar, or "100%" anything
- "no added sugar" or "sugar-free" (the bar contains honey and chocolate)
- "healthy", "guilt-free" or "superfood"
- health or disease benefits (immunity, diabetes, weight loss, heart health)
- "high protein" unless the lab values qualify
- comparisons with named competitor brands
- fake reviews, star ratings or testimonials

Use instead: "Made with makhana, dates, nuts and seeds", "Sweetened with dates and honey", "A proper snack for long days", and plain descriptions of taste and texture.

## Required business details

Show in the footer and on The Bar page: FSSAI licence number and logo, GST number, registered business name and address, customer care contact (name, phone, email), net quantity, MRP inclusive of all taxes, shelf life, storage instructions, veg mark, ingredients, allergens, and a nutrition table per 100 g and per 60 g bar. Link the privacy, terms, shipping and returns pages from the footer.

## Placeholders

Keep every pending value in `src/data/site.ts` and `src/data/products.ts`, marked with `TODO`:
- prices, delivery charges, delivery areas, dispatch time, payment method
- WhatsApp number and reply hours
- nutrition values, shelf life, storage and final ingredient wording
- FSSAI number, GST number, business name, address, customer care contact
- founder story and photo
- product photos, customer reviews and promotional videos (the client will send these later)

Use neutral grey image placeholders labelled with what goes there. Never generate fake people, fake reviews or invented numbers.

## Performance and accessibility

- Targets on a mid-range Android phone over 4G: LCP under 2.5 s, CLS under 0.1, INP under 200 ms.
- Images in AVIF or WebP with width and height set; lazy-load everything below the fold.
- Hero video under 1.5 MB, muted, `playsinline`, with a poster image.
- Keep shipped JavaScript under about 120 KB gzipped.
- WCAG AA contrast, visible keyboard focus, alt text on every image and a logical heading order.

## How to work

- Build one section at a time and show it before moving on.
- Ask before adding a new library.
- Check every section at 375 px (mobile) and 1440 px (desktop) wide.
- Components go in `src/components`, pages in `src/pages`, data in `src/data`.
