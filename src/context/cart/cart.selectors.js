export const selectItems = (state) => state.items

export const selectTotalQuantity = (state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)

export const selectTotalPrice = (state) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectIsInCart = (state, productId) =>
  state.items.some((item) => item.id === productId)
