import { Link } from 'react-router'
import { CartItem } from './CartItem'
import { Message } from './Message'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

export const Cart = () => {
  const { items, totalPrice, totalQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <Message
        title="Tu carrito está vacío"
        description="Agregá algún café del catálogo para continuar."
        actionLabel="Ver catálogo"
        actionTo="/"
      />
    )
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-stone-900">Tu carrito</h1>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
        <button
          type="button"
          onClick={clearCart}
          className="w-fit text-sm font-medium text-stone-500 transition hover:text-red-600"
        >
          Vaciar carrito
        </button>
      </div>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Resumen</h2>
        <dl className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
          <div className="flex justify-between">
            <dt>Unidades</dt>
            <dd>{totalQuantity}</dd>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-semibold text-stone-900">
            <dt>Total</dt>
            <dd>{formatPrice(totalPrice)}</dd>
          </div>
        </dl>
        <Link
          to="/checkout"
          className="mt-6 block rounded-full bg-amber-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Finalizar compra
        </Link>
      </aside>
    </section>
  )
}
