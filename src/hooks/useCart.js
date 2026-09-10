import { useContext } from 'react'
import { CartActionsContext, CartStateContext } from '../context/cart/CartContext'

const useCartContext = (context, hookName) => {
  const value = useContext(context)

  if (!value) {
    throw new Error(`${hookName} must be used inside a CartProvider`)
  }

  return value
}

/** Read cart data. Re-renders when the cart changes. */
export const useCartState = () => useCartContext(CartStateContext, 'useCartState')

/** Dispatch cart actions. Never re-renders when the cart changes. */
export const useCartActions = () => useCartContext(CartActionsContext, 'useCartActions')
