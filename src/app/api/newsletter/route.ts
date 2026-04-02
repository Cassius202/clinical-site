import { createClient } from '@supabase/supabase-js'
import { Client } from '@upstash/qstash'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const qstash = new Client({ token: process.env.QSTASH_TOKEN! })

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    // 1. Save to Supabase (ignore duplicate emails)
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
    
    if (error?.code === '23505') {
      // Unique constraint — already subscribed, still return success
      return Response.json({ success: true, alreadySubscribed: true })
    }

    // 2. Welcome email after 5 minutes
    await qstash.publishJSON({
      url: `${BASE_URL}/api/send-email`,
      delay: 5 * 60,
      body: { email, type: 'newsletter_welcome' },
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('newsletter error:', err)
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}