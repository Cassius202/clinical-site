import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Patient — Ear Infection Treatment',
    avatar: 'SM',
    review:
      'I had been dealing with recurring ear infections for months. Dr. Steve identified the root cause in my very first visit and within two weeks I was completely symptom-free. The online booking made everything so easy.',
    rating: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Patient — Sinus Surgery',
    avatar: 'JO',
    review:
      'I was nervous about surgery but the team walked me through every step. The follow-up care was exceptional — I could message the clinic anytime and always got a response within the hour. Truly world-class.',
    rating: 5,
  },
  {
    name: 'Amara Diallo',
    role: 'Patient — Throat Consultation',
    avatar: 'AD',
    review:
      'After years of misdiagnoses elsewhere, Dr. Steve finally gave me answers. His attention to detail and genuine care for patients is rare. I recommend him to everyone in my family now.',
    rating: 5,
  },
]

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
    ))}
  </div>
)

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">
              Patient Stories
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
              Real People.{' '}
              <span className="italic font-light text-zinc-400">Real Results.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed md:max-w-sm md:ml-auto">
            Don&apos;t take our word for it — hear from patients whose lives changed
            after visiting Dr. Steve&apos;s practice.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`
                relative flex flex-col justify-between
                bg-zinc-50 border border-zinc-200
                rounded-2xl p-7 gap-6
                transition-all duration-300 hover:border-sky-200 hover:shadow-sm hover:shadow-sky-100
                ${i === 1 ? 'md:mt-8' : ''}
              `}
            >
              {/* Quote mark */}
              <span className="absolute top-6 right-7 text-6xl leading-none text-zinc-200 font-serif select-none">
                &ldquo;
              </span>

              <div className="flex flex-col gap-5">
                <Stars count={t.rating} />
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-zinc-200">
                <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-500 text-xs font-semibold">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-zinc-800 text-sm font-medium">{t.name}</p>
                  <p className="text-zinc-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary stat */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex -space-x-2">
            {['#0ea5e9', '#38bdf8', '#7dd3fc'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white"
                style={{ backgroundColor: color, opacity: 0.9 - i * 0.2 }}
              />
            ))}
          </div>
          <p className="text-zinc-400 text-sm">
            Joined by{' '}
            <span className="text-zinc-800 font-medium">2,800+ patients</span>{' '}
            who trust Dr. Steve with their ENT health.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Testimonials