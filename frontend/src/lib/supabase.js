import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

// Capture the invitation before Supabase removes the redirect fragment.
const redirect = new URLSearchParams(window.location.hash.slice(1))
export const invitation = redirect.get('type') === 'invite'
  ? { accessToken: redirect.get('access_token') }
  : null

export const supabase = url && publishableKey ? createClient(url, publishableKey) : null

