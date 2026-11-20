/**
 * ORVITO business and site details.
 *
 * Confirmed values come from client-details.md (received 18 November 2026).
 * Every value the client has not confirmed yet is marked TODO.
 * Text values that are still pending start with "TODO:" so they are
 * obvious if they ever show on the page. Pending numbers are `null`.
 * Never replace a TODO with an invented value.
 */

/** True when a value is still a placeholder. Use it to hide or flag pending details. */
export const isPending = (value: unknown): boolean =>
  value === null || value === undefined || (typeof value === 'string' && value.startsWith('TODO'));

export const site = {
  name: 'ORVITO',
  tagline: 'Energy for the long day.',
  description:
    'ORVITO is a 60 g energy bar made in small batches in Gujarat with makhana, dates, roasted nuts, seeds, chocolate and honey. Order on WhatsApp.',
  url: 'https://orvito.in',
  locale: 'en-IN',
  currency: 'INR',
  madeIn: 'Made in India',
  basedIn: 'Gujarat, India',
  footerLine: 'Made with pride in India',
} as const;

export const whatsapp = {
  /** International format, digits only. */
  number: '919426611852',
  /** As people dial it. */
  display: '+91 94266 11852',
  replyHours: '9 am to 8 pm, Monday to Saturday',
  /** Order references look like ORV-WEB-K7Q2. */
  orderRefPrefix: 'ORV-WEB-',
} as const;

export const ordering = {
  paymentMethod: 'UPI, after your order is confirmed on WhatsApp',
  cashOnDelivery: false,
  // TODO: delivery charges (flat, by area or free above an amount)
  deliveryCharges: 'TODO: delivery charges',
  deliveryAreas: 'All India',
  dispatchTime: 'Within 2–5 working days after the order is confirmed and paid',
  /** Shown near every order button. */
  mrpNote: 'MRP inclusive of all taxes',
} as const;

export const business = {
  legalName: 'ORVITO',
  // \u2060 (word joiner) and \u00a0 (no-break space) stop the line breaking inside "3-Saurashtra", "No-21" and "Rajkot - 360005"
  address: '3-\u2060Saurashtra University Karamchari Society, Plot No-\u206021, University Road, Rajkot\u00a0-\u00a0360005, Gujarat',
  // TODO: FSSAI licence or registration number and the FSSAI logo file
  fssaiLicence: 'TODO: FSSAI licence number',
  fssaiLogo: null as string | null, // TODO: path to FSSAI logo image
  /** GST does not apply to ORVITO yet, so no GST number is shown. */
  gstApplicable: false,
  gstin: null as string | null,
  email: 'hello@orvito.in',
  customerCare: {
    name: 'Hem Mehta',
    phone: '+91 94266 11852',
    email: 'hello@orvito.in',
  },
} as const;

export const social = {
  instagram: 'https://www.instagram.com/orvito.in/',
  instagramHandle: '@orvito.in',
} as const;

/** Product facts for The Bar page and the footer. */
export const productFacts = {
  netQuantityGrams: 60,
  format: 'Sealed single-serve bar',
  vegMark: true, // veg mark to be shown; TODO: confirm with final label
  shelfLife: '4 months from the date of manufacture',
  storage: 'Store in a cool, dry place. Keep away from direct sunlight.',
  /** Exactly as the client gave it. TODO: client to confirm cashew (not in the ingredient list). */
  allergens: 'Contains milk, tree nuts (almond, cashew) and peanut.',
  /** In label order, as the client gave it. TODO: check against the final printed label. */
  ingredientsLabelText:
    'Makhana, Dates, Pumpkin Seeds, Roasted Chana Dal, Roasted Almonds, Roasted Peanuts (Sing Dana), Chocolate, Honey',
} as const;

/** The 8 ingredients, in label order. Photos are temporary AI images until real ones arrive. */
export const ingredients = [
  { id: 'makhana', label: 'makhana', note: 'A light, airy crunch', image: '/images/ingredients/makhana.jpg' },
  { id: 'dates', label: 'dates', note: 'Soft and sweet', image: '/images/ingredients/dates.jpg' },
  { id: 'pumpkin-seeds', label: 'pumpkin seeds', note: 'A small, nutty bite', image: '/images/ingredients/pumpkin-seeds.jpg' },
  { id: 'chana-dal', label: 'roasted chana dal', note: 'Toasty and crisp', image: '/images/ingredients/chana-dal.jpg' },
  { id: 'almonds', label: 'roasted almonds', note: 'Roasted for depth', image: '/images/ingredients/almonds.jpg' },
  { id: 'peanuts', label: 'roasted peanuts', note: 'Sing dana, roasted', image: '/images/ingredients/peanuts.jpg' },
  { id: 'chocolate', label: 'chocolate', note: 'A dark, rich finish', image: '/images/ingredients/chocolate.jpg' },
  { id: 'honey', label: 'honey', note: 'Holds it all together', image: '/images/ingredients/honey.jpg' },
] as const;

/**
 * Nutrition per 100 g and per 60 g bar.
 * TODO: all values from the client's lab report (he will send it). Keep `null` until then.
 */
type Nutrient = { label: string; unit: string; per100g: number | null; perBar: number | null };
export const nutrition: Nutrient[] = [
  { label: 'Energy', unit: 'kcal', per100g: null, perBar: null },
  { label: 'Protein', unit: 'g', per100g: null, perBar: null },
  { label: 'Carbohydrate', unit: 'g', per100g: null, perBar: null },
  { label: 'Total sugars', unit: 'g', per100g: null, perBar: null },
  { label: 'Added sugars', unit: 'g', per100g: null, perBar: null },
  { label: 'Dietary fibre', unit: 'g', per100g: null, perBar: null },
  { label: 'Total fat', unit: 'g', per100g: null, perBar: null },
  { label: 'Saturated fat', unit: 'g', per100g: null, perBar: null },
  { label: 'Trans fat', unit: 'g', per100g: null, perBar: null },
  { label: 'Sodium', unit: 'mg', per100g: null, perBar: null },
];
export const nutritionPending = nutrition.every((n) => n.per100g === null);

export const founder = {
  name: 'Hem Mehta',
  role: 'Founder, ORVITO',
  /**
   * Website version of the client's note, lightly edited. TODO: client approval.
   * "Real ingredients. Real energy." was left out: FSSAI treats "real" like "natural".
   */
  note:
    "I'm Hem Mehta, the founder of ORVITO. We're based in Gujarat, and we make our energy bars at home, in small batches, from makhana, nuts, seeds and dates. I started ORVITO because I wanted a snack made from food you can recognise.",
  photo: '/images/founder.jpg' as string | null, // client's photo (20 Nov 2026), cropped 4:5
} as const;

export const bulk = {
  minimumOrder: 200,
  minimumOrderText: '200 bars',
  // TODO: client wrote ₹180 per bar, which is above the ₹120 retail price. Confirm before showing a number.
  pricePerBar: null as number | null,
  priceText: 'Price on enquiry',
  giftBoxes: 'Custom gift boxes on request',
  leadTime: '7–10 working days after confirmation',
  // TODO: one-page product sheet (PDF) for bulk buyers
  productSheet: null as string | null,
} as const;

export const policies = {
  damaged:
    'If your order arrives damaged or you receive the wrong item, send us a photo or an unboxing video on WhatsApp within 48 hours of delivery and we will replace it free of charge.',
  cancellation: 'You can cancel an order before it is dispatched for a full refund.',
  // TODO: client to confirm the refund method (assumed: back to the paying UPI account)
  refundMethod: 'Refunds go back to the UPI account you paid from.',
  refundTime: 'Refunds are processed within 5–7 working days.',
  noReturns:
    'For hygiene and food-safety reasons, we can’t accept returns of food items that are not damaged or wrong. If you have a concern about your order, message us on WhatsApp and we’ll help.',
} as const;

/**
 * "Find the bar": a hidden ORVITO bar in a painting, opened from the Box of 12 card.
 * Finding it unlocks the discount below, claimed on WhatsApp with a code (ORVITO confirms it there).
 * The site cannot check codes, so set limits in the terms and honour one claim per customer on WhatsApp.
 */
export const findTheBar = {
  enabled: true,
  packId: 'box-12',
  discountPercent: 50,
  codePrefix: 'ORV-FIND-',
  terms: 'TODO: offer terms (valid until, one claim per customer, any limit on boxes)',
  sceneCredit: 'Painting by Edwin Lord Weeks (1849–1903), public domain',
} as const;

/**
 * Legal pages (/privacy, /terms, /shipping, /returns) are drafts built only from what the client confirmed.
 * TODO: the client (or their adviser) reviews them; then set reviewed: true and the date.
 */
export const legal = {
  reviewed: false,
  lastUpdated: null as string | null, // e.g. '1 December 2026'
  jurisdiction: 'TODO: courts for disputes (e.g. Rajkot, Gujarat)',
  hosting: 'TODO: hosting provider',
  grievanceOfficer: 'TODO: name of the person who handles privacy requests',
} as const;

/** Customer reviews and promotional videos: the client will send these later. Do not invent any. */
export const reviews: never[] = []; // TODO

export const navLinks = [
  { label: 'The Bar', href: '/the-bar' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Bulk & Gifting', href: '/bulk-and-gifting' },
  // FAQ is not in the top menu (client's choice, 20 Nov 2026); it stays in the footer.
] as const;

/** Footer: three link columns (layout modelled on the RXBAR footer), then social links and policies. */
export const footerColumns = [
  [
    { label: 'The Bar', href: '/the-bar' },
    { label: "What's Inside", href: '/the-bar#ingredients-title' },
    { label: 'Label & Nutrition', href: '/the-bar#facts-title' },
    { label: 'Choose Your Pack', href: '/#order' },
  ],
  [
    { label: 'Our Story', href: '/our-story' },
    { label: 'Bulk & Gifting', href: '/bulk-and-gifting' },
    { label: 'Bulk Enquiry', href: '/bulk-and-gifting#enquiry' },
    { label: 'FAQ', href: '/faq-and-contact' },
  ],
  [
    { label: 'Contact Us', href: '/faq-and-contact#contact' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
  ],
] as const;

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Refunds', href: '/returns' },
] as const;
