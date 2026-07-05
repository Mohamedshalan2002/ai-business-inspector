import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] mesh-gradient grid-overlay flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-white">AI Business <span className="text-indigo-400">Inspector</span></span>
        </div>

        {/* 404 */}
        <div className="mb-6">
          <p
            className="text-[120px] font-black leading-none bg-clip-text text-transparent select-none"
            style={{ backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #2a1a4e 50%, #1a1a2e 100%)' }}
          >
            404
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black leading-none text-white/[0.03] select-none pointer-events-none">
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-white/40 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. It may have been moved or the URL might be wrong.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" variant="premium">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/order">Get My Audit</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
