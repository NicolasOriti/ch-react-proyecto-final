import { collection, doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const ORDERS = 'orders'
const PRODUCTS = 'products'

export class OutOfStockError extends Error {
  constructor(items) {
    super('Some items no longer have enough stock')
    this.name = 'OutOfStockError'
    this.items = items
  }
}

export const createOrder = async ({ buyer, items, total }) =>
  runTransaction(db, async (transaction) => {
    const refs = items.map((item) => doc(db, PRODUCTS, item.id))
    const snapshots = await Promise.all(refs.map((ref) => transaction.get(ref)))

    const unavailable = snapshots
      .map((snapshot, index) => ({ snapshot, item: items[index] }))
      .filter(({ snapshot, item }) => !snapshot.exists() || snapshot.data().stock < item.quantity)
      .map(({ item }) => item.name)

    if (unavailable.length > 0) {
      throw new OutOfStockError(unavailable)
    }

    snapshots.forEach((snapshot, index) => {
      transaction.update(refs[index], { stock: snapshot.data().stock - items[index].quantity })
    })

    const orderRef = doc(collection(db, ORDERS))

    transaction.set(orderRef, {
      buyer,
      items,
      total,
      createdAt: serverTimestamp(),
    })

    return orderRef.id
  })

export const getOrderById = async (orderId) => {
  const snapshot = await getDoc(doc(db, ORDERS, orderId))

  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}
