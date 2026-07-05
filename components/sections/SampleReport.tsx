'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, Download, ChevronRight, AlertCircle, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function MiniDonut({ value, color, size = 40 }: { value: number; color: string; size?: number }) {
  const radius = size / 2 - 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (circumference * value) / 100

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        filter={`drop-shadow(0 0 4px ${color}80)`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fill="white" fontSize="9" fontWeight="700">
        {value}
      </text>
    </svg>
  )
}

const reportMetrics = [
  { label: 'SEO Score', value: 72, prev: 48, color: '#6366f1', status: 'Needs Work' },
  { label: 'Performance', value: 61, prev: 43, color: '#f59e0b', status: 'Poor' },
  { label: 'Security', value: 88, prev: 72, color: '#10b981', status: 'Good' },
  { label: 'Accessibility', value: 54, prev: 41, color: '#8b5cf6', status: 'Needs Work' },
]

const criticalIssues = [
  { severity: 'critical', title: 'Missing meta descriptions on 14 pages', impact: 'High SEO impact', icon: AlertCircle, color: '#ef4444' },
  { severity: 'high', title: 'Images not compressed — 2.4s extra load time', impact: 'High performance impact', icon: AlertCircle, color: '#f59e0b' },
  { severity: 'high', title: 'No HTTPS redirect from HTTP', impact: 'Security risk', icon: AlertCircle, color: '#f59e0b' },
  { severity: 'medium', title: 'CTA buttons below the fold on mobile', impact: 'Conversion drop ~23%', icon: TrendingUp, color: '#6366f1' },
  { severity: 'fixed', title: 'Sitemap.xml properly configured', impact: 'Pass', icon: CheckCircle, color: '#10b981' },
]

export default function SampleReport() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sample" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-3">Sample Report</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            See What You&apos;ll Get
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Every report looks like this — professional, detailed, and ready to hand to your developer or act on yourself.
          </p>
        </motion.div>

        {/* Report preview */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Left — Report shell */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-strong overflow-hidden shadow-2xl">
              {/* PDF toolbar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Website Audit Report</p>
                    <p className="text-[10px] text-white/30">example-store.com · Growth Audit</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] text-white/25 hidden sm:block">PDF · 28 pages</div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/20 transition-colors">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>

              {/* Report content preview */}
              <div className="p-6 space-y-6">
                {/* Score overview */}
                <div>
                  <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">Score Overview</p>
                  <div className="grid grid-cols-4 gap-3">
                    {reportMetrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <MiniDonut value={m.value} color={m.color} />
                        <div className="text-center">
                          <p className="text-[10px] font-semibold text-white/60">{m.label}</p>
                          <p className="text-[9px] text-white/25 mt-0.5">{m.status}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.05]" />

                {/* Issues list */}
                <div>
                  <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">Issues Found — Priority Order</p>
                  <div className="space-y-2">
                    {criticalIssues.map((issue, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.07 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] group hover:border-white/[0.08] transition-colors"
                      >
                        <issue.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: issue.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white/80 leading-tight">{issue.title}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{issue.impact}</p>
                        </div>
                        <span
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: `${issue.color}15`,
                            color: issue.color,
                            border: `1px solid ${issue.color}30`,
                          }}
                        >
                          {issue.severity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Blurred preview of more content */}
                <div className="relative">
                  <div className="space-y-2 select-none" style={{ filter: 'blur(4px)', opacity: 0.4 }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-10 rounded-xl bg-white/[0.03] border border-white/[0.04]" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-card px-4 py-2 flex items-center gap-2">
                      <span className="text-xs font-semibold text-white/60">+39 more insights in your report</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Score before/after */}
            <div className="glass-card p-5 space-y-4">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">Before vs After Fixing</p>
              {reportMetrics.map((m, i) => (
                <div key={m.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">{m.label}</span>
                    <span className="font-semibold text-emerald-400">+{m.value - m.prev} pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Before */}
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${m.prev}%` } : {}}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.7 }}
                        className="h-full rounded-full bg-white/20"
                      />
                    </div>
                    {/* After */}
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${m.value}%` } : {}}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.7 }}
                        className="h-full rounded-full"
                        style={{ background: m.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-white/20 text-center pt-1">Average results after applying recommendations</p>
            </div>

            {/* What you get */}
            <div className="glass-card p-5 space-y-3">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">Report Includes</p>
              {[
                'Executive summary with overall health score',
                'Detailed findings with screenshots',
                'Prioritized fix list by revenue impact',
                'Step-by-step action plan',
                '30-day implementation roadmap',
                'Competitor benchmark (Growth & above)',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                  <span className="text-xs text-white/50">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button asChild size="lg" variant="premium" className="w-full">
              <Link href="/order">
                Get My Report Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
