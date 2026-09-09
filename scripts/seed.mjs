import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { categories } from './data/categories.mjs'
import { products } from './data/products.mjs'

const REQUIRED_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

const missing = REQUIRED_VARS.filter((name) => !process.env[name])

if (missing.length > 0) {
  console.error(`Missing environment variables: ${missing.join(', ')}`)
  console.error('Copy .env.example to .env and fill in your Firebase credentials.')
  process.exit(1)
}

const db = getFirestore(
  initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  }),
)

const shouldReset = process.argv.includes('--reset')

const deleteCollection = async (name) => {
  const snapshot = await getDocs(collection(db, name))

  if (snapshot.empty) return 0

  const batch = writeBatch(db)
  snapshot.docs.forEach((document) => batch.delete(document.ref))
  await batch.commit()

  return snapshot.size
}

const seedCollection = async (name, documents) => {
  const batch = writeBatch(db)

  documents.forEach(({ slug, ...data }) => {
    batch.set(doc(db, name, slug), { ...data, createdAt: serverTimestamp() })
  })

  await batch.commit()

  return documents.length
}

const run = async () => {
  if (shouldReset) {
    const removedProducts = await deleteCollection('products')
    const removedCategories = await deleteCollection('categories')
    const removedOrders = await deleteCollection('orders')

    console.log(
      `Reset: ${removedProducts} products, ${removedCategories} categories, ${removedOrders} orders deleted.`,
    )
  }

  const seededCategories = await seedCollection('categories', categories)
  const seededProducts = await seedCollection('products', products)

  console.log(`Seeded ${seededCategories} categories and ${seededProducts} products.`)
  console.log('Documents use the slug as their id, so re-running the seed is idempotent.')
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error.message)
    process.exit(1)
  })
