export const Loader = ({ label = 'Cargando...' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-stone-500">
    <span className="size-10 animate-spin rounded-full border-4 border-stone-200 border-t-amber-700" />
    <p className="text-sm">{label}</p>
  </div>
)
