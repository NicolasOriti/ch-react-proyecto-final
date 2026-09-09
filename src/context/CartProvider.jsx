import { useCallback, useMemo, useState } from 'react'
import { CartContext } from './CartContext'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, quantity) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (!existing) {
        return [...current, { ...product, quantity }]
      }

      return current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
          : item,
      )
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) }
          : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const isInCart = useCallback(
    (productId) => items.some((item) => item.id === productId),
    [items],
  )

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      totalQuantity,
      totalPrice,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, isInCart, totalQuantity, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
