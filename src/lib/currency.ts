/**
 * Formate un prix en Franc CFA (XAF)
 * @param price - Le prix à formater
 * @returns Le prix formaté avec la devise XAF
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formate un prix simple sans symbole de devise
 * @param price - Le prix à formater
 * @returns Le prix formaté sans devise
 */
export function formatPriceSimple(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
