import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(({ label, error, className, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-300">{label}</label>
    )}
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-600',
        'focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all duration-150',
        error && 'border-red-500/50 focus:border-red-500/70',
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
))

Input.displayName = 'Input'
export default Input
