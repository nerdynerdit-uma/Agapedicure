'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  subtitle?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-4xl', centered && 'mx-auto text-center', className)}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-display-sm md:text-display-md text-neutral-900 mb-6 tracking-tight"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={cn(
          'h-0.5 w-24 bg-gradient-primary mt-8',
          centered && 'mx-auto'
        )}
      />
    </div>
  )
}





