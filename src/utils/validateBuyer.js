const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const validateBuyer = ({ name, phone, email, emailConfirmation }) => {
  const errors = {}

  if (name.trim().length < 3) {
    errors.name = 'Ingresá tu nombre completo.'
  }

  if (!/^\+?[\d\s-]{6,}$/.test(phone.trim())) {
    errors.phone = 'Ingresá un teléfono válido.'
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Ingresá un email válido.'
  }

  if (email.trim() !== emailConfirmation.trim()) {
    errors.emailConfirmation = 'Los emails no coinciden.'
  }

  return errors
}
