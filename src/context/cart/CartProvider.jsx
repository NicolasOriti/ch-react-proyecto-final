import { useMemo, useReducer } from 'react'
import { CartActionsContext, CartStateContext } from './CartContext'
import { CART_ACTIONS, cartReducer, initialCartState } from './cart.reducer'
import { selectIsInCart, selectTotalPrice, selectTotalQuantity } from './cart.selectors'

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const actions = useMemo(
    () => ({
      addItem: (product, quantity) =>
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } }),
      removeItem: (productId) =>
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { productId } }),
      updateQuantity: (productId, quantity) =>
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { productId, quantity } }),
      clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR }),
    }),
    [],
  )

  const value = useMemo(
    () => ({
      items: state.items,
      totalQuantity: selectTotalQuantity(state),
      totalPrice: selectTotalPrice(state),
      isInCart: (productId) => selectIsInCart(state, productId),
    }),
    [state],
  )

  return (
    <CartActionsContext.Provider value={actions}>
      <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>
    </CartActionsContext.Provider>
  )
}
