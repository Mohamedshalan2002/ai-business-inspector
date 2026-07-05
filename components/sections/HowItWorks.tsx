'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, CreditCard, Bot, FileDown } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Globe,
    title: 'Enter Your Website',
    description: 'Simply provide your website URL and key business details. No technical knowledge required.',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.25)',
  },
  {
    number: '02',
    icon: CreditCard,
    title: 'Secure Checkout',
    description: 'Choose your audit plan and complete payment securely through Gumroad in seconds.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    number: '03',
    icon: Bot,
    title: 'AI Analyzes Your Site',
    description: 'Our AI engine scans 200+ ranking factors across SEO, performance, security, and UX.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.25)',
  },
  {
    number: '04',
    icon: FileDown,
    title: 'Receive Your PDF Report',
    description: 'Get a detailed, professional PDF report in your inbox within 24 hours — ready to action.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">Process</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            From URL to actionable report in four simple steps — no tech skills needed.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line — desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-emerald-500/30"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="glass-card p-6 h-full hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                  >
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: step.glow }}
                    />
                    <step.icon className="relative w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <span className="text-3xl font-black" style={{ color: `${step.color}30` }}>
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>

                {/* Arrow for mobile */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
                  </div>
                )}
              </div>

              {/* Arrow connector — desktop */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="hidden lg:flex absolute -right-3 top-11 z-10 w-6 h-6 items-center justify-center"
                >
                  <div className="text-white/20 text-xs">→</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-white/25 text-sm">
            Your report lands in your inbox — no login, no dashboard to manage.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
