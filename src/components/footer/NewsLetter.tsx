'use client'

import { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import useSessionStorage from '@/hooks/useSessionStorage'

type State = 'idle' | 'loading' | 'success' | 'error'

const NewsLetter = () => {
  const [email, setEmail]           = useSessionStorage<string>('newsletter_email', '')
  const [subscribed, setSubscribed] = useSessionStorage<boolean>('newsletter_subscribed', false)
  const [state, setState]           = useState<State>(subscribed ? 'success' : 'idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()

      setSubscribed(true)       // persist across page navigations this session
      setState('success')
      toast.success('Thanks for signing up!')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="min-h-[50vh] rounded-t-[3.5rem] bg-sky-100 w-full flex items-center justify-center px-6 md:px-12 py-24">
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-200 flex items-center justify-center">
          <Mail size={24} className="text-sky-500" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
            Stay informed
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-[1.15] tracking-tight">
            ENT Health Tips,{' '}
            <span className="italic font-light text-zinc-400">straight to your inbox.</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Join patients who get Dr. Steve&apos;s practical advice on ear, nose,
            and throat health — no spam, just useful insights delivered monthly.
          </p>
        </div>

        {/* Form / states */}
        {state === 'success' ? (
          <div className="flex items-center gap-3 bg-white border border-sky-200 rounded-2xl px-6 py-4">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
              <Mail size={16} className="text-sky-500" />
            </div>
            <p className="text-zinc-700 text-sm font-medium">
              You&apos;re subscribed! Check your inbox for a welcome note.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-sky-200 bg-white px-5 py-3 text-sm text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-400 active:scale-95 disabled:opacity-60 transition-all px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shadow-md shadow-sky-200"
            >
              {state === 'loading' ? (
                <><Loader2 size={15} className="animate-spin" /> Subscribing...</>
              ) : (
                'Subscribe →'
              )}
            </button>
          </form>
        )}

        {state === 'error' && (
          <p className="text-xs text-red-400 -mt-4">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-xs text-zinc-400">
          Unsubscribe anytime. We respect your privacy.
        </p>

      </div>
    </div>
  )
}

export default NewsLetter