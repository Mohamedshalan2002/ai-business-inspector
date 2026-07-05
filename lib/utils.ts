import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function getGumroadUrl(plan: string): string {
  const urls: Record<string, string> = {
    'Quick Scan': process.env.NEXT_PUBLIC_GUMROAD_QUICK_SCAN_URL ?? '#',
    'Growth Audit': process.env.NEXT_PUBLIC_GUMROAD_GROWTH_AUDIT_URL ?? '#',
    'Revenue Audit': process.env.NEXT_PUBLIC_GUMROAD_REVENUE_AUDIT_URL ?? '#',
  }
  return urls[plan] ?? '#'
}
