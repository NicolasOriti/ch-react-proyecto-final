import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CheckoutForm } from '../components/CheckoutForm'
import { Message } from '../components/Message'
import { useCartActions, useCartState } from '../hooks/useCart'
import { OutOfStockError, createOrder } from '../services/orders.service'
import { formatPrice } from '../utils/format'

export const CheckoutContainer = () => {
  const { items, totalPrice } = useCartState()
  const { clearCart } = useCartActions()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (items.length === 0) {
    return (
      <Message
        title="No hay productos para comprar"
        description="Agregá productos al carrito antes de ir al checkout."
        actionLabel="Ver catálogo"
        actionTo="/"
      />
    )
  }

  const handleSubmit = async (buyer) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const orderId = await createOrder({
        buyer,
        items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: totalPrice,
      })

      clearCart()
      navigate(`/order/${orderId}`, { replace: true })
    } catch (submitError) {
      setError(
        submitError instanceof OutOfStockError
          ? `Sin stock suficiente para: ${submitError.items.join(', ')}.`
          : 'No pudimos generar la orden. Intentá nuevamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-stone-900">Checkout</h1>
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Tu pedido</h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </p>
      </aside>
    </section>
  )
}
