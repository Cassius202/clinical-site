'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { NAV_LINKS } from '@/constants/Constants'
import { assets } from '@/constants/assets'
import { Phone, Mail } from 'lucide-react'

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Headroom + top bar logic
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 10)
      if (currentY > 80) {
        setHidden(currentY > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
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
      if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1)
    }
    return () => {
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.overflowY = ''
    }
  }, [open])

  // Close drawer on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

   if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <div
      className={`
        fixed inset-x-0 top-0 z-30
        transition-transform duration-300 ease-in-out
        ${hidden ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      {/* ── Top info bar ── */}
      <div
        className={`
          bg-sky-500 text-white text-sm px-6 md:px-12
          flex items-center justify-between
          overflow-hidden transition-all duration-300 ease-in-out
          ${scrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-10 opacity-100 py-2'}
        `}
      >
        <div className="hidden sm:flex items-center gap-5">
          <a href="tel:+13055550192" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Phone size={11} />
            +1 (305) 555-0192
          </a>
          <a href="tel:+13055550247" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Phone size={11} />
            +1 (305) 555-0247
          </a>
        </div>
        <a
          href="mailto:document@cassiusdev.online"
          className="flex items-center gap-1.5 hover:text-white/80 transition-colors ml-auto sm:ml-0"
        >
          <Mail size={17} />
          document@cassiusdev.online
        </a>
      </div>

      {/* ── Main header ── */}
      <header className="flex items-center bg-stone-900/40 backdrop-blur-md justify-between px-6 py-2 md:px-12">

        {/* Mobile phone button */}
        <div className="flex items-center sm:hidden gap-3">
          <a
            href="tel:+13055550192"
            className="flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all p-2 text-white"
          >
            <Phone size={18} />
          </a>
        </div>

        {/* Logo */}
        <Link href="/#home" className="flex items-center gap-2.5">
          <Image src={assets.logo} alt="Q-Health logo" width={32} height={32} />
          <span className="text-white text-xl font-semibold tracking-tight">
            Q<span>-Health</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/book"
            className="flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all px-5 py-2.5 text-sm font-medium text-white"
          >
            Book an appointment
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white cursor-pointer p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <Image className="invert" src={assets.menuIcon} alt="menu" width={28} height={28} />
        </button>

        {/* Mobile drawer */}
        {open && (
          <div
            ref={drawerRef}
            className="absolute top-0 left-0 right-0 bg-zinc-900 backdrop-blur-md border-t border-white/10 flex flex-col px-6 py-4 gap-3 lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="self-end text-white/60 hover:text-white transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-cyan-200 hover:scale-[1.01] text-base py-1"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
              <a href="tel:+13055550192" className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors">
                <Phone size={13} /> +1 (305) 555-0192
              </a>
             
              <a href="mailto:document@cassiusdev.online" className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors">
                <Mail size={13} /> document@cassiusdev.online
              </a>
            </div>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full bg-sky-500 hover:bg-sky-400 px-5 py-2.5 text-sm font-medium text-white"
            >
              Call us now
            </Link>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header