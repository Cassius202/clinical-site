import Image from 'next/image'

const SERVICES = [
  {
    stat: '67%',
    statLabel: 'Better long-term results',
    title: 'Personalized Health Guidance',
    description: 'Get tailored recommendations based on your data for better long-term results.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    stat: '77%',
    statLabel: 'Patient satisfaction',
    title: 'Convenient Care',
    description: 'Whether in person or online, we offer a variety of options that fit your life.',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=80',
  },
  {
    stat: '24/7',
    statLabel: 'Access to care',
    title: 'Anytime, Anywhere Care',
    description: 'Get instant medical support anytime — day or night, from anywhere.',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=600&q=80',
  },
  {
    stat: '98%',
    statLabel: 'Appointment success rate',
    title: 'Easy Scheduling',
    description: 'Book, reschedule, or cancel appointments in seconds with zero friction.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80',
  },
]

const Services = () => {
  return (
    <section id="services" className="bg-sky-50 py-25 px-6 md:px-12 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
          Who We Are
        </p>

        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight mb-5">
            We Don&apos;t Just Treat Symptoms —{' '}
            <span className="text-zinc-400 font-light">
              We Build Lasting Health.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg">
            Dr. Steve&apos;s practice is built around you. From your first visit to
            long-term care, we combine specialist expertise with modern convenience
            so you spend less time worrying and more time living well.
          </p>
        </div>
      </div>

      {/* Cards — horizontal scroll on mobile, 4-col grid on desktop */}
      <div className="container mx-auto">
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 snap-x snap-mandatory">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="relative flex-shrink-0 w-[72vw] sm:w-[55vw] md:w-auto snap-start rounded-2xl overflow-hidden group cursor-pointer"
              style={{ minHeight: '380px' }}
            >
              {/* Background image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

              {/* Stat — top left */}
              <div className="absolute top-4 left-4">
                <p className="text-white text-3xl font-bold leading-none">{service.stat}</p>
                <p className="text-white/60 text-xs mt-0.5">{service.statLabel}</p>
              </div>

              {/* Text — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-semibold text-base mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services