'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, FileText, CheckCircle } from 'lucide-react'

const trust = [
  { icon: Zap, label: 'Fast Delivery', sub: 'Reports in 24 hours' },
  { icon: Shield, label: 'AI Powered', sub: 'Deep machine analysis' },
  { icon: FileText, label: 'Professional Reports', sub: 'PDF ready to share' },
  { icon: CheckCircle, label: '100% Actionable', sub: 'Clear fix-by-fix plan' },
]

const logos = [
  'Shopify', 'WooCommerce', 'WordPress', 'Webflow', 'Squarespace', 'BigCommerce', 'Wix',
]

export default function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-20 border-y border-white/[0.05] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-950/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stars & headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {'★★★★★'.split('').map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4, type: 'spring' }}
                className="text-amber-400 text-xl"
              >
                {s}
              </motion.span>
            ))}
          </div>
          <p className="text-white/30 text-sm font-medium tracking-wide uppercase">
            Trusted by businesses worldwide
          </p>
        </motion.div>

        {/* Trust features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {trust.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-5 text-center group hover:border-indigo-500/20 transition-all duration-300 hover:bg-white/[0.06]"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-500/15 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
              <p className="text-xs text-white/35">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Platform logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <p className="text-center text-[11px] text-white/20 uppercase tracking-widest font-medium mb-5">
            Works with all platforms
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {logos.map((logo, i) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="text-sm font-semibold text-white/15 hover:text-white/30 transition-colors cursor-default tracking-wide"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
