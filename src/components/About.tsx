'use client'

import Image from 'next/image'
import { SlideIn } from './AnimatedSection'
import SectionHeading from './SectionHeading'

const features = [
  { icon: '🏆', label: 'Gecertificeerde professionals' },
  { icon: '✨', label: 'Premium producten' },
  { icon: '🧪', label: 'Hygiënische werkomgeving' },
  { icon: '💝', label: 'Persoonlijke aandacht' },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <SlideIn direction="left">
            <div className="relative group">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/afbeelding21.jpg"
                  alt="Gezonde voeten en ontspannende massages"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏅</div>
                  <p className="text-sm font-semibold text-primary">Premium</p>
                  <p className="text-xs text-neutral-600">Kwaliteit</p>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -z-10 top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </SlideIn>

          {/* Content */}
          <SlideIn direction="right">
            <div>
              <SectionHeading
                subtitle="Over Ons"
                title="Welkom bij Agape Pedicure"
                centered={false}
                className="text-left"
              />

              <div className="mt-8 space-y-6 text-neutral-600 leading-relaxed">
                <p className="text-lg font-medium text-primary-dark">
                  Bij Agape Pedicure geloven wij dat voetenverzorging meer is dan alleen een behandeling 
                  — het is een ervaring van pure ontspanning en zelfzorg.
                </p>

                <p>
                  Onze pedicurebehandelingen en ontspannende massages bieden de zorg die uw voeten en lichaam 
                  verdienen. Onze specialisten zorgen voor gezonde, stralende voeten en een totale 
                  ontspanningservaring.
                </p>

                <p>
                  Wij combineren medische expertise met de ultieme spa-ervaring, waarbij hygiëne, 
                  kwaliteit en persoonlijke aandacht voorop staan.
                </p>
              </div>

              {/* Features Grid */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 hover:bg-primary/5 transition-colors duration-300"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-sm font-medium text-neutral-700">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}

