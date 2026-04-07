import Image from 'next/image'

const DOCTORS = [
  {
    name: 'Dr. Steve Harrington',
    specialty: 'ENT Specialist & Lead Surgeon',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    badge: 'Lead',
  },
  {
    name: 'Dr. Amelia Osei',
    specialty: 'Rhinology & Sinus Care',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    badge: null,
  },
  {
    name: 'Dr. Marcus Delgado',
    specialty: 'Otology & Hearing Disorders',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    badge: null,
  },
  {
    name: 'Dr. Priya Nair',
    specialty: 'Pediatric ENT',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    badge: null,
  },
  {
    name: 'Dr. Liam Adeyemi',
    specialty: 'Head & Neck Surgery',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    badge: null,
  },
  {
    name: 'Dr. Sofia Mensah',
    specialty: 'Laryngology & Voice Care',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80',
    badge: null,
  },
]

const Doctors = () => {
  return (
    <section id="doctors" className="bg-sky-50 py-24 px-6 md:px-12">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
              Trusted Doctors,{' '}
              <span className="italic font-light text-zinc-500">Exceptional Care.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed md:max-w-sm md:ml-auto">
            Our specialists bring decades of combined experience across every branch
            of ENT medicine — so you always see the right expert for your needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {DOCTORS.map((doc) => (
            <div
              key={doc.name}
              className="group flex flex-col items-center text-center gap-3"
            >
              {/* Portrait */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-200">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Lead badge */}
                {doc.badge && (
                  <div className="absolute top-3 left-3 bg-sky-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {doc.badge}
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-sky-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div>
                <p className="text-zinc-800 text-sm font-semibold leading-snug">{doc.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">{doc.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-sky-100 pt-10">
          <p className="text-zinc-500 text-sm text-center sm:text-left max-w-md">
            Every doctor on our team is board-certified and committed to delivering
            personalised, compassionate ENT care.
          </p>
          <a
            href="#book"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md shadow-sky-200"
          >
            Book with a specialist
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs">→</span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Doctors