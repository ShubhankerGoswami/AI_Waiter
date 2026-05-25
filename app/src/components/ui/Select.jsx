import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(({ label, error, className, children, placeholder, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-gray-100 appearance-none',
          'focus:outline-none focus:border-orange-500/50 transition-all duration-150 cursor-pointer',
          !props.value && 'text-gray-600',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden className="text-gray-600 bg-[#0f1117]">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
))

Select.displayName = 'Select'
export default Select
