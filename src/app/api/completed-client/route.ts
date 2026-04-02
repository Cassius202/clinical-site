'use server'

import { createClient } from "@supabase/supabase-js";
import { Client } from "@upstash/qstash";
import { NextResponse } from "next/server";

// 1. Define the shape of your incoming request
interface ClientRequest {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  notes?: string;
}

// 2. Define the shape of your Supabase Table (Optional but better)
interface CompletedClient {
  id: string;
  first_name: string;
  email: string;
  phone_number: string;
  service_type: string;
  notes?: string;
}

const SS_URL = 'https://script.google.com/macros/s/AKfycbxksm5SB4dV4d2-YvED0So-3bN8vGqZJoex1ZuwgA8Y0xpbpDcfxotZB4qyBPTvXxg/exec';

// Use environment variables with fallback types
const supabase = createClient(
  process.env.SUPABASE_URL || '', 
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const qstash = new Client({ token: process.env.QSTASH_TOKEN || '' });

export async function POST(request: Request) {
  try {
    // Cast the JSON to our interface
    const body: ClientRequest = await request.json();
    const { name, email, phone, service_type, notes } = body;

    // Normalize phone
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = `+1${cleanPhone}`;

    // 1. SUPABASE
    const { data: clientData, error: sbError } = await supabase
      .from("completed_clients")
      .insert([{ 
        first_name: name, 
        email, 
        phone_number: formattedPhone, 
        service_type, 
        notes 
      }])
      .select()
      .single();

    if (sbError) throw new Error(sbError.message);
    
    // Cast clientData so TS knows it has an ID
    const newClient = clientData as CompletedClient;

    // 2. GOOGLE SHEETS
    const sheetData = new URLSearchParams({ 
        name, 
        email, 
        phone: formattedPhone, 
        service: service_type 
    });

    // Fire and forget (don't await to keep response fast)
    fetch(SS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: sheetData.toString(),
    }).catch(err => console.error("Sheets sync failed", err));

    // 3. QSTASH
    const baseUrl = process.env.APP_URL || `https://${process.env.VERCEL_URL}`;
    const callbackUrl = `${baseUrl}/api/send-email`;

    await qstash.publishJSON({
      url: callbackUrl,
      body: { 
        email, 
        name, 
        type: "SECOND_FOLLOWUP", // Matches your styled template from earlier
        clientId: newClient.id 
      },
      delay: 86400, // 24 hours
    });

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    // 4. FIXING THE 'ANY' IN CATCH
    // We check if the error is an instance of the Error class
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    console.error("Workflow Error:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}