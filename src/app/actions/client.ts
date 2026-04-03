'use server';

import { createClient } from "@supabase/supabase-js";

export interface ClientListResponse {
  success: boolean;
  data: any[];  // or your Client type
  hasMore: boolean;
  total: number | null;
  error?: string;  // Make error optional
}

// Initialize Supabase (Server-side)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

/**
 * Generic pagination helper to calculate range
 */
const getPagination = (page: number, size: number) => {
  const from = page * size;
  const to = from + size - 1;
  return { from, to };
};

/**
 * Fetches completed clients in batches
 */
export async function getClients(page: number = 0, limit: number = 50) {
  try {
    const { from, to } = getPagination(page, limit);
    const { data, error, count } = await supabase
      .from("completed_clients")
      .select("*", { count: 'exact' })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { 
      success: true, 
      data, 
      hasMore: (count || 0) > to + 1,
      total: count 
    };
  } catch (error: unknown) {
    return handleActionError(error, "Failed to fetch clients");
  }
}

/**
 * Fetches newsletter subscriptions in batches
 */
export async function getNewsletterSubscriptions(page: number = 0, limit: number = 100) {
  try {
    const { from, to } = getPagination(page, limit);
    const { data, error, count } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, created_at", { count: 'exact' })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { 
      success: true, 
      data, 
      hasMore: (count || 0) > to + 1,
      total: count 
    };
  } catch (error: unknown) {
    return handleActionError(error, "Failed to fetch newsletter subscriptions");
  }
}

/**
 * Fetches offer leads in batches
 */
export async function getOfferLeads(page: number = 0, limit: number = 50) {
  try {
    const { from, to } = getPagination(page, limit);
    const { data, error, count } = await supabase
      .from("offer_leads")
      .select("id, name, email, phone, created_at", { count: 'exact' })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { 
      success: true, 
      data, 
      hasMore: (count || 0) > to + 1,
      total: count 
    };
  } catch (error: unknown) {
    return handleActionError(error, "Failed to fetch offer leads");
  }
}

function handleActionError(error: unknown, defaultMessage: string) {
  let errorMessage = defaultMessage;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  
  console.error(`${defaultMessage}:`, errorMessage);

  // CRITICAL: This must return the same keys as a successful fetch
  return { 
    success: false, 
    error: errorMessage, 
    data: [], 
    hasMore: false, 
    total: 0 // Added this to fix your build error
  };
}