import { CreditCard, Wallet } from 'lucide-react'

export const PAYMENT_METHODS = [
  { id: 'visa', label: 'Visa', icon: CreditCard },
  { id: 'mastercard', label: 'Mastercard', icon: CreditCard },
  { id: 'amex', label: 'American Express', icon: CreditCard },
  { id: 'discover', label: 'Discover', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', icon: Wallet },
]

export default function PaymentMethodSelector({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {PAYMENT_METHODS.map((method) => {
        const Icon = method.icon
        const isSelected = value === method.id
        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(method.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-400 ${
              isSelected
                ? 'border-ice-500 bg-ice-500/10 text-ice-400'
                : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'
            }`}
          >
            <Icon size={20} aria-hidden="true" />
            {method.label}
          </button>
        )
      })}
    </div>
  )
}
