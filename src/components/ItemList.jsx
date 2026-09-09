import { Item } from './Item'

export const ItemList = ({ products }) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((product) => (
      <li key={product.id}>
        <Item product={product} />
      </li>
    ))}
  </ul>
)
