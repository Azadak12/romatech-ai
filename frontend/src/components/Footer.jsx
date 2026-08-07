import { Mail, Phone } from 'lucide-react'
import { company, footer } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a href="#hero" className="text-xl font-bold tracking-tighter text-white">
            Roma<span className="text-gold-500">Tech</span>.Ai
          </a>
          <p className="mt-2 max-w-xs text-sm text-slate-500">{company.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {footer.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 text-sm text-slate-400">
          <a href={`mailto:${company.contactEmail}`} className="flex items-center gap-2 transition hover:text-white">
            <Mail size={15} aria-hidden="true" />
            {company.contactEmail}
          </a>
          <a
            href={`tel:${company.contactPhone.replace(/[^\d+]/g, '')}`}
            className="flex items-center gap-2 transition hover:text-white"
          >
            <Phone size={15} aria-hidden="true" />
            {company.contactPhone}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-white/10 px-6 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} RomaTech.Ai. All rights reserved.</p>
        <div className="flex gap-6">
          <a href={footer.privacyHref} className="transition hover:text-white">
            Privacy Policy
          </a>
          <a href={footer.termsHref} className="transition hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
