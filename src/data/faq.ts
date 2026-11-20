/**
 * Questions and answers for the FAQ page and the home page preview.
 * Answers are lists of text segments; a { pending } segment shows a clearly marked placeholder
 * for a detail the client has not confirmed yet. Never invent those details.
 */
import { bulk, isPending, ordering, policies, productFacts, whatsapp } from './site';

export type Segment = string | { pending: string } | { link: string; href: string };
export interface Faq {
  id: string;
  question: string;
  answer: Segment[];
}

const deliveryCharges: Segment = isPending(ordering.deliveryCharges)
  ? { pending: 'Delivery charges to be confirmed.' }
  : `${ordering.deliveryCharges}.`;

export const faqs: Faq[] = [
  {
    id: 'ingredients',
    question: "What's in an ORVITO bar?",
    answer: [`${productFacts.ingredientsLabelText}. That's the full list, in label order.`],
  },
  {
    id: 'order',
    question: 'How do I order?',
    answer: [
      'Choose a pack and tap "Order on WhatsApp". A message with your order opens in WhatsApp; add your name, address and pincode and send it. We confirm the total there and share UPI details. Your order is dispatched once it is paid.',
    ],
  },
  {
    id: 'payment',
    question: 'How do I pay?',
    answer: [`By ${ordering.paymentMethod}. We don't offer cash on delivery.`],
  },
  {
    id: 'delivery',
    question: 'Where do you deliver, and how long does it take?',
    answer: [
      `We deliver across India. Orders are dispatched within 2–5 working days after they are confirmed and paid. `,
      deliveryCharges,
    ],
  },
  {
    id: 'allergens',
    question: 'Does ORVITO contain allergens?',
    answer: [`Yes. ${productFacts.allergens} Please check the label before eating if you have an allergy.`],
  },
  {
    id: 'storage',
    question: 'How long does a bar keep, and how should I store it?',
    answer: [`Each bar keeps for ${productFacts.shelfLife}. ${productFacts.storage}`],
  },
  {
    id: 'damaged',
    question: 'What if my order arrives damaged or wrong?',
    answer: [policies.damaged],
  },
  {
    id: 'cancel',
    question: 'Can I cancel my order?',
    answer: [`${policies.cancellation} ${policies.refundMethod} ${policies.refundTime}`],
  },
  {
    id: 'bulk',
    question: 'Do you take bulk or gifting orders?',
    answer: [
      `Yes, for hotels, offices, gyms and gifting. The minimum order is ${bulk.minimumOrderText}, custom gift boxes are available on request, and bulk orders take ${bulk.leadTime}. `,
      { link: 'Send a bulk enquiry', href: '/bulk-and-gifting#enquiry' },
      '.',
    ],
  },
  {
    id: 'hours',
    question: 'When do you reply on WhatsApp?',
    answer: [`${whatsapp.replyHours.charAt(0).toUpperCase() + whatsapp.replyHours.slice(1)}.`],
  },
];

/** The four shown on the home page. */
export const faqPreview = ['order', 'delivery', 'allergens', 'storage'].map((id) => faqs.find((f) => f.id === id)!);
