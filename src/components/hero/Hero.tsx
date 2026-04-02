import Image from 'next/image'
import Link from 'next/link'
import { Star, ArrowUpRight } from 'lucide-react'
import { HERO_IMAGE, BULLETS } from "@/constants/Constants"
import { assets } from '@/constants/assets'

const StarRating = () => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1.5 gap-1 border border-white/10">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
      ))}
    </div>
    <span className="text-sm font-light tracking-wide text-white/70">
      4.9 <span className="text-white/20 mx-1.5">|</span> 2,800+ Patient Reviews
    </span>
  </div>
)

const CheckIcon = () => (
  <div className="shrink-0 w-5 h-5 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
    <svg className="w-3 h-3 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </div>
)

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col bg-[#050505] overflow-hidden">

      {/* Background Layer */}
      <div className="absolute inset-0 z-0">

     {/* Looping background video — sits on top of fallback image */}
        <video
          src={assets.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-right lg:object-center opacity-70"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container px-6 md:px-12 xl:px-28 flex flex-1 flex-col justify-center pt-30 pb-8">
        <div className="max-w-3xl">
          <StarRating />

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 md:mb-8">
            Specialized ENT Care<br />
            Tailored to <span className="italic font-light opacity-80">You.</span>
          </h1>

          <p className="text-white/50 text-base md:text-xl max-w-xl font-light leading-relaxed mb-8 md:mb-10">
            Skip the wait times. Connect with board-certified specialists for ear, nose, and throat health through our seamless online booking.
          </p>

          <div className="flex items-center gap-6 mb-10 md:mb-12">
            <Link
              href="#book"
              className="group flex items-center gap-4 bg-white hover:bg-zinc-200 text-black py-2 pl-6 pr-2 rounded-full transition-all duration-300 shadow-lg shadow-sky-500/10"
            >
              <span className="text-sm font-semibold uppercase tracking-wider">Book Now</span>
              <div className="bg-sky-500 p-2.5 rounded-full text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={20} />
              </div>
            </Link>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 max-w-2xl">
            {BULLETS.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70 text-sm font-light">
                <CheckIcon />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  )
}

export default Hero