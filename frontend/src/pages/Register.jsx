import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/api'

function validate(form) {
  const errors = {}
  if (!form.full_name.trim()) errors.full_name = 'Enter your full name'
  if (!form.company_name.trim()) errors.company_name = 'Enter your company name'
  if (!form.phone.trim()) errors.phone = 'Enter a phone number'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (!/\d/.test(form.password)) {
    errors.password = 'Password must contain at least one number'
  }
  return errors
}

const initialForm = {
  full_name: '',
  company_name: '',
  phone: '',
  email: '',
  password: '',
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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
      await register(form)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setSubmitError(getErrorMessage(error, "Couldn't create your account — try again."))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Set up your RomaTech.Ai client portal.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <FormField
          id="register-full-name"
          label="Full name"
          value={form.full_name}
          onChange={(v) => updateField('full_name', v)}
          error={errors.full_name}
          autoComplete="name"
        />
        <FormField
          id="register-company"
          label="Company name"
          value={form.company_name}
          onChange={(v) => updateField('company_name', v)}
          error={errors.company_name}
          autoComplete="organization"
        />
        <FormField
          id="register-phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => updateField('phone', v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <FormField
          id="register-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => updateField('email', v)}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          id="register-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => updateField('password', v)}
          error={errors.password}
          autoComplete="new-password"
        />
        <p className="-mt-3 text-xs text-slate-500">At least 8 characters, with at least one number.</p>

        {submitError && (
          <p role="alert" className="text-sm text-red-400">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
          {isSubmitting ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-gold-500 hover:text-gold-400">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
