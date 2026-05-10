export interface OrderItem {
  name: string
  size: string
  color: string
  quantity: number
  price: number
}

export interface OrderData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  measurements: string
  notes: string
  items: OrderItem[]
}

export function buildOrderMessage(data: OrderData): string {
  const total = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const itemsList = data.items
    .map(
      (item) =>
        `• ${item.name}${item.size ? ` | Vel: ${item.size}` : ''}${item.color ? ` | Boja: ${item.color}` : ''} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)} KM`
    )
    .join('\n')

  const msg = [
    `🛍️ *NAJAH ACTIVEWEAR — Nova narudžba*`,
    ``,
    `*👤 Podaci o kupcu:*`,
    `Ime: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Telefon: ${data.phone}`,
    `Adresa: ${data.address}, ${data.city} ${data.postalCode}`,
    `Država: ${data.country}`,
    data.measurements ? `Mjere: ${data.measurements}` : null,
    ``,
    `*📦 Naručeni artikli:*`,
    itemsList,
    ``,
    `*💰 UKUPNO: ${total.toFixed(2)} KM*`,
    data.notes ? `\n*📝 Napomena:* ${data.notes}` : null,
    ``,
    `_Rok izrade: 10–15 radnih dana._`,
  ]
    .filter(Boolean)
    .join('\n')

  return encodeURIComponent(msg)
}

export interface ContactData {
  name: string
  email: string
  subject: string
  message: string
}

export function buildContactMessage(data: ContactData): string {
  const msg = [
    `📩 *Poruka sa NAJAH Activewear web stranice*`,
    ``,
    `*Ime:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Predmet:* ${data.subject}`,
    ``,
    `*Poruka:*`,
    data.message,
  ].join('\n')

  return encodeURIComponent(msg)
}

export function getWhatsAppUrl(encodedMessage: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '387XXXXXXXXX'
  return `https://wa.me/${number}?text=${encodedMessage}`
}
