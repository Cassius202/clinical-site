'use client'

import { useState, useEffect } from 'react'
import { X, Ear, Loader2 } from 'lucide-react'
import { assets } from '@/constants/assets'
import Image from 'next/image'
import useSessionStorage from '@/hooks/useSessionStorage'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const OfferModal = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false)
  const [formState, setFormState] = useState<FormState>('idle')

  const [dismissed, setDismissed] = useSessionStorage('offer-dismissed', false)

  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Scroll depth trigger
  useEffect(() => {
    setMounted(true)
  }, []);

  useEffect(() => {
    // If user has already dismissed or signed up, don't attach listener
    if (dismissed || !mounted) return

    const handleScroll = () => {
      const scrolled   = window.scrollY + window.innerHeight
      const total      = document.documentElement.scrollHeight
      const percentage = (scrolled / total) * 100

      if (percentage >= 60) {
        setVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  // Lock body scroll logic
  useEffect(() => {
    if (visible) {
      const scrollY = window.scrollY
      document.body.style.position  = 'fixed'
      document.body.style.top       = `-${scrollY}px`
      document.body.style.width     = '100%'
      document.body.style.overflowY = 'scroll'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.overflowY = ''
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    
    return () => {
      document.body.style.position = ''
    }
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true) // Updates localStorage so it won't show again
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    try {
      const res = await fetch('/api/offer-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      })

      if (!res.ok) throw new Error('Failed')
      
      setFormState('success')
      setDismissed(true) // Ensure they aren't prompted again after converting
    } catch {
      setFormState('error')
    }
  }

  // Only render if visible AND hasn't been dismissed before
  if (!visible || dismissed === true) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto isolate">
          <div className='h-full w-full pointer-events-none select-none absolute -z-10 bg-stone-50 overflow-hidden'>
            <Image fill src={assets.backgroundImage} alt="hero" className='w-full object-cover opacity-10' />
          </div>
          
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors p-1"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="px-8 py-8">
            {formState === 'success' ? (
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center">
                  <Ear size={28} className="text-sky-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">You&apos;re on the list!</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                  Dr. Steve&apos;s team will reach out within one business day.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-2 rounded-full bg-sky-500 hover:bg-sky-400 px-6 py-2.5 text-sm font-semibold text-white transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                    <Ear size={22} className="text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-1">
                      Limited offer
                    </p>
                    <h2 className="text-xl font-bold text-zinc-900 leading-snug">
                      Free Hearing Screening
                    </h2>
                    <p className="text-zinc-600 text-sm mt-1">
                      Claim a complimentary ENT hearing assessment with Dr. Steve.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                  />

                  {formState === 'error' && (
                    <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 disabled:opacity-60 transition-all px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200"
                  >
                    {formState === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                    ) : (
                      'Claim my free screening →'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default OfferModal