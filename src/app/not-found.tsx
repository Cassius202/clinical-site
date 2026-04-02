import Link from 'next/link'

const NotFound = () => {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-24 left-16 w-48 h-48 rounded-full bg-yellow-100 blur-2xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-24 right-24 w-56 h-56 rounded-full bg-green-100 blur-2xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-36 h-36 rounded-full bg-purple-100 blur-2xl opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-16 max-w-5xl w-full py-20">

        {/* Left — text */}
        <div className="flex flex-col items-start max-w-md">
          <p className="text-6xl md:text-7xl font-bold text-zinc-900 leading-none mb-2">404</p>
          <p className="text-xl md:text-2xl font-semibold text-zinc-700 mb-3">
            Oops! Page Not Found
          </p>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            This page doesn&apos;t exist or was removed. We suggest you head back home
            and find what you&apos;re looking for from there.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all px-7 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Right — SVG illustration */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

            {/* Robot body */}
            <rect x="140" y="160" width="120" height="110" rx="16" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />

            {/* Robot head */}
            <rect x="155" y="100" width="90" height="75" rx="12" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />

            {/* Screen on head */}
            <rect x="168" y="112" width="64" height="44" rx="6" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.5" />

            {/* 404 text on screen */}
            <text x="200" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">404</text>

            {/* Eyes glow dots */}
            <circle cx="183" cy="124" r="3" fill="#0ea5e9" opacity="0.5" />
            <circle cx="217" cy="124" r="3" fill="#0ea5e9" opacity="0.5" />

            {/* Antenna */}
            <line x1="200" y1="100" x2="200" y2="78" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="73" r="6" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />

            {/* Robot left arm */}
            <rect x="108" y="175" width="32" height="18" rx="9" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />

            {/* Robot right arm */}
            <rect x="260" y="175" width="32" height="18" rx="9" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />

            {/* Robot left leg */}
            <rect x="158" y="265" width="28" height="50" rx="10" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />

            {/* Robot right leg */}
            <rect x="214" y="265" width="28" height="50" rx="10" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />

            {/* Left foot */}
            <rect x="148" y="308" width="38" height="14" rx="7" fill="#e4e4e7" stroke="#d4d4d8" strokeWidth="1.5" />

            {/* Right foot */}
            <rect x="214" y="308" width="38" height="14" rx="7" fill="#e4e4e7" stroke="#d4d4d8" strokeWidth="1.5" />

            {/* Body details — bolts */}
            <circle cx="160" cy="185" r="4" fill="#e4e4e7" stroke="#d4d4d8" strokeWidth="1" />
            <circle cx="240" cy="185" r="4" fill="#e4e4e7" stroke="#d4d4d8" strokeWidth="1" />

            {/* Body panel lines */}
            <line x1="155" y1="210" x2="245" y2="210" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="155" y1="230" x2="245" y2="230" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Floating stars / sparkles */}
            <circle cx="300" cy="120" r="4" fill="#fde68a" />
            <circle cx="320" cy="150" r="3" fill="#bbf7d0" />
            <circle cx="90"  cy="200" r="5" fill="#e9d5ff" />
            <circle cx="75"  cy="160" r="3" fill="#fde68a" />
            <circle cx="330" cy="260" r="4" fill="#bae6fd" />

            {/* Small cross sparkles */}
            <line x1="310" y1="95" x2="310" y2="105" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="305" y1="100" x2="315" y2="100" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" />

            <line x1="68" y1="240" x2="68" y2="250" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="63" y1="245" x2="73" y2="245" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" />

          </svg>
        </div>

      </div>
    </main>
  )
}

export default NotFound