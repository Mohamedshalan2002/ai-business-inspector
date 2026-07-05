import Link from 'next/link'
import { Zap, Twitter, Mail } from 'lucide-react'

const links = {
  Product: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: "What's Included", href: '/#included' },
    { label: 'Sample Report', href: '/#sample' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Plans: [
    { label: 'Quick Scan — $10', href: '/order?plan=Quick+Scan' },
    { label: 'Growth Audit — $29', href: '/order?plan=Growth+Audit' },
    { label: 'Revenue Audit — $79', href: '/order?plan=Revenue+Audit' },
  ],
  Company: [
    { label: 'Get Your Audit', href: '/order' },
    { label: 'Contact Us', href: 'mailto:hello@aibusinessinspector.com' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080808] relative overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit mb-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Zap className="w-4 h-4 text-white" fill="currentColor" />
                </div>
              </div>
              <span className="font-bold text-white text-[15px] tracking-tight">
                AI Business<span className="text-indigo-400"> Inspector</span>
              </span>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed mb-6 max-w-[200px]">
              AI-powered website audits that turn hidden issues into growth.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/aibizinspector"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-white/30 hover:text-white hover:border-white/15 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:hello@aibusinessinspector.com"
                className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-white/30 hover:text-white hover:border-white/15 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} AI Business Inspector. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Refund Policy', href: '#' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-white/20 hover:text-white/40 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
