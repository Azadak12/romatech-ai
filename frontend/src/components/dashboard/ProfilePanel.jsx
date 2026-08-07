import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import FormField from '../FormField'
import { useAuth } from '../../context/AuthContext'
import { getErrorMessage } from '../../lib/api'

export default function ProfilePanel() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    full_name: user.full_name,
    company_name: user.company_name,
    phone: user.phone,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setSavedAt(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      await updateProfile(form)
      setSavedAt(Date.now())
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't save your changes — try again."))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
      <p className="mt-1 text-sm text-slate-400">Update your account details.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <FormField
          id="profile-full-name"
          label="Full name"
          value={form.full_name}
          onChange={(v) => updateField('full_name', v)}
        />
        <FormField
          id="profile-company"
          label="Company name"
          value={form.company_name}
          onChange={(v) => updateField('company_name', v)}
        />
        <FormField
          id="profile-phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => updateField('phone', v)}
        />

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        {savedAt && (
          <p role="status" className="text-sm text-ice-500">
            Saved.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-fit items-center justify-center gap-2 rounded-full bg-ice-500 px-6 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-ice-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
          {isSubmitting ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
