'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = {
  Navigatie: [
    { label: 'Welkom', href: '/#home' },
    { label: 'Over Ons', href: '/#about' },
    { label: 'Behandelingen', href: '/#services' },
    { label: 'Tarieven', href: '/prijzen' },
    { label: 'Contact', href: '/#contact' },
  ],
  Behandelingen: [
    { label: 'Medische Pedicure', href: '/prijzen#medisch' },
    { label: 'Spa Pedicure', href: '/prijzen#spa' },
    { label: 'Gellak', href: '/prijzen#gellak' },
    { label: 'Bindweefsel Massage', href: '/prijzen#bindweefsel' },
    { label: 'Magnesium Spa', href: '/prijzen#magnesium' },
  ],
  Juridisch: [
    { label: 'Privacybeleid', href: '/privacy' },
    { label: 'Algemene Voorwaarden', href: '/voorwaarden' },
    { label: 'Cookie Beleid', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  { icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-8">
      <div className="container-luxury">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/#home" className="inline-block mb-6">
              <img 
                src="/images/logoupscale.png" 
                alt="Agape Pedicure & Wellness Salon" 
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-sm">
              Premium voetenverzorging in een luxueuze en serene omgeving. 
              Wij staan voor kwaliteit, hygiëne en persoonlijke aandacht.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-lg">{getSocialIcon(social.icon)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-serif text-lg font-semibold mb-6">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Agape Pedicure. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <span>Gemaakt met ❤️ in Amsterdam</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function getSocialIcon(icon: string) {
  const icons: Record<string, string> = {
    facebook: '📘',
    instagram: '📸',
    linkedin: '💼',
  }
  return icons[icon] || '🔗'
}

