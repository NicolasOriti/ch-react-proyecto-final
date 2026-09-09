import { useParams } from 'react-router'
import { ItemListContainer } from '../containers/ItemListContainer'

const TITLES = {
  granos: 'Granos enteros',
  molidos: 'Café molido',
  accesorios: 'Accesorios',
  suscripciones: 'Suscripciones',
}

export const CategoryPage = () => {
  const { categoryId } = useParams()

  return (
    <ItemListContainer
      category={categoryId}
      title={TITLES[categoryId] ?? 'Categoría'}
      subtitle="Filtrado directamente desde Firestore."
    />
  )
}
