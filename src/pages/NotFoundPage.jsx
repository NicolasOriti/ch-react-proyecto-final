import { Message } from '../components/Message'

export const NotFoundPage = () => (
  <Message
    title="Página no encontrada"
    description="La ruta que buscás no existe."
    actionLabel="Ir al catálogo"
    actionTo="/"
  />
)
