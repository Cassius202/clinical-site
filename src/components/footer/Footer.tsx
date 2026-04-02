'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { NAV_LINKS } from '@/constants/Constants'
import { assets } from '@/constants/assets'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
    return null
  }
  return (
    <footer className="bg-zinc-900 text-zinc-300">

      {/* Main footer body */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Map — top on mobile, right on desktop (order-first / order-last) ── */}
          <div className="order-first lg:order-last w-full rounded-2xl overflow-hidden border border-zinc-700 shadow-lg aspect-video lg:aspect-auto lg:min-h-[340px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597283.2304415307!2d-86.02174371249997!3d28.299175200000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd8418407ab6a7%3A0x22d4db15576ddd03!2sFlorida%20Sports%20%26%20Family%20Health!5e0!3m2!1sen!2sng!4v1774704126772!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Q-Health location"
            />
          </div>

          {/* ── Left col — brand + contact + nav ── */}
          <div className="order-last lg:order-first flex flex-col gap-10">

            {/* Brand */}
            <div>
              <Link href="#home" className="flex items-center gap-2.5 mb-4">
                <Image src={assets.logo} alt="Q-Health logo" width={32} height={32} />
                <span className="text-white text-xl font-semibold tracking-tight">
                  Q<span className="text-zinc-400">-Health</span>
                </span>
              </Link>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Board-certified ENT specialist care in Kissimmee, FL. Book online and
                be seen within days — no long waits, no hassle.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+13055550192"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <Phone size={15} className="text-zinc-500 shrink-0 group-hover:text-zinc-300 transition-colors" />
                (305) 555-0192
              </a>
              <a
                href="tel:+13055550247"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <Phone size={15} className="text-zinc-500 shrink-0 group-hover:text-zinc-300 transition-colors" />
                (305) 555-0247
              </a>
              <a
                href="mailto:document@cassiusdev.online"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <Mail size={15} className="text-zinc-500 shrink-0 group-hover:text-zinc-300 transition-colors" />
                document@cassiusdev.online
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin size={15} className="text-zinc-500 shrink-0 mt-0.5" />
                309 W Bass St, Kissimmee, FL 34741, United States
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 bg-zinc-950/50">
        <div className="container mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Q-Health. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs">
            Dr. Steve Harrington, ENT Specialist · Kissimmee, FL
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer