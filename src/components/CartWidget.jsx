import { Link } from 'react-router'
import { useCartState } from '../hooks/useCart'

export const CartWidget = () => {
  const { totalQuantity } = useCartState()

  return (
    <Link
      to="/cart"
      aria-label={`Carrito con ${totalQuantity} unidades`}
      className="relative rounded-full p-2 text-stone-700 transition hover:bg-stone-100"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
      </svg>
      {totalQuantity > 0 && (
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-amber-700 text-xs font-semibold text-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  )
}
