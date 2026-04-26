import { createClient } from '@/lib/supabase/client'

export const authService = {
  async signUp(email: string, password: string, fullName: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    return { data, error }
  },

  async signIn(identifier: string, password: string) {
    const supabase = createClient()
    const isEmail = identifier.includes('@')
    if (isEmail) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: identifier, password })
      return { data, error }
    }
    const phone = identifier.startsWith('+') ? identifier : `+57${identifier.replace(/\s/g, '')}`
    const { data, error } = await supabase.auth.signInWithPassword({ phone, password })
    return { data, error }
  },

  async signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getUser() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    return { data, error }
  },

  async resetPassword(email: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    })
    return { data, error }
  },
}
