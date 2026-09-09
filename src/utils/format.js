const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export const formatPrice = (value) => currencyFormatter.format(value)

export const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp)

  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long', timeStyle: 'short' }).format(date)
}
