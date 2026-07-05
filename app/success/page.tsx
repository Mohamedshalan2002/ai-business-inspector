'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, Clock, FileText, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ConfettiParticle({ i }: { i: number }) {
  const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#60a5fa']
  const color = colors[i % colors.length]
  const delay = (i * 0.08) % 1.5
  const left = `${(i * 7.3) % 100}%`
  const size = 6 + (i % 4) * 2

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{ left, top: '-10px', width: size, height: size, background: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 40 : 900,
        opacity: [1, 1, 0],
        rotate: 360 * (i % 2 === 0 ? 1 : -1),
        x: [0, (i % 2 === 0 ? 60 : -60)],
      }}
      transition={{ delay, duration: 2.5 + (i % 3) * 0.5, ease: 'easeIn' }}
    />
  )
}

export default function SuccessPage() {
  const played = useRef(false)

  useEffect(() => {
    // Could trigger a confetti library here — using CSS animation instead
    played.current = true
  }, [])

  return (
    <div className="min-h-screen bg-[#080808] mesh-gradient relative flex items-center justify-center overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <ConfettiParticle key={i} i={i} />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/[0.1] rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-white">AI Business <span className="text-indigo-400">Inspector</span></span>
        </motion.div>

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative inline-flex items-center justify-center mb-8"
        >
          {/* Rings */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-emerald-500/20"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.div
            className="absolute w-36 h-36 rounded-full border border-emerald-500/10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          />
          {/* Icon */}
          <div className="relative w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md" />
            <CheckCircle className="relative w-10 h-10 text-emerald-400" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-3 mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Thank You!
          </h1>
          <p className="text-xl text-white/60 font-medium">
            Your order has been received.
          </p>
          <p className="text-white/40 text-base leading-relaxed max-w-sm mx-auto">
            Your <strong className="text-white/70">AI Business Inspector</strong> report will be delivered to your inbox within{' '}
            <strong className="text-white/70">24 hours</strong>.
          </p>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="glass-card p-6 mb-8 text-left space-y-4"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">What Happens Next</p>
          {[
            {
              icon: CheckCircle,
              color: '#10b981',
              title: 'Order confirmed',
              sub: 'You\'ll receive a receipt from Gumroad shortly.',
              timing: 'Now',
            },
            {
              icon: Zap,
              color: '#6366f1',
              title: 'AI begins analysis',
              sub: 'Our system starts scanning your website across 200+ factors.',
              timing: 'Within 1 hour',
            },
            {
              icon: FileText,
              color: '#8b5cf6',
              title: 'Report compiled',
              sub: 'Your full PDF report is prepared with prioritised fixes.',
              timing: 'Within 12 hours',
            },
            {
              icon: Mail,
              color: '#f59e0b',
              title: 'PDF delivered to you',
              sub: 'Your professional report lands in your inbox, ready to action.',
              timing: 'Within 24 hours',
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
              >
                <step.icon className="w-4 h-4" style={{ color: step.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <span className="text-[10px] text-white/25 flex-shrink-0">{step.timing}</span>
                </div>
                <p className="text-xs text-white/35 mt-0.5">{step.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/15"
        >
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300/70 text-left leading-relaxed">
              <strong className="text-amber-300">Pro tip:</strong> Check your spam folder if you don&apos;t see the email within 24 hours. The report comes from{' '}
              <span className="font-mono">noreply@aibusinessinspector.com</span>
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-xs text-white/20">
            Questions? Email us at{' '}
            <a href="mailto:hello@aibusinessinspector.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              hello@aibusinessinspector.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
