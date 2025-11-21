'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  submenu?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Welkom', href: '#home' },
  { label: 'Over Ons', href: '#about' },
  { 
    label: 'Behandelingen', 
    href: '#services',
    submenu: [
      { label: 'Manicure', href: '#manicure' },
      { label: 'Pedicure', href: '#pedicure' },
      { label: 'Voet Massage', href: '#voetmassage' },
    ]
  },
  { label: 'Tarieven', href: '/prijzen' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass border-b border-neutral-200/50 py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/#home" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center"
            >
              <img 
                src="/images/logoupscale.png" 
                alt="Agape Pedicure & Wellness Salon" 
                className="h-12 md:h-14 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
                onMouseEnter={() => item.submenu && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full',
                    'hover:bg-primary/5 hover:text-primary',
                    'relative overflow-hidden group flex items-center gap-1'
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {item.submenu && (
                    <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                
                {/* Dropdown Menu */}
                {item.submenu && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 glass rounded-2xl shadow-xl py-2 z-50"
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden lg:block"
          >
            <Link
              href="#booking"
              className={cn(
                'inline-flex items-center justify-center px-8 py-3 text-sm font-semibold',
                'text-white gradient-primary rounded-full',
                'shadow-lg shadow-primary/25',
                'hover:shadow-xl hover:shadow-primary/30',
                'transition-all duration-300',
                'hover:scale-105 active:scale-95'
              )}
            >
              Boek Nu
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current rounded-full transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full transition-all"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden glass border-t border-neutral-200/50 mt-4"
      >
        <div className="container-luxury py-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => !item.submenu && setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
              {item.submenu && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-neutral-600 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="#booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 text-base font-semibold text-white gradient-primary rounded-xl text-center mt-4"
          >
            Boek Nu
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}

