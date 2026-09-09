import { useCallback } from 'react'
import { useParams } from 'react-router'
import { ItemDetail } from '../components/ItemDetail'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { useAsync } from '../hooks/useAsync'
import { getProductById } from '../services/products.service'

export const ItemDetailContainer = () => {
  const { itemId } = useParams()
  const fetchProduct = useCallback(() => getProductById(itemId), [itemId])
  const { data: product, error, isLoading } = useAsync(fetchProduct)

  if (isLoading) return <Loader label="Cargando producto..." />

  if (error) {
    return (
      <Message
        tone="error"
        title="No pudimos cargar el producto"
        description="Revisá la conexión con Firestore e intentá nuevamente."
      />
    )
  }

  if (!product) {
    return (
      <Message
        title="Producto inexistente"
        description="El producto que buscás no está en el catálogo."
        actionLabel="Volver al catálogo"
        actionTo="/"
      />
    )
  }

  return <ItemDetail product={product} />
}
