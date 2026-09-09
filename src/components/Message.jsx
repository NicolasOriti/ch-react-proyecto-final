import { Link } from 'react-router'

const TONES = {
  info: 'border-stone-200 bg-stone-50 text-stone-600',
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

export const Message = ({ tone = 'info', title, description, actionLabel, actionTo }) => (
  <div className={`mx-auto max-w-md rounded-2xl border p-8 text-center ${TONES[tone]}`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    {description && <p className="mt-2 text-sm opacity-90">{description}</p>}
    {actionLabel && actionTo && (
      <Link
        to={actionTo}
        className="mt-6 inline-block rounded-full bg-stone-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        {actionLabel}
      </Link>
    )}
  </div>
)
