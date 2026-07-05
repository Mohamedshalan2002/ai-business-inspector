'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface ScoreMetric {
  label: string
  value: number
  color: string
  glowColor: string
  bgColor: string
  textColor: string
}

const metrics: ScoreMetric[] = [
  { label: 'SEO', value: 92, color: '#6366f1', glowColor: 'rgba(99,102,241,0.4)', bgColor: 'rgba(99,102,241,0.1)', textColor: '#a5b4fc' },
  { label: 'Performance', value: 88, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.4)', bgColor: 'rgba(139,92,246,0.1)', textColor: '#c4b5fd' },
  { label: 'Security', value: 97, color: '#10b981', glowColor: 'rgba(16,185,129,0.4)', bgColor: 'rgba(16,185,129,0.1)', textColor: '#6ee7b7' },
  { label: 'Accessibility', value: 91, color: '#f59e0b', glowColor: 'rgba(245,158,11,0.4)', bgColor: 'rgba(245,158,11,0.1)', textColor: '#fcd34d' },
]

function ScoreRing({ metric, index }: { metric: ScoreMetric; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * (inView ? metric.value : 0)) / 100

  useEffect(() => {
    if (!inView) return
    let start = 0
    const end = metric.value
    const duration = 1400
    const delay = index * 120
    const startTime = Date.now() + delay

    const animate = () => {
      const now = Date.now()
      if (now < startTime) {
        requestAnimationFrame(animate)
        return
      }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * end)
      setDisplayValue(start)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, metric.value, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative" style={{ width: 72, height: 72 }}>
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-0 transition-opacity duration-1000"
          style={{
            background: metric.glowColor,
            opacity: inView ? 0.3 : 0,
          }}
        />
        {/* SVG Ring */}
        <svg width="72" height="72" viewBox="0 0 72 72">
          {/* Track */}
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="5"
          />
          {/* Progress */}
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={metric.color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
            transition={{ delay: index * 0.12, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            filter={`drop-shadow(0 0 6px ${metric.color})`}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color: metric.textColor }}>
            {displayValue}
          </span>
        </div>
      </div>
      <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
        {metric.label}
      </span>
    </motion.div>
  )
}

function MiniBarChart() {
  const bars = [45, 72, 58, 88, 65, 92, 78]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-end gap-1 h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
          style={{ originY: 1 }}
          className="flex-1 rounded-sm"
        >
          <div
            className="w-full rounded-sm"
            style={{
              height: `${h * 0.32}px`,
              background: i === 6 ? 'linear-gradient(to top, #6366f1, #8b5cf6)' : 'rgba(99,102,241,0.2)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

function SparkLine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const points = '10,28 25,22 40,25 55,15 70,18 85,10 100,8'

  return (
    <div ref={ref} className="w-full h-8 relative overflow-hidden">
      <svg width="100%" height="32" viewBox="0 0 110 36" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area */}
        <motion.polygon
          points={`10,36 ${points} 100,36`}
          fill="url(#sparkArea)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        />
        {/* Line */}
        <motion.polyline
          points={points}
          fill="none"
          stroke="url(#sparkGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
        />
        {/* End dot */}
        <motion.circle
          cx="100" cy="8" r="2.5"
          fill="#8b5cf6"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 1.9, duration: 0.3 }}
        />
      </svg>
    </div>
  )
}

export default function DashboardMockup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[480px] mx-auto"
      style={{ perspective: 1000 }}
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-transparent rounded-3xl blur-2xl" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/[0.09] bg-[#0e0e12] shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          <div className="flex-1 ml-2">
            <div className="mx-auto w-[60%] h-5 rounded-md bg-white/[0.05] flex items-center justify-center">
              <span className="text-[9px] text-white/25 font-mono">aibusinessinspector.com</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Overall score */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-1">Overall Score</p>
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="text-4xl font-black text-white"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  92
                </motion.span>
                <span className="text-white/30 text-sm">/100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-400">Analyzing…</span>
              </div>
              <p className="text-[10px] text-white/25 mt-1.5">24hr delivery</p>
            </div>
          </div>

          {/* Score rings grid */}
          <div className="grid grid-cols-4 gap-3">
            {metrics.map((metric, i) => (
              <ScoreRing key={metric.label} metric={metric} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05]" />

          {/* Performance trend */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Traffic Opportunity</span>
              <span className="text-[10px] font-semibold text-emerald-400">+34%</span>
            </div>
            <SparkLine />
          </div>

          {/* Issues found */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Issues Found</span>
              <span className="text-[10px] text-white/25">by severity</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Critical', count: 3, color: '#ef4444', width: '20%' },
                { label: 'High', count: 7, color: '#f59e0b', width: '47%' },
                { label: 'Medium', count: 12, color: '#6366f1', width: '80%' },
                { label: 'Low', count: 5, color: '#10b981', width: '33%' },
              ].map((issue, i) => (
                <div key={issue.label} className="flex items-center gap-2">
                  <span className="text-[10px] w-12 text-white/30">{issue.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: issue.width } : {}}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: issue.color }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40 w-4 text-right">{issue.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Weekly Score</span>
            </div>
            <MiniBarChart />
          </div>

          {/* Bottom status row */}
          <div className="flex items-center gap-2 pt-1">
            {[
              { label: 'Mobile', ok: true },
              { label: 'HTTPS', ok: true },
              { label: 'Core Web Vitals', ok: false },
              { label: 'Schema', ok: true },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-medium border ${
                  item.ok
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                <span>{item.ok ? '✓' : '✗'}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scan line animation overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
            animate={{ y: ['-100%', '800%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -right-4 top-12 bg-[#0e0e12] border border-white/[0.09] rounded-xl px-3 py-2 shadow-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-xs">✓</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Report Ready</p>
            <p className="text-[9px] text-white/30">PDF delivered</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -left-4 bottom-16 bg-[#0e0e12] border border-white/[0.09] rounded-xl px-3 py-2 shadow-xl"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">AI</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">AI Analysis</p>
            <p className="text-[9px] text-white/30">47 issues found</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
