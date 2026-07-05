export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#080808] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-white animate-pulse">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          {/* Spinning ring */}
          <svg
            className="absolute -inset-2 w-16 h-16 animate-spin"
            style={{ animationDuration: '1.5s' }}
            viewBox="0 0 64 64"
          >
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke="url(#loadGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="88 88"
            />
            <defs>
              <linearGradient id="loadGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className="text-sm text-white/30 font-medium tracking-wide">Loading…</p>
      </div>
    </div>
  )
}
