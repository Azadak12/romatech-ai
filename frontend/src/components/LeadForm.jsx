import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { api, getErrorMessage } from '../lib/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company_name: '',
  plan_interest: '',
  message: '',
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.phone.trim()) errors.phone = 'Enter a phone number'
  return errors
}

export default function LeadForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      await api.post('/leads', { ...form, source: 'website' })
      setIsSubmitted(true)
    } catch (error) {
      setSubmitError(getErrorMessage(error, "Couldn't submit that — try again in a moment."))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-gold-500/30 bg-navy-800/60 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">You're on the list.</h3>
        <p className="mt-2 text-slate-400">
          Someone from our team will call you within one business day to set up your 15-minute walkthrough.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="lead-name" className="block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="lead-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
          {errors.name && (
            <p id="lead-name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="lead-email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'lead-email-error' : undefined}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
          {errors.email && (
            <p id="lead-email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-300">
            Phone
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
          {errors.phone && (
            <p id="lead-phone-error" className="mt-1.5 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="lead-company" className="block text-sm font-medium text-slate-300">
            Company <span className="text-slate-500">(optional)</span>
          </label>
          <input
            id="lead-company"
            type="text"
            value={form.company_name}
            onChange={(e) => updateField('company_name', e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-plan" className="block text-sm font-medium text-slate-300">
            Which plan are you interested in? <span className="text-slate-500">(optional)</span>
          </label>
          <select
            id="lead-plan"
            value={form.plan_interest}
            onChange={(e) => updateField('plan_interest', e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="">Not sure yet</option>
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-message" className="block text-sm font-medium text-slate-300">
            Anything we should know? <span className="text-slate-500">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            rows={3}
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-navy-950 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
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
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-base font-semibold text-navy-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isSubmitting ? 'Submitting…' : 'Book a Call'}
      </button>
    </form>
  )
}
