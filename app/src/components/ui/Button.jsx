import { cn } from '../../lib/utils'

export default function Button({ variant = 'primary', size = 'md', className, children, loading, ...props }) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const variants = {
    primary:
      'bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-400 hover:to-orange-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30',
    ghost:
      'bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20',
    google:
      'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-sm font-medium',
    danger:
      'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
