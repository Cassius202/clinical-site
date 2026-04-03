'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function handleLogin(formData: FormData) {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  // Validate inputs
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  // Email validation
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }

  // Compare with .env
  if (
    email === process.env.ADMIN_EMAIL && 
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();

    cookieStore.set('admin_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_access');

  redirect('/');
}