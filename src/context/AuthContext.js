import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../api/supabaseClient'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signUp = async ({ fullName, email, password }) => {
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
    if (signUpError) return { error: signUpError }

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password })
    if (signInError) return { error: signInError }

    const userId = signInData.user.id
    await supabase.from('profiles').insert([{ id: userId, full_name: fullName }])
    return {}
  }

  const signIn = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}