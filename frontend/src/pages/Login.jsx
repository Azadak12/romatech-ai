import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/api'

function validate(form) {
  const errors = {}
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.password) errors.password = 'Enter your password'
  return errors
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
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
      await login(form.email, form.password)
      const destination = location.state?.from?.pathname || '/dashboard'
      navigate(destination, { replace: true })
    } catch (error) {
      setSubmitError(getErrorMessage(error, 'Incorrect email or password.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your RomaTech.Ai client portal.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <FormField
          id="login-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => updateField('email', v)}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          id="login-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => updateField('password', v)}
          error={errors.password}
          autoComplete="current-password"
        />

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
          {isSubmitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-gold-500 hover:text-gold-400">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
