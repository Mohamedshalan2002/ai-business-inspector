'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What exactly do I get in the report?',
    a: 'You get a professional PDF (10â€“60 pages depending on plan) covering SEO, performance, security, accessibility, mobile optimization, and UX â€” each with scored findings, screenshots, and a clear fix-by-fix action list. The Growth and Revenue plans also include competitor benchmarks and a structured 30 or 90-day growth plan.',
  },
  {
    q: 'How does the 24-hour delivery work?',
    a: 'Once your order is placed and your website details are submitted, our AI engine begins scanning immediately. A human expert reviews the output, compiles the PDF report, and delivers it to your email inbox â€” typically within 12â€“24 hours. Most orders arrive well within 24 hours.',
  },
  {
    q: 'Do I need any technical knowledge to understand the report?',
    a: "No. Every finding is written in plain English with a clear severity rating (Critical / High / Medium / Low), what it means for your business, and exactly how to fix it. You can hand the report directly to a developer or agency and they will know what to do.",
  },
  {
    q: 'Will the audit work on any website platform?',
    a: 'Yes â€” Shopify, WordPress, Webflow, Wix, Squarespace, BigCommerce, custom-built sites, and any other platform with a public URL. As long as your site is live and publicly accessible, we can audit it.',
  },
  {
    q: 'What if I am not happy with the report?',
    a: 'If you feel the report missed the mark, reach out within 7 days and we will work to make it right â€” either with a revised report or a full refund. We are building a reputation here, so your satisfaction matters.',
  },
  {
    q: 'Can I buy a report for a client\'s website?',
    a: 'Absolutely. Many agencies and freelancers use our reports as a discovery deliverable or upsell tool. Just enter the client website URL during checkout. The report is branded neutrally so you can present it however you like.',
  },
  {
    q: 'Is payment secure?',
    a: 'All payments are processed by Gumroad, which uses industry-standard SSL encryption and PCI-compliant payment processing. We never see or store your card details.',
  },
  {
    q: 'What\'s included in the 60-minute consultation (Revenue Audit)?',
    a: 'You get a live video call with one of our analysts to walk through your report findings, answer questions, prioritise the fixes for your specific situation, and discuss your 90-day growth strategy. Scheduled within 5 business days of report delivery.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`border-b border-white/[0.06] last:border-0 transition-colors duration-200 ${
        open ? 'border-white/[0.1]' : ''
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
          open ? 'text-white' : 'text-white/70 group-hover:text-white'
        }`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5 ${
          open
            ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
            : 'border-white/10 text-white/30 group-hover:border-white/20 group-hover:text-white/60'
        }`}>
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-white/45 leading-relaxed pr-10">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/[0.08] to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Everything you need to know before getting your audit.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="glass-card px-6 sm:px-8 divide-y-0">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-white/30">
            Still have questions?{' '}
            <a
              href="mailto:hello@aibusinessinspector.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              hello@aibusinessinspector.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

