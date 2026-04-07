'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { HERO_IMAGE } from '@/constants/Constants'

const FAQS = [
  {
    category: 'Appointments',
    questions: [
      {
        q: 'How do I book an appointment with Dr. Steve?',
        a: 'You can book directly through our website by clicking the "Book an appointment" button. Select your preferred date, time, and reason for visit — the whole process takes under two minutes.',
      },
      {
        q: 'How soon can I get an appointment?',
        a: 'We typically offer same-week availability. Urgent cases are prioritised and can often be seen within 24–48 hours.',
      },
      {
        q: 'Can I reschedule or cancel my appointment?',
        a: 'Yes. You can reschedule or cancel up to 24 hours before your appointment at no charge. Late cancellations may incur a small fee.',
      },
      {
        q: 'Do you offer virtual/telehealth consultations?',
        a: 'Yes — many follow-up consultations and initial assessments can be conducted online. Procedures and in-person examinations will require an in-clinic visit.',
      },
    ],
  },
  {
    category: 'ENT Conditions & Treatments',
    questions: [
      {
        q: 'What conditions does Dr. Steve treat?',
        a: 'Dr. Steve specialises in the full range of ear, nose, and throat conditions — including hearing loss, ear infections, tinnitus, sinusitis, nasal polyps, deviated septum, tonsillitis, voice disorders, sleep apnea, and head & neck concerns.',
      },
      {
        q: 'When should I see an ENT specialist instead of a GP?',
        a: 'You should see an ENT if you have symptoms that persist beyond a few weeks, recur frequently, or don\'t respond to standard treatment. This includes chronic ear pain, persistent sinus issues, voice changes, difficulty swallowing, or unexplained neck lumps.',
      },
      {
        q: 'Does Dr. Steve treat children?',
        a: 'Yes. Pediatric ENT is one of our core specialties. Dr. Steve and the team are experienced in treating children with ear infections, adenoid problems, speech-related airway issues, and more.',
      },
      {
        q: 'What surgeries does Dr. Steve perform?',
        a: 'Common procedures include septoplasty, tonsillectomy, adenoidectomy, sinus surgery (FESS), ear tube insertion, and thyroid or salivary gland surgery. All surgical options will be discussed in detail during your consultation.',
      },
    ],
  },
  {
    category: 'Insurance & Payments',
    questions: [
      {
        q: 'Do you accept insurance?',
        a: 'We accept most major insurance plans. Please contact our office before your visit to confirm your specific plan is covered. We\'ll help you understand your benefits.',
      },
      {
        q: 'What if I don\'t have insurance?',
        a: 'We offer self-pay pricing and flexible payment plans. Please call or email us and we\'ll walk you through your options before your appointment.',
      },
      {
        q: 'How much does a consultation cost?',
        a: 'Consultation fees vary depending on the type and complexity of the visit. Please contact our office for a fee estimate or to verify your insurance coverage.',
      },
    ],
  },
  {
    category: 'Clinic & Location',
    questions: [
      {
        q: 'Where is the clinic located?',
        a: 'We are located at 309 W Bass St, Kissimmee, FL 34741, United States. Parking is available on-site.',
      },
      {
        q: 'What are your opening hours?',
        a: 'We are open Monday to Friday, 8:00 AM – 5:00 PM. Weekend appointments may be available — please call to enquire.',
      },
      {
        q: 'How can I contact the clinic?',
        a: 'You can reach us by phone at (305) 555-0192 or (305) 555-0247, or by email at document@cassiusdev.online. We aim to respond to all enquiries within one business day.',
      },
    ],
  },
]

const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-zinc-800 text-sm md:text-base font-medium group-hover:text-sky-500 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-zinc-400 transition-transform duration-300 ${open ? 'rotate-180 text-sky-500' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

const FAQPage = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero banner */}
      <section className="relative bg-[#050505] border-b border-white/10 px-6 md:px-12 py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="ENT Specialist"
            fill
            className="object-cover object-center opacity-40"
            priority
            sizes="(max-width: 768px) 100vw, 448px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-4">
            Help Centre
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
            Frequently Asked{' '}
            <span className="italic font-light text-white/50">Questions</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Everything you need to know about booking, treatments, insurance, and
            visiting Dr. Steve&apos;s ENT practice in Kissimmee, FL.
          </p>
          <Link
            href="/#book"
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-900/40"
          >
            Book an appointment →
          </Link>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="px-6 md:px-12 py-20">
        <div className="container mx-auto max-w-3xl flex flex-col gap-14">
          {FAQS.map(section => (
            <div key={section.category}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                  {section.category}
                </h2>
              </div>

              {/* Accordion */}
              <div className="rounded-2xl border border-zinc-200 px-6 divide-y-0">
                {section.questions.map(item => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-sky-50 border-t border-sky-100 px-6 md:px-12 py-16">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
            Still have questions?
          </h2>
          <p className="text-zinc-400 text-sm mb-8">
            Our team is happy to help. Reach out and we&apos;ll get back to you within one business day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+13055550192"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 hover:border-sky-300 hover:text-sky-500 transition-all px-6 py-3 text-sm font-medium text-zinc-700"
            >
              (305) 555-0192
            </a>
            <a
              href="mailto:document@cassiusdev.online"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200"
            >
              Email us →
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}

export default FAQPage