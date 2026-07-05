import { NextRequest, NextResponse } from 'next/server'

interface OrderPayload {
  name: string
  email: string
  company: string
  website: string
  business_type: string
  plan: string
  notes: string
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('[submit-order] N8N_WEBHOOK_URL is not set')
    // Still return 200 — don't block the user checkout flow
    return NextResponse.json({ ok: true, warning: 'Webhook not configured' }, { status: 200 })
  }

  let body: OrderPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Validate required fields
  const required: (keyof OrderPayload)[] = ['name', 'email', 'website', 'plan']
  for (const field of required) {
    if (!body[field]?.trim()) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  const payload: OrderPayload = {
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company?.trim() ?? '',
    website: body.website.trim(),
    business_type: body.business_type?.trim() ?? '',
    plan: body.plan.trim(),
    notes: body.notes?.trim() ?? '',
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AI-Business-Inspector/1.0',
      },
      body: JSON.stringify(payload),
      // 8 second timeout — don't keep user waiting
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      console.error(`[submit-order] n8n webhook returned ${response.status}`)
      // Still proceed — don't block checkout
      return NextResponse.json({ ok: true, warning: 'Webhook responded with error' }, { status: 200 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    // Timeout or network error — log and continue
    console.error('[submit-order] Failed to reach n8n webhook:', err)
    return NextResponse.json({ ok: true, warning: 'Webhook unreachable' }, { status: 200 })
  }
}
