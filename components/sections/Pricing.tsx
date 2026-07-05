'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Zap, Star, Crown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const plans = [
  {
    id: 'quick-scan',
    icon: Zap,
    name: 'Quick Scan',
    price: 10,
    description: 'A fast health check for your website. Perfect for startups and small businesses.',
    popular: false,
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.2)',
    features: [
      'Website Health Score',
      'SEO Audit',
      'Performance Review',
      'Security Check',
      'Mobile Optimization Check',
      '10–15 Page PDF Report',
      '24-Hour Delivery',
    ],
  },
  {
    id: 'growth-audit',
    icon: Star,
    name: 'Growth Audit',
    price: 29,
    description: 'Deep-dive analysis for growing businesses serious about traffic and conversions.',
    popular: true,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    features: [
      'Everything in Quick Scan',
      'Competitor Analysis',
      'UX Review',
      'Growth Opportunities',
      '30-Day Action Plan',
      'Video Walkthrough',
      '20–30 Page Report',
    ],
  },
  {
    id: 'revenue-audit',
    icon: Crown,
    name: 'Revenue Audit',
    price: 79,
    description: 'Full-spectrum audit for established businesses ready to scale and dominate.',
    popular: false,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
    features: [
      'Everything in Growth Audit',
      '3 Competitor Reviews',
      'Keyword Opportunities',
      'Local SEO Analysis',
      'Google Business Review',
      'Conversion Funnel Review',
      '90-Day Growth Plan',
      '60-Minute Consultation',
    ],
  },
]

function PricingCard({ plan, index }: { plan: typeof plans[number]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group flex flex-col ${plan.popular ? '-mt-4 lg:-mt-6 z-10' : ''}`}
    >
      {/* Popular glow */}
      {plan.popular && (
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${plan.glow}, transparent)`, filter: 'blur(1px)' }}
        />
      )}

      <div
        className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 ${
          plan.popular
            ? 'border-violet-500/40 bg-[#0e0b1f] shadow-2xl shadow-violet-500/20 hover:border-violet-500/60'
            : 'border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]'
        } backdrop-blur-xl`}
      >
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, #7c3aed, #8b5cf6)` }}
            >
              <Star className="w-3 h-3 fill-white" />
              Most Popular
            </div>
          </div>
        )}

        <div className="p-7 flex flex-col flex-1 gap-6">
          {/* Plan header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}
              >
                <plan.icon className="w-4 h-4" style={{ color: plan.color }} />
              </div>
              <h3 className="text-base font-bold text-white">{plan.name}</h3>
            </div>

            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-4xl font-black text-white">${plan.price}</span>
              <span className="text-white/30 text-sm">one-time</span>
            </div>

            <p className="text-sm text-white/40 leading-relaxed">{plan.description}</p>
          </div>

          {/* Divider */}
          <div
            className="h-px"
            style={{ background: `linear-gradient(90deg, ${plan.color}30, transparent)` }}
          />

          {/* Features */}
          <ul className="space-y-3 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                </div>
                <span className="text-sm text-white/60 leading-tight">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA — links to order page with plan pre-selected */}
          <Button
            asChild
            size="lg"
            className="w-full mt-auto"
            variant={plan.popular ? 'premium' : 'outline'}
          >
            <Link href={`/order?plan=${encodeURIComponent(plan.name)}`}>
              Buy Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            One-time payment. No subscriptions. No surprises. Your report arrives within 24 hours.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 space-y-3"
        >
          <p className="text-white/25 text-sm">
            Payments processed securely via Gumroad · PDF delivered to your inbox within 24 hours
          </p>
          <div className="flex items-center justify-center gap-6">
            {['SSL Secured', 'Instant Receipt', '100% Satisfaction', 'Money-back Friendly'].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-white/20">
                <Check className="w-3 h-3 text-emerald-500/50" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
