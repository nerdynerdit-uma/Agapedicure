'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { ScaleIn } from '@/components/AnimatedSection'
import { formatPrice, formatDuration } from '@/lib/utils'

const treatments = [
  {
    id: 'deluxe',
    icon: '✨',
    title: 'Agape Deluxe – Basis Pedicure',
    description: 'Voeten desinfecteren met alcohol, teennagels knippen, nagelomgeving verzorgen, eelt verwijderen, afsluiten met hydraterend crème.',
    price: 47.50,
    duration: 60,
    extras: [
      { name: 'Meerprijs 15 min (in overleg)', price: 12.50 },
      { name: 'Nagellak verwijderen', price: 5.00 },
      { name: 'Nagels lakken (inclusief nagellak)', price: 12.50 },
      { name: 'Nagels lakken (eigen nagellak)', price: 8.95 },
      { name: 'Voetmassage i.c.m. pedicure (15 min)', price: 10.00 },
    ],
  },
  {
    id: 'medisch',
    icon: '🏥',
    title: 'Agape Medisch Pedicure',
    description: 'Behandeling voor voeten met verhoogd risico zoals diabetisch, reuma, spasme, ouderen en verwaarloosde voeten. Het verwijderen van weke/likdoorn, kloven en afvlakken van kalknagels (schimmelnagels) horen tot de behandeling.',
    price: 50.00,
    duration: 60,
    featured: true,
    note: 'In sommige situaties kan de voetbehandeling gedeclareerd worden bij de zorgverzekering.',
    extras: [
      { name: 'Meerprijs 15 min (in overleg)', price: 12.50 },
      { name: 'Nagellak verwijderen', price: 5.00 },
      { name: 'Nagels lakken (inclusief nagellak)', price: 12.50 },
      { name: 'Nagels lakken (eigen nagellak)', price: 8.95 },
      { name: 'Voetmassage i.c.m. pedicure (15 min)', price: 10.00 },
    ],
  },
  {
    id: 'bindweefsel',
    icon: '🌸',
    title: 'Bindweefsel Gezichtsmassage',
    description: 'Deze stevige en huid verbeterende gezichtsmassage richt zich op de dieper gelegen huidlagen. De massage bevordert de doorbloeding en stimuleert de aanmaak van collageen en elastine waardoor je huid vernieuwt en verstevigt.',
    note: 'Voor een optimaal resultaat is het aan te raden om een kuur van meerdere behandelingen te nemen.',
    options: [
      { name: 'Hele Gelaatsbehandeling', duration: 50, price: 80.00 },
      { name: 'Back and Neck', duration: 30, price: 35.00 },
    ],
  },
  {
    id: 'neuropathisch',
    icon: '💆',
    title: 'Neuropathische Pijnmassage',
    description: 'Verlicht zenuwpijn bij chronische aandoeningen zoals Diabetes of kanker. Acupressuur gericht op pijn, vermoeidheid, spanning, verkramping, misselijkheid, droge huid & mentale ontspanning.',
    price: 90.00,
    duration: 60,
    benefits: [
      'Zenuwpijn verlichten',
      'Vermoeidheid verminderen',
      'Spanning en verkramping',
      'Misselijkheid behandelen',
      'Droge huid verzorgen',
      'Mentale ontspanning',
    ],
  },
  {
    id: 'magnesium',
    icon: '🧘',
    title: 'Magnesium Spa Behandeling',
    description: 'Magnesiumzouten of -olie worden via de huid opgenomen. Helpt bij spierpijn, krampen, zenuwpijn, stress, vermoeidheid, en bevordert ontgiften van het lichaam.',
    price: 55.00,
    duration: 45,
    benefits: [
      'Spierpijn verlichten',
      'Krampen verminderen',
      'Zenuwpijn behandelen',
      'Stress reductie',
      'Vermoeidheid verminderen',
      'Lichaam ontgiften',
    ],
  },
  {
    id: 'nagelcorrectie',
    icon: '💅',
    title: 'Nagelcorrectie',
    description: 'Wij gebruiken de methode om herstellen van de nagelplaat door middel van gel techniek, zoals gespleten of schimmelnagels.',
    price: 35.00,
  },
  {
    id: 'orthese',
    icon: '🦶',
    title: 'Orthese',
    description: 'Siliconen hulpmiddel om teenklachten (wrijving) te voorkomen en drukpunten te verlichten.',
    price: 40.00,
  },
]

const highlights = [
  { icon: '♥', title: 'Medische Pedicure', desc: 'Zorg voor voeten met verhoogd risico' },
  { icon: '☼', title: 'Luxe Spa Behandeling', desc: 'Ontspan met onze premium spa-diensten' },
  { icon: '♣', title: 'Voetmassages', desc: 'Geniet van ontspanning voor lichaam en geest' },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-90">
              Prijslijst
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg mb-6">
              Onze Tarieven
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-95">
              Gezonde voeten & ontspannende massages
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">
              Pedicure en Wellness
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Bij Agape Pedicure en Wellness Salon bieden we een verscheidenheid aan behandelingen 
              die zijn afgestemd op jouw welzijn. Van medische pedicure tot luxe spa-diensten, 
              onze behandelingen zijn ontworpen om zowel je voeten als je geest te verzorgen.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Bekijk de prijzen van al onze behandelingen op deze pagina en ontdek hoe we jouw 
              gezondheid en ontspanning kunnen verbeteren. Maak een afspraak en ervaar zelf de 
              liefdevolle zorg die we bieden!
            </p>

            {/* Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {highlights.map((item, i) => (
                <ScaleIn key={item.title} delay={i * 0.1}>
                  <div className="p-6 bg-neutral-50 rounded-2xl hover:bg-primary/5 transition-colors">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.desc}</p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="space-y-8">
            {treatments.map((treatment, index) => (
              <ScaleIn key={treatment.id} delay={index * 0.05}>
                <div
                  id={treatment.id}
                  className={`bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${
                    treatment.featured ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {treatment.featured && (
                    <div className="bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
                      ⭐ Medische Zorg
                    </div>
                  )}

                  <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">{treatment.icon}</span>
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                            {treatment.title}
                          </h3>
                          {treatment.price && (
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm text-neutral-500">vanaf</span>
                              <span className="text-3xl font-serif font-bold text-primary">
                                {formatPrice(treatment.price)}
                              </span>
                              {treatment.duration && (
                                <span className="text-sm text-neutral-500">
                                  · {formatDuration(treatment.duration)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {treatment.description}
                    </p>

                    {/* Note */}
                    {treatment.note && (
                      <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-6">
                        <p className="text-sm text-neutral-700">
                          <strong>Let op:</strong> {treatment.note}
                        </p>
                      </div>
                    )}

                    {/* Options */}
                    {treatment.options && (
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {treatment.options.map((option) => (
                          <div
                            key={option.name}
                            className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                          >
                            <div>
                              <p className="font-semibold text-neutral-900">{option.name}</p>
                              <p className="text-sm text-neutral-500">{formatDuration(option.duration)}</p>
                            </div>
                            <span className="text-xl font-serif font-bold text-primary">
                              {formatPrice(option.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Extras */}
                    {treatment.extras && (
                      <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                        <h4 className="font-semibold text-neutral-900 mb-4">Extra opties:</h4>
                        <div className="space-y-3">
                          {treatment.extras.map((extra) => (
                            <div key={extra.name} className="flex justify-between items-center text-sm">
                              <span className="text-neutral-700">{extra.name}</span>
                              <span className="font-semibold text-primary">
                                {formatPrice(extra.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    {treatment.benefits && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-neutral-900 mb-3">Helpt bij:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {treatment.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 text-sm text-neutral-700">
                              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      href="/#booking"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors font-semibold"
                    >
                      Boek deze behandeling
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light">
        <div className="container-luxury text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-display-sm md:text-display-md mb-6">
              Klaar om te boeken?
            </h2>
            <p className="text-lg md:text-xl mb-10 opacity-95">
              Maak vandaag nog een afspraak en ervaar de liefdevolle zorg die we bieden
            </p>
            <Link
              href="/#booking"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary rounded-full hover:bg-neutral-50 transition-all font-semibold text-lg hover:scale-105"
            >
              Maak een Afspraak
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

