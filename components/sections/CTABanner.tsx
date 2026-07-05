'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#0e0b1f] to-violet-950" />
          <div className="absolute inset-0 grid-overlay opacity-40" />

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />

          {/* Border gradient */}
          <div className="absolute inset-0 rounded-3xl border border-white/[0.09]" />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-16 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/[0.1] mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-300">Reports being delivered today</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 text-balance"
            >
              Your website is losing{' '}
              <span className="gradient-text">customers right now.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-lg text-white/45 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Every day without an audit is another day of invisible leaks — in traffic, conversions, and revenue.
              Get your full report in 24 hours for as little as $10.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Button asChild size="xl" variant="premium">
                <Link href="/order">
                  Get My Website Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="#pricing">See Pricing</a>
              </Button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 flex-wrap"
            >
              {[
                { icon: Zap, text: 'AI-Powered Analysis' },
                { icon: Clock, text: '24-Hour Delivery' },
                { icon: Shield, text: 'Secure via Gumroad' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-white/30">
                  <item.icon className="w-3.5 h-3.5 text-indigo-400/60" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
