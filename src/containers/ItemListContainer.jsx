import { useCallback } from 'react'
import { ItemList } from '../components/ItemList'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { useAsync } from '../hooks/useAsync'
import { getProducts } from '../services/products.service'

export const ItemListContainer = ({ title, subtitle, category }) => {
  const fetchProducts = useCallback(() => getProducts({ category }), [category])
  const { data: products, error, isLoading } = useAsync(fetchProducts)

  if (isLoading) return <Loader label="Cargando productos..." />

  if (error) {
    return (
      <Message
        tone="error"
        title="No pudimos cargar el catálogo"
        description="Revisá la conexión con Firestore e intentá nuevamente."
      />
    )
  }

  if (products.length === 0) {
    return (
      <Message
        title="No hay productos en esta categoría"
        description="Probá con otra categoría del menú."
        actionLabel="Ver todo el catálogo"
        actionTo="/"
      />
    )
  }

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-stone-900">{title}</h1>
        {subtitle && <p className="text-stone-500">{subtitle}</p>}
      </header>

      <ItemList products={products} />
    </section>
  )
}
