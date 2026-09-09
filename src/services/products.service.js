import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from './firebase'

const PRODUCTS = 'products'
const CATEGORIES = 'categories'

const toEntity = (snapshot) => ({ id: snapshot.id, ...snapshot.data() })

const byName = (a, b) => a.name.localeCompare(b.name)

export const getProducts = async ({ category } = {}) => {
  const productsRef = collection(db, PRODUCTS)
  const productsQuery = category ? query(productsRef, where('category', '==', category)) : productsRef
  const snapshot = await getDocs(productsQuery)

  return snapshot.docs.map(toEntity).sort(byName)
}

export const getProductById = async (productId) => {
  const snapshot = await getDoc(doc(db, PRODUCTS, productId))

  return snapshot.exists() ? toEntity(snapshot) : null
}

export const getCategories = async () => {
  const snapshot = await getDocs(query(collection(db, CATEGORIES), orderBy('order')))

  return snapshot.docs.map(toEntity)
}
