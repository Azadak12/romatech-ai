import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, Loader2, ShieldCheck } from 'lucide-react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import { pricing } from '../data/content'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/api'

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function validate(form) {
  const errors = {}
  if (!form.cardName.trim()) errors.cardName = 'Enter the name on the card'

  const digits = form.cardNumber.replace(/\D/g, '')
  if (digits.length < 15 || digits.length > 16) errors.cardNumber = 'Enter a valid card number'

  const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(form.expiry)
  if (!expiryMatch) {
    errors.expiry = 'Use MM/YY'
  } else {
    const month = Number(expiryMatch[1])
    if (month < 1 || month > 12) errors.expiry = 'Enter a valid month'
  }

  if (!/^\d{3,4}$/.test(form.cvc)) errors.cvc = 'Enter a valid CVC'

  return errors
}

export default function Checkout() {
  const { planId } = useParams()
  const { user, purchasePlan } = useAuth()
  const tier = pricing.tiers.find((t) => t.id === planId)

  const [paymentMethod, setPaymentMethod] = useState('visa')
  const [form, setForm] = useState({ cardName: '', cardNumber: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  if (!tier) {
    return <Navigate to="/#pricing" replace />
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      // Demo checkout: card details never leave the browser. Only the chosen
      // plan is sent to the backend, which activates it on the account.
      await purchasePlan(tier.id)
      setIsComplete(true)
    } catch (error) {
      setSubmitError(getErrorMessage(error, "Couldn't complete that purchase — try again."))
    } finally {
      setIsSubmitting(false)
    }
  }

  const alreadyOwnsPlan = user?.plan === tier.id

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ice-400">
          <ShieldCheck size={14} aria-hidden="true" />
          Test Mode — no real charge will be made
        </div>

        {isComplete ? (
          <div className="rounded-2xl border border-ice-500/30 bg-navy-800/60 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ice-500/15 text-ice-400">
              <Check size={24} aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold text-white">You're on the {tier.name} plan</h1>
            <p className="mt-2 text-sm text-slate-400">Your account has been updated.</p>
            <Link
              to="/dashboard"
              className="mt-6 inline-block rounded-full bg-ice-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-ice-400"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : alreadyOwnsPlan ? (
          <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-8 text-center">
            <h1 className="text-xl font-bold text-white">You already have the {tier.name} plan</h1>
            <p className="mt-2 text-sm text-slate-400">Head back to your dashboard to manage it.</p>
            <Link
              to="/dashboard"
              className="mt-6 inline-block rounded-full bg-ice-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-ice-400"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 sm:p-8">
              <h1 className="text-xl font-bold text-white">Payment method</h1>
              <p className="mt-1 text-sm text-slate-400">Choose how you'd like to pay.</p>

              <div className="mt-5">
                <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
              </div>

              <div className="mt-6 flex flex-col gap-5">
                <div>
                  <label htmlFor="card-name" className="block text-sm font-medium text-slate-300">
                    Name on card
                  </label>
                  <input
                    id="card-name"
                    type="text"
                    autoComplete="cc-name"
                    value={form.cardName}
                    onChange={(e) => updateField('cardName', e.target.value)}
                    aria-invalid={Boolean(errors.cardName)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-ice-500 focus:outline-none focus:ring-1 focus:ring-ice-500"
                  />
                  {errors.cardName && <p className="mt-1.5 text-xs text-red-400">{errors.cardName}</p>}
                </div>

                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-slate-300">
                    Card number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={(e) => updateField('cardNumber', formatCardNumber(e.target.value))}
                    aria-invalid={Boolean(errors.cardNumber)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-ice-500 focus:outline-none focus:ring-1 focus:ring-ice-500"
                  />
                  {errors.cardNumber && <p className="mt-1.5 text-xs text-red-400">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="card-expiry" className="block text-sm font-medium text-slate-300">
                      Expiry
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => updateField('expiry', formatExpiry(e.target.value))}
                      aria-invalid={Boolean(errors.expiry)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-ice-500 focus:outline-none focus:ring-1 focus:ring-ice-500"
                    />
                    {errors.expiry && <p className="mt-1.5 text-xs text-red-400">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label htmlFor="card-cvc" className="block text-sm font-medium text-slate-300">
                      CVC
                    </label>
                    <input
                      id="card-cvc"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={form.cvc}
                      onChange={(e) => updateField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      aria-invalid={Boolean(errors.cvc)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-ice-500 focus:outline-none focus:ring-1 focus:ring-ice-500"
                    />
                    {errors.cvc && <p className="mt-1.5 text-xs text-red-400">{errors.cvc}</p>}
                  </div>
                </div>
              </div>

              {submitError && (
                <p role="alert" className="mt-4 text-sm text-red-400">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ice-500 px-6 py-3.5 text-base font-semibold text-navy-950 transition hover:bg-ice-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
                {isSubmitting ? 'Processing…' : `Confirm — $${tier.price}${tier.cadence}`}
              </button>
            </form>

            <div className="h-fit rounded-2xl border border-white/10 bg-navy-800/60 p-6">
              <h2 className="text-lg font-bold text-white">{tier.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{tier.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">${tier.price}</span>
                <span className="text-sm text-slate-400">{tier.cadence}</span>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check size={16} className="mt-0.5 shrink-0 text-ice-500" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
