'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { ScaleIn } from './AnimatedSection'
import Link from 'next/link'

const services = [
  {
    icon: '💆',
    title: 'Medische Pedicure',
    description: 'Professionele behandeling van eelt, likdoorns en nagelafwijkingen met medische precisie voor optimale voetgezondheid.',
    price: 'vanaf €50',
    duration: '60 min',
    features: ['Eeltverwijdering', 'Likdoornbehandeling', 'Nagelcorrectie'],
  },
  {
    icon: '✨',
    title: 'Spa Pedicure',
    description: 'Een ultieme verwenervaring met scrub, massage en hydraterende behandeling voor volledig gerevitaliseerde voeten.',
    price: 'vanaf €65',
    duration: '75 min',
    features: ['Voetenbad', 'Scrub', 'Massage', 'Hydraterende masker'],
    featured: true,
  },
  {
    icon: '💅',
    title: 'Gellak Behandeling',
    description: 'Langdurige en glanzende nagellak in de kleur van uw keuze, perfect voor een verzorgde uitstraling.',
    price: 'vanaf €25',
    duration: '30 min',
    features: ['Ruime kleurenkeuze', '3-4 weken houdbaar', 'Glanzende afwerking'],
  },
  {
    icon: '🦶',
    title: 'Diabetische Voetenzorg',
    description: 'Gespecialiseerde zorg voor diabetische voeten met extra aandacht, voorzichtigheid en expertise.',
    price: 'vanaf €50',
    duration: '60 min',
    features: ['Aangepaste behandeling', 'Extra controle', 'Preventieve zorg'],
  },
  {
    icon: '🌿',
    title: 'Bindweefsel Massage',
    description: 'Stevige huid verbeterende gezichtsmassage die de doorbloeding bevordert en collageen stimuleert.',
    price: 'vanaf €35',
    duration: '30-50 min',
    features: ['Gezichtsbehandeling', 'Back & Neck', 'Anti-aging effect'],
  },
  {
    icon: '🧘',
    title: 'Magnesium Spa',
    description: 'Magnesiumzouten worden via de huid opgenomen, helpt bij spierpijn, krampen en stress.',
    price: 'vanaf €55',
    duration: '45 min',
    features: ['Spierpijn verlichten', 'Stress reductie', 'Ontgiften'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-50">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Onze Diensten"
          title="Premium Behandelingen"
          description="Van medische pedicure tot luxe spa-diensten, onze behandelingen zijn ontworpen om zowel je voeten als je geest te verzorgen."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ScaleIn key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative h-full"
              >
                {service.featured && (
                  <div className="absolute -top-4 left-6 z-10 px-4 py-1.5 bg-secondary text-white text-xs font-semibold rounded-full shadow-lg">
                    Populair
                  </div>
                )}

                <div className="relative h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-6xl mb-6 inline-block"
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price & Duration */}
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                      <div>
                        <p className="text-2xl font-serif font-bold text-primary">{service.price}</p>
                        <p className="text-xs text-neutral-500">{service.duration}</p>
                      </div>

                      <Link
                        href="/prijzen"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                      >
                        Meer info
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
                </div>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/prijzen"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            Bekijk alle tarieven
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}





