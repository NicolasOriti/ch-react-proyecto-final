import { Link } from 'react-router'
import { useCartActions } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

export const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartActions()

  return (
    <li className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4">
      <img
        src={item.image}
        alt={item.name}
        className="size-24 rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/item/${item.id}`} className="font-semibold text-stone-900 hover:underline">
              {item.name}
            </Link>
            <p className="text-sm text-stone-500">{formatPrice(item.price)} c/u</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-sm font-medium text-red-600 transition hover:underline"
          >
            Eliminar
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-stone-500">
            Cantidad
            <input
              type="number"
              min="1"
              max={item.stock}
              value={item.quantity}
              onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
              className="w-16 rounded-lg border border-stone-300 px-2 py-1 text-center text-stone-900"
            />
          </label>
          <span className="font-semibold text-stone-900">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  )
}
