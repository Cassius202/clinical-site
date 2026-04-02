import { createClient } from '@supabase/supabase-js'
import { Client } from '@upstash/qstash'
import { NextResponse } from 'next/server' // Use NextResponse for better compatibility

// Initialize clients outside the handler
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const qstash = new Client({ token: process.env.QSTASH_TOKEN! })

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json()

    // Use APP_URL or VERCEL_URL for QStash callbacks
    const BASE_URL = process.env.APP_URL || `https://${process.env.VERCEL_URL}`

    // 1. Save to Supabase
    const { error: sbError } = await supabase
      .from('offer_leads')
      .insert([{ name, email, phone }]) // Wrap in array for Supabase best practice

    if (sbError) throw new Error(`Supabase: ${sbError.message}`)

    // 2. Email 1 — confirmation after 5 minutes (300 seconds)
    await qstash.publishJSON({
      url: `${BASE_URL}/api/send-email`,
      delay: 300,
      body: { email, name, type: 'offer_confirmation' },
    })

    // 3. Email 2 — follow up after 48 hours (172,800 seconds)
    await qstash.publishJSON({
      url: `${BASE_URL}/api/send-email`,
      delay: 172800,
      body: { email, name, type: 'offer_followup' },
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    // 1. Default message
    let errorMessage = "Failed to process lead";

    // 2. Check if it's an actual Error object
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    // 3. Handle cases where it's a Supabase-style object or string
    else if (typeof err === "string") {
      errorMessage = err;
    }

    console.error("offer-lead error:", errorMessage);

    return NextResponse.json(
      { error: "Error sending email", details: errorMessage },
      { status: 500 }
    );
  }
}