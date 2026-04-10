"use server";

import { createClient } from "@supabase/supabase-js";
import { Client } from "@upstash/qstash";
import { NextResponse } from "next/server";

// 1. Updated interface to include skip_review
interface ClientRequest {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  notes?: string;
  skip_review?: boolean; // New Field
}

interface CompletedClient {
  id: string;
  first_name: string;
  email: string;
  phone_number: string;
  service_type: string;
  notes?: string;
}

const SS_URL = 'https://script.google.com/macros/s/AKfycbxksm5SB4dV4d2-YvED0So-3bN8vGqZJoex1ZuwgA8Y0xpbpDcfxotZB4qyBPTvXxg/exec';

const supabase = createClient(
  process.env.SUPABASE_URL || '', 
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const qstash = new Client({ token: process.env.QSTASH_TOKEN || '' });

export async function POST(request: Request) {
  try {
    const body: ClientRequest = await request.json();
    // Destructure skip_review from body
    const { name, email, phone, service_type, notes, skip_review } = body;

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
        // Note: If you want to track this in DB, add a 'review_opt_out' column to Supabase
      }])
      .select()
      .single();

    if (sbError) throw new Error(sbError.message);
    
    const newClient = clientData as CompletedClient;

    // 2. GOOGLE SHEETS
    const sheetData = new URLSearchParams({ 
        name, 
        email, 
        phone: formattedPhone, 
        service: service_type 
    });

    fetch(SS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: sheetData.toString(),
    }).catch(err => console.error("Sheets sync failed", err));

    // 3. QSTASH (Conditional Logic)
    if (!skip_review) {
      const baseUrl = process.env.APP_URL || `https://${process.env.VERCEL_URL}`;
      const callbackUrl = `${baseUrl}/api/send-email`;

      await qstash.publishJSON({
        url: callbackUrl,
        body: { 
          email, 
          name, 
          type: "SECOND_FOLLOWUP", 
          clientId: newClient.id 
        },
        delay: 100, // Changed to 86400 (24 hours in seconds). Your previous "60" was 1 minute.
      });
      console.log(`Review scheduled for ${email}`);
    } else {
      console.log(`Review skipped for ${email} per staff request.`);
    }

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Workflow Error:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}