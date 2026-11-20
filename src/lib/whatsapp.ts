/**
 * WhatsApp order links. Pure functions: used at build time (Astro) and in the browser.
 * Link form: https://wa.me/<number>?text=<URL-encoded message>
 */
import { isPending, whatsapp } from '../data/site';
import { formatPrice, getPack, unitPrice, type PackId } from '../data/products';

export interface OrderDetails {
  packId?: PackId;
  quantity?: number;
  /** Order reference, e.g. ORV-WEB-K7Q2. Generated in the browser at click time. */
  ref?: string;
}

/** A short reference the team can match in WhatsApp, e.g. ORV-WEB-K7Q2. */
export function createOrderRef(): string {
  const id = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${whatsapp.orderRefPrefix}${id}`;
}

/** The pre-filled message. Unknown fields stay blank for the customer to fill in. */
export function buildOrderMessage({ packId, quantity, ref }: OrderDetails = {}): string {
  const pack = packId ? getPack(packId) : undefined;
  const qty = pack ? Math.max(1, quantity ?? 1) : undefined;
  const price = pack ? unitPrice(pack) : null;
  const total = pack && qty && price !== null ? formatPrice(price * qty) : '';

  return [
    "Hi ORVITO, I'd like to place an order.",
    '',
    `Order ref: ${ref ?? `${whatsapp.orderRefPrefix}`}`,
    `Pack: ${pack ? `${pack.name}, ${pack.netQuantity}` : ''}`,
    `Quantity: ${qty ?? ''}`,
    `Total: ${total}`,
    'Pincode: ',
    'Name: ',
    'Address: ',
  ].join('\n');
}

/**
 * Full wa.me link. While the number is still a TODO, the link opens WhatsApp
 * without a recipient (the user picks a chat) so nothing points at a wrong number.
 */
export function buildWhatsAppLink(details: OrderDetails = {}): string {
  const number = isPending(whatsapp.number) ? '' : whatsapp.number.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(buildOrderMessage(details))}`;
}

export const whatsappNumberPending = isPending(whatsapp.number);

/** A plain chat link for questions (no order details). */
export function buildContactLink(text = "Hi ORVITO, I have a question."): string {
  const number = isPending(whatsapp.number) ? '' : whatsapp.number.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
