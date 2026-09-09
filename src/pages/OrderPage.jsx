import { useCallback } from 'react'
import { Link, useParams } from 'react-router'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { useAsync } from '../hooks/useAsync'
import { getOrderById } from '../services/orders.service'
import { formatDate, formatPrice } from '../utils/format'

export const OrderPage = () => {
  const { orderId } = useParams()
  const fetchOrder = useCallback(() => getOrderById(orderId), [orderId])
  const { data: order, error, isLoading } = useAsync(fetchOrder)

  if (isLoading) return <Loader label="Buscando tu orden..." />

  if (error || !order) {
    return (
      <Message
        tone="error"
        title="No encontramos esa orden"
        description="Verificá el identificador e intentá nuevamente."
        actionLabel="Volver al catálogo"
        actionTo="/"
      />
    )
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6">
      <header className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        <h1 className="text-2xl font-semibold">¡Gracias por tu compra, {order.buyer.name}!</h1>
        <p className="mt-2 text-sm">Guardá este número de orden para hacer el seguimiento:</p>
        <p className="mt-3 rounded-xl bg-white px-4 py-3 font-mono text-sm text-stone-900">
          {order.id}
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Detalle</h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-stone-200 pt-3 font-semibold text-stone-900">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </p>
        {order.createdAt && (
          <p className="mt-3 text-xs text-stone-500">Fecha: {formatDate(order.createdAt)}</p>
        )}
      </div>

      <Link
        to="/"
        className="w-fit rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
      >
        Volver al catálogo
      </Link>
    </section>
  )
}
