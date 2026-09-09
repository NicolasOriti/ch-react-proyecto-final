import { useCartActions, useCartState } from './useCart'

export const useAddToCart = (product) => {
  const { isInCart } = useCartState()
  const { addItem } = useCartActions()

  return {
    isAdded: isInCart(product.id),
    addToCart: (quantity) => addItem(product, quantity),
  }
}
