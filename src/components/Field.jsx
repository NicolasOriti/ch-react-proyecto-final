export const Field = ({ label, name, type = 'text', value, error, onChange }) => (
  <label className="flex flex-col gap-1 text-sm">
    <span className="font-medium text-stone-700">{label}</span>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      aria-invalid={Boolean(error)}
      className={`rounded-xl border px-4 py-2.5 text-stone-900 outline-none transition focus:ring-2 ${
        error
          ? 'border-red-300 focus:ring-red-200'
          : 'border-stone-300 focus:border-stone-900 focus:ring-stone-200'
      }`}
    />
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
)
