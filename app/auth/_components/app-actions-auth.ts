
'use server'

import { redirect } from 'next/navigation'

export async function requestMagicLink(formData: FormData) {
  const email = formData.get('email')

  if (!email || typeof email !== 'string') {
    return { error: 'Please provide a valid email address.' }
  }

  // Simulate sending a magic link
  // In a real application, you would integrate with your authentication service here
  await new Promise(resolve => setTimeout(resolve, 1500))

  console.log(`Magic link sent to ${email}`)

  // Redirect to a confirmation page
  redirect('/auth/check-email')
}