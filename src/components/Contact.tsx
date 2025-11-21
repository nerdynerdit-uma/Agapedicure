'use client'

import SectionHeading from './SectionHeading'
import AnimatedSection from './AnimatedSection'

const contactInfo = [
  {
    icon: '📍',
    title: 'Adres',
    content: ['Hoofdstraat 123', '1234 AB Amsterdam', 'Nederland'],
  },
  {
    icon: '📞',
    title: 'Telefoon',
    content: ['+31 (0)20 123 4567'],
    link: 'tel:+31201234567',
  },
  {
    icon: '✉️',
    title: 'Email',
    content: ['info@agapepedicure.nl'],
    link: 'mailto:info@agapepedicure.nl',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Contact"
          title="Neem Contact Op"
          description="Heeft u vragen of wilt u meer informatie? Neem gerust contact met ons op."
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <AnimatedSection key={info.title} delay={index * 0.1}>
              <div className="group bg-neutral-50 rounded-2xl p-8 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.content.map((line) => (
                    info.link ? (
                      <a
                        key={line}
                        href={info.link}
                        className="block text-sm hover:underline"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm">
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Map */}
        <AnimatedSection className="mt-12">
          <div className="bg-neutral-50 rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.1747940154587!2d4.89594931579757!3d52.37403517978778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c3db87e4bb%3A0xb3a175ceffbd0a9f!2sAmsterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Locatie Agape Pedicure"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}





