import { useState } from 'react'

const VARIANTS = {
  detail: {
    wrapper: 'flex flex-col gap-3',
    stepper: 'gap-1 p-1',
    control: 'size-9 text-lg',
    value: 'w-10',
    action: 'px-6 py-3 text-sm',
    actionLabel: 'Agregar al carrito',
    emptyMessage: 'rounded-xl bg-stone-100 px-4 py-3 text-sm',
  },
  compact: {
    wrapper: 'flex items-center gap-2',
    stepper: 'gap-0.5 p-0.5',
    control: 'size-7 text-base',
    value: 'w-7 text-sm',
    action: 'flex-1 px-3 py-2 text-xs',
    actionLabel: 'Agregar',
    emptyMessage: 'rounded-lg bg-stone-100 px-3 py-2 text-xs',
  },
}

export const ItemCount = ({ stock, initial = 1, onAdd, variant = 'detail' }) => {
  const [quantity, setQuantity] = useState(initial)
  const styles = VARIANTS[variant]

  const changeQuantity = (delta) => {
    setQuantity((current) => Math.min(Math.max(current + delta, 1), stock))
  }

  const handleAdd = () => {
    onAdd(quantity)
    setQuantity(initial)
  }

  if (stock === 0) {
    return (
      <p className={`${styles.emptyMessage} font-medium text-stone-500`}>Producto sin stock</p>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={`flex w-fit items-center rounded-full border border-stone-200 ${styles.stepper}`}>
        <button
          type="button"
          aria-label="Restar una unidad"
          onClick={() => changeQuantity(-1)}
          disabled={quantity <= 1}
          className={`grid place-items-center rounded-full text-stone-700 transition hover:bg-stone-100 disabled:opacity-30 ${styles.control}`}
        >
          −
        </button>
        <span className={`text-center font-semibold tabular-nums ${styles.value}`}>{quantity}</span>
        <button
          type="button"
          aria-label="Sumar una unidad"
          onClick={() => changeQuantity(1)}
          disabled={quantity >= stock}
          className={`grid place-items-center rounded-full text-stone-700 transition hover:bg-stone-100 disabled:opacity-30 ${styles.control}`}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`rounded-full bg-amber-700 font-semibold text-white transition hover:bg-amber-800 ${styles.action}`}
      >
        {styles.actionLabel}
      </button>

      {variant === 'detail' && <p className="text-xs text-stone-500">{stock} unidades disponibles</p>}
    </div>
  )
}
