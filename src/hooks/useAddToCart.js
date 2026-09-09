import { useCart } from './useCart'

export const useAddToCart = (product) => {
  const { addItem, isInCart } = useCart()

  return {
    isAdded: isInCart(product.id),
    addToCart: (quantity) => addItem(product, quantity),
  }
}
