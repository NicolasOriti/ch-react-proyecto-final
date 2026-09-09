import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { CartWidget } from './CartWidget'
import { useAsync } from '../hooks/useAsync'
import { getCategories } from '../services/products.service'

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
    isActive ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
  }`

export const NavBar = () => {
  const { data: categories } = useAsync(getCategories)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight text-stone-900">
          Origen<span className="text-amber-700">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <NavLink to="/" end className={linkClass}>
              Catálogo
            </NavLink>
          </li>
          {categories?.map((category) => (
            <li key={category.id}>
              <NavLink to={`/category/${category.id}`} className={linkClass}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <CartWidget />
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-full p-2 text-stone-700 transition hover:bg-stone-100 md:hidden"
          >
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="size-6">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-stone-200 px-4 py-3 md:hidden">
          <li>
            <NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>
              Catálogo
            </NavLink>
          </li>
          {categories?.map((category) => (
            <li key={category.id}>
              <NavLink
                to={`/category/${category.id}`}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
