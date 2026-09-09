export const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
})

export const initialCartState = Object.freeze({ items: [] })

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const addItem = (state, { product, quantity }) => {
  const existing = state.items.find((item) => item.id === product.id)

  if (!existing) {
    return {
      ...state,
      items: [...state.items, { ...product, quantity: clamp(quantity, 1, product.stock) }],
    }
  }

  return {
    ...state,
    items: state.items.map((item) =>
      item.id === product.id
        ? { ...item, quantity: clamp(item.quantity + quantity, 1, item.stock) }
        : item,
    ),
  }
}

const removeItem = (state, { productId }) => ({
  ...state,
  items: state.items.filter((item) => item.id !== productId),
})

const updateQuantity = (state, { productId, quantity }) => ({
  ...state,
  items: state.items.map((item) =>
    item.id === productId ? { ...item, quantity: clamp(quantity, 1, item.stock) } : item,
  ),
})

const handlers = {
  [CART_ACTIONS.ADD_ITEM]: addItem,
  [CART_ACTIONS.REMOVE_ITEM]: removeItem,
  [CART_ACTIONS.UPDATE_QUANTITY]: updateQuantity,
  [CART_ACTIONS.CLEAR]: () => initialCartState,
}

export const cartReducer = (state, action) => {
  const handler = handlers[action.type]

  if (!handler) {
    throw new Error(`Unknown cart action: ${action.type}`)
  }

  return handler(state, action.payload)
}
