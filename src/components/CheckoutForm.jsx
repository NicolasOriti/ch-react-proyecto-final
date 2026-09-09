import { useState } from 'react'
import { Field } from './Field'
import { validateBuyer } from '../utils/validateBuyer'

const INITIAL_VALUES = { name: '', phone: '', email: '', emailConfirmation: '' }

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateBuyer(values)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const { emailConfirmation: _confirmation, ...buyer } = values

      onSubmit(buyer)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="Nombre y apellido" name="name" value={values.name} error={errors.name} onChange={handleChange} />
      <Field label="Teléfono" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={handleChange} />
      <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={handleChange} />
      <Field
        label="Repetir email"
        name="emailConfirmation"
        type="email"
        value={values.emailConfirmation}
        error={errors.emailConfirmation}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
      >
        {isSubmitting ? 'Generando orden...' : 'Confirmar compra'}
      </button>
    </form>
  )
}
