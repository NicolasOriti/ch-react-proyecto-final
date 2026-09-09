import { Hero } from '../components/Hero'
import { ItemListContainer } from '../containers/ItemListContainer'

export const HomePage = () => (
  <>
    <Hero />
    <ItemListContainer
      title="Nuestro catálogo"
      subtitle="Granos, molidos y accesorios seleccionados uno por uno."
    />
  </>
)
