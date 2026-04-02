import Link from 'next/link'
import {
  Ear,
  Wind,
  Mic,
  Baby,
  ScanLine,
  Activity,
} from 'lucide-react'

const SPECIALTIES = [
  {
    icon: Ear,
    title: 'Ear & Hearing Care',
    description: 'Diagnosis and treatment of hearing loss, ear infections, tinnitus, and earwax blockages.',
    featured: false,
  },
  {
    icon: Wind,
    title: 'Sinus & Nasal Disorders',
    description: 'Relief from chronic sinusitis, nasal polyps, deviated septum, and allergic rhinitis.',
    featured: true,
  },
  {
    icon: Mic,
    title: 'Throat & Voice Disorders',
    description: 'Care for tonsillitis, laryngitis, voice hoarseness, and swallowing difficulties.',
    featured: false,
  },
  {
    icon: Baby,
    title: 'Pediatric ENT',
    description: 'Specialist care for children with recurring ear infections, adenoid issues, and airway concerns.',
    featured: false,
  },
  {
    icon: ScanLine,
    title: 'Head & Neck Surgery',
    description: 'Surgical management of thyroid nodules, salivary gland conditions, and neck masses.',
    featured: false,
  },
  {
    icon: Activity,
    title: 'Sleep & Airway Health',
    description: 'Evaluation and treatment of snoring, sleep apnea, and upper airway obstruction.',
    featured: false,
  },
]

const Specialties = () => {
  return (
    <section id="specialties" className="bg-white py-24 px-6 md:px-12">
      <div className="container mx-auto">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.15] tracking-tight mb-4">
            Expert ENT Care for Every Condition
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
            From your ears to your airways, Dr. Steve and his team treat the full
            spectrum of ear, nose, and throat conditions with precision and care.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPECIALTIES.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`
                  group relative flex flex-col gap-4 rounded-2xl p-7 transition-all duration-300
                  ${item.featured
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-200'
                    : 'bg-zinc-50 hover:bg-zinc-100 border border-zinc-100'
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-11 h-11 rounded-xl flex items-center justify-center
                    ${item.featured
                      ? 'bg-white/20'
                      : 'bg-sky-50 border border-sky-100'
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={item.featured ? 'text-white' : 'text-sky-500'}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3
                    className={`text-base font-semibold leading-snug ${
                      item.featured ? 'text-white' : 'text-zinc-800'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      item.featured ? 'text-white/70' : 'text-zinc-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Learn More */}
                <Link
                  href="#book"
                  className={`
                    inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider
                    transition-all duration-200
                    ${item.featured
                      ? 'text-white hover:gap-3'
                      : 'text-sky-500 hover:gap-3'
                    }
                  `}
                >
                  Learn More
                  {item.featured && <span>→</span>}
                </Link>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Specialties