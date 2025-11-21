'use client'

import SectionHeading from './SectionHeading'
import AnimatedSection from './AnimatedSection'

const info = [
  {
    icon: '🕒',
    title: 'Openingstijden',
    items: [
      'Ma - Vr: 09:00 - 18:00',
      'Zaterdag: 09:00 - 16:00',
      'Zondag: Gesloten',
    ],
  },
  {
    icon: '🛡️',
    title: 'Hygiëne Garantie',
    items: [
      'Professionele sterilisatie',
      'Hoogste hygiënenormen',
      'Veilige omgeving',
    ],
  },
  {
    icon: '📋',
    title: 'Annuleringsbeleid',
    items: [
      'Tot 24u gratis annuleren',
      'Binnen 24u: 50% kosten',
      'Flexibel omboeken mogelijk',
    ],
  },
]

export default function Booking() {
  return (
    <section id="booking" className="py-24 md:py-32 bg-neutral-50">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Reserveren"
          title="Maak Een Afspraak"
          description="Kies een datum en tijd die het beste bij u past. Wij kijken ernaar uit u te verwelkomen!"
        />

        <div className="mt-20 grid lg:grid-cols-3 gap-8">
          {/* Booking Widget */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <iframe
                  src="https://simplymeet.me/embed/agapepedicure"
                  className="w-full h-[700px]"
                  style={{ border: 'none' }}
                  title="Booking systeem"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {info.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-4">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}





