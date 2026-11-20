/**
 * ORVITO packs. One product (a sealed 60 g single-serve bar) sold in three packs.
 *
 * Prices are the client's confirmed MRPs (18 November 2026). GST does not apply yet.
 * Pack photos are temporary AI images until the client's real photos arrive.
 */
import { productFacts } from './site';

export type PackId = 'single' | 'box-6' | 'box-12';

export interface Pack {
  id: PackId;
  name: string;
  /** Number of 60 g bars in the pack. */
  bars: number;
  /** Net quantity printed on the pack. */
  netQuantity: string;
  /** One-line description for the pack card. */
  description: string;
  /** Maximum retail price in rupees, inclusive of all taxes. */
  mrp: number | null;
  /** Selling price in rupees, if different from MRP. */
  price: number | null;
  image: { src: string | null; alt: string; placeholderLabel: string };
  allergens: string;
}

const BAR_GRAMS = productFacts.netQuantityGrams;

export const packs: Pack[] = [
  {
    id: 'single',
    name: 'Single Bar',
    bars: 1,
    netQuantity: `${BAR_GRAMS} g`,
    description: 'One sealed bar, to try it or to carry today.',
    mrp: 120,
    price: null,
    image: {
      src: '/images/packs/single.jpg',
      alt: 'ORVITO energy bar in its black wrapper',
      placeholderLabel: 'Photo: single bar',
    },
    allergens: productFacts.allergens,
  },
  {
    id: 'box-6',
    name: 'Box of 6',
    bars: 6,
    netQuantity: `6 × ${BAR_GRAMS} g (360 g)`,
    description: 'Six bars for the week ahead.',
    mrp: 649,
    price: null,
    image: {
      src: '/images/packs/box-6.jpg',
      alt: 'Black ORVITO box of 6 bars with one bar beside it',
      placeholderLabel: 'Photo: box of 6',
    },
    allergens: productFacts.allergens,
  },
  {
    id: 'box-12',
    name: 'Box of 12',
    bars: 12,
    netQuantity: `12 × ${BAR_GRAMS} g (720 g)`,
    description: 'Twelve bars for the office drawer, the road or a gift.',
    mrp: 1199,
    price: null,
    image: {
      src: '/images/packs/box-12.jpg',
      alt: 'Black ORVITO box of 12 bars with one bar beside it',
      placeholderLabel: 'Photo: box of 12',
    },
    allergens: productFacts.allergens,
  },
];

export const getPack = (id: PackId) => packs.find((p) => p.id === id);

/** Price used for the order total: selling price if set, otherwise MRP. Null while pending. */
export const unitPrice = (pack: Pack): number | null => pack.price ?? pack.mrp;

/** Price of one bar inside a pack, rounded to the rupee. Null while pending. */
export const pricePerBar = (pack: Pack): number | null => {
  const price = unitPrice(pack);
  return price === null ? null : Math.round(price / pack.bars);
};

/** Formats rupees, or a clear placeholder while the price is pending. */
export const formatPrice = (amount: number | null): string =>
  amount === null
    ? 'Price TBC'
    : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
