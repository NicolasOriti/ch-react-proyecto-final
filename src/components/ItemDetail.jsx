import { Link } from 'react-router'
import { ItemCount } from './ItemCount'
import { useAddToCart } from '../hooks/useAddToCart'
import { formatPrice } from '../utils/format'

export const ItemDetail = ({ product }) => {
  const { isAdded, addToCart } = useAddToCart(product)

  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl bg-stone-100">
        <img src={product.image} alt={product.name} className="size-full object-cover" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-wide text-amber-700">{product.origin}</p>
        <h1 className="text-3xl font-semibold text-stone-900">{product.name}</h1>
        <p className="text-2xl font-semibold text-stone-900">{formatPrice(product.price)}</p>
        <p className="text-stone-600">{product.description}</p>

        <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-stone-50 p-4 text-sm">
          <div>
            <dt className="text-stone-500">Tueste</dt>
            <dd className="font-medium text-stone-800">{product.roast}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Notas</dt>
            <dd className="font-medium text-stone-800">{product.notes.join(', ')}</dd>
          </div>
        </dl>

        <div className="pt-2">
          {isAdded ? (
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cart"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Ir al carrito
              </Link>
              <Link
                to="/"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-900"
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ItemCount stock={product.stock} onAdd={addToCart} />
          )}
        </div>
      </div>
    </section>
  )
}
