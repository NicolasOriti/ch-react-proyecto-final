import { Link } from 'react-router'
import { ItemCount } from './ItemCount'
import { useAddToCart } from '../hooks/useAddToCart'
import { formatPrice } from '../utils/format'

export const Item = ({ product }) => {
  const { isAdded, addToCart } = useAddToCart(product)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/item/${product.id}`} className="aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wide text-amber-700">{product.origin}</p>
        <h3 className="font-semibold text-stone-900">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-stone-500">{product.description}</p>

        <div className="mt-auto flex items-baseline justify-between gap-2 pt-3">
          <span className="text-lg font-semibold text-stone-900">{formatPrice(product.price)}</span>
          <Link
            to={`/item/${product.id}`}
            className="text-sm font-medium text-stone-500 underline-offset-4 transition hover:text-stone-900 hover:underline"
          >
            Ver detalle
          </Link>
        </div>

        <div className="border-t border-stone-100 pt-3">
          {isAdded ? (
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-stone-700"
            >
              En el carrito — ver carrito
            </Link>
          ) : (
            <ItemCount stock={product.stock} onAdd={addToCart} variant="compact" />
          )}
        </div>
      </div>
    </article>
  )
}
