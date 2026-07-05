'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, ArrowLeft, Zap, Star, Crown,
  Globe, Building2, User, Mail, FileText, MessageSquare,
  Loader2, Shield, CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const plans = [
  {
    id: 'Quick Scan',
    icon: Zap,
    price: 10,
    color: '#6366f1',
    pages: '10–15',
    gumroadKey: 'NEXT_PUBLIC_GUMROAD_QUICK_SCAN_URL',
  },
  {
    id: 'Growth Audit',
    icon: Star,
    price: 29,
    color: '#8b5cf6',
    pages: '20–30',
    popular: true,
    gumroadKey: 'NEXT_PUBLIC_GUMROAD_GROWTH_AUDIT_URL',
  },
  {
    id: 'Revenue Audit',
    icon: Crown,
    price: 79,
    color: '#f59e0b',
    pages: '40–60',
    gumroadKey: 'NEXT_PUBLIC_GUMROAD_REVENUE_AUDIT_URL',
  },
]

const businessTypes = [
  'E-commerce / Online Store',
  'Service Business',
  'SaaS / Software',
  'Consulting / Agency',
  'Healthcare / Medical',
  'Real Estate',
  'Restaurant / Food',
  'Non-profit',
  'Personal Brand / Blog',
  'Other',
]

interface FormData {
  name: string
  email: string
  company: string
  website: string
  business_type: string
  plan: string
  notes: string
}

const defaultForm: FormData = {
  name: '',
  email: '',
  company: '',
  website: '',
  business_type: '',
  plan: 'Growth Audit',
  notes: '',
}

function OrderForm() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState<FormData>(() => ({
    ...defaultForm,
    plan: searchParams.get('plan') ?? 'Growth Audit',
  }))
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const formRef = useRef<HTMLFormElement>(null)

  // Sync plan from URL on mount
  useEffect(() => {
    const urlPlan = searchParams.get('plan')
    if (urlPlan && plans.find(p => p.id === urlPlan)) {
      setForm(f => ({ ...f, plan: urlPlan }))
    }
  }, [searchParams])

  const selectedPlan = plans.find(p => p.id === form.plan) ?? plans[1]

  function validate(): boolean {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.website.trim()) newErrors.website = 'Website URL is required'
    else if (!/^https?:\/\/.+\..+/.test(form.website.trim())) newErrors.website = 'Enter a valid URL (include https://)'
    if (!form.business_type) newErrors.business_type = 'Please select a business type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      // POST to our API route which forwards to n8n
      await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          website: form.website.trim(),
          business_type: form.business_type,
          plan: form.plan,
          notes: form.notes.trim(),
        }),
      })
      // Proceed regardless of n8n response — don't block user
    } catch {
      // Silent — don't block checkout
    }

    // Redirect to Gumroad
    const gumroadUrls: Record<string, string> = {
      'Quick Scan': process.env.NEXT_PUBLIC_GUMROAD_QUICK_SCAN_URL ?? '#',
      'Growth Audit': process.env.NEXT_PUBLIC_GUMROAD_GROWTH_AUDIT_URL ?? '#',
      'Revenue Audit': process.env.NEXT_PUBLIC_GUMROAD_REVENUE_AUDIT_URL ?? '#',
    }

    const url = gumroadUrls[form.plan]
    if (url && url !== '#') {
      window.location.href = url
    } else {
      // Fallback — go to success (for testing)
      window.location.href = '/success'
    }
  }

  function setField(key: keyof FormData, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  return (
    <div className="min-h-screen bg-[#080808] mesh-gradient relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* Back link */}
      <div className="relative z-10 pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] mb-4">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">Step 1 of 2 — Tell us about your site</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Get Your Audit Report
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Fill in your details below, then proceed to secure checkout. Your report arrives within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="glass-card p-7 space-y-5">
                <h2 className="text-base font-semibold text-white mb-1">Your Details</h2>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name">
                    <User className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setField('name', e.target.value)}
                    className={errors.name ? 'border-red-500/50 focus:ring-red-500/20' : ''}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                    Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={e => setField('email', e.target.value)}
                    className={errors.email ? 'border-red-500/50 focus:ring-red-500/20' : ''}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <Label htmlFor="company">
                    <Building2 className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                    Company Name <span className="text-white/25 text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={e => setField('company', e.target.value)}
                  />
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <Label htmlFor="website">
                    <Globe className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                    Website URL <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={form.website}
                    onChange={e => setField('website', e.target.value)}
                    className={errors.website ? 'border-red-500/50 focus:ring-red-500/20' : ''}
                  />
                  {errors.website && <p className="text-xs text-red-400">{errors.website}</p>}
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <Label htmlFor="business_type">
                    <Building2 className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                    Business Type <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={form.business_type}
                    onValueChange={v => setField('business_type', v)}
                  >
                    <SelectTrigger
                      id="business_type"
                      className={errors.business_type ? 'border-red-500/50' : ''}
                    >
                      <SelectValue placeholder="Select your business type…" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.business_type && <p className="text-xs text-red-400">{errors.business_type}</p>}
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <Label htmlFor="notes">
                    <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                    Additional Notes <span className="text-white/25 text-xs">(optional)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific areas of concern? Competitors to analyse? Let us know…"
                    value={form.notes}
                    onChange={e => setField('notes', e.target.value)}
                    className="min-h-[90px]"
                  />
                </div>
              </div>

              {/* Plan selector */}
              <div className="glass-card p-7 space-y-4">
                <h2 className="text-base font-semibold text-white">
                  <FileText className="w-4 h-4 inline mr-2 opacity-50" />
                  Select Your Plan
                </h2>
                <div className="grid gap-3">
                  {plans.map(plan => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setField('plan', plan.id)}
                      className={`relative flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                        form.plan === plan.id
                          ? 'border-indigo-500/40 bg-indigo-500/[0.07]'
                          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}
                        >
                          <plan.icon className="w-4 h-4" style={{ color: plan.color }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{plan.id}</span>
                            {plan.popular && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                                Popular
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-white/35">{plan.pages} page PDF report</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-white">${plan.price}</span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                            form.plan === plan.id
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-white/20'
                          }`}
                        >
                          {form.plan === plan.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="xl"
                variant="premium"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    Continue to Payment — ${selectedPlan.price}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-white/20">
                You&apos;ll be redirected to Gumroad&apos;s secure checkout. SSL encrypted.
              </p>
            </form>
          </motion.div>

          {/* Right sidebar — order summary */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 lg:sticky lg:top-24"
          >
            {/* Order summary */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Order Summary</h3>

              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${selectedPlan.color}18`, border: `1px solid ${selectedPlan.color}30` }}
                  >
                    <selectedPlan.icon className="w-4 h-4" style={{ color: selectedPlan.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{selectedPlan.id}</p>
                    <p className="text-xs text-white/30">{selectedPlan.pages} page PDF report</p>
                  </div>
                </div>
                <span className="text-xl font-black text-white">${selectedPlan.price}</span>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'PDF Report', value: '✓ Included' },
                  { label: 'Delivery', value: 'Within 24 hours' },
                  { label: 'Format', value: 'PDF download' },
                  { label: 'Revisions', value: '1 included' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span className="text-white/30">{item.label}</span>
                    <span className="text-white/60 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-2xl font-black text-white">${selectedPlan.price}</span>
                </div>
                <p className="text-xs text-white/25 mt-1">One-time · No subscription</p>
              </div>
            </div>

            {/* Trust signals */}
            <div className="glass-card p-5 space-y-3">
              {[
                { icon: Shield, text: 'Secure payment via Gumroad' },
                { icon: CheckCircle, text: 'Report delivered within 24 hours' },
                { icon: FileText, text: 'Professional PDF you can share' },
                { icon: Zap, text: '200+ factors analysed by AI' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <t.icon className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-xs text-white/40">{t.text}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="glass-card p-5">
              <div className="flex gap-0.5 mb-2">
                {'★★★★★'.split('').map((s, i) => <span key={i} className="text-amber-400 text-sm">{s}</span>)}
              </div>
              <p className="text-xs text-white/50 leading-relaxed italic">
                &ldquo;The audit found 12 critical issues I didn&apos;t even know existed. Fixed them in a week and organic traffic went up 34%.&rdquo;
              </p>
              <p className="text-xs text-white/25 mt-2">— Sarah K., Shopify store owner</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
      </div>
    }>
      <OrderForm />
    </Suspense>
  )
}
