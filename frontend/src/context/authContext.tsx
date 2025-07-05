'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/auth/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type AuthContextType = {
  user: User | null
  userType: 'investor' | 'realtor' | null
  isLoading: boolean
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<'investor' | 'realtor' | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createSupabaseClient()
  const router = useRouter()

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword(credentials)
      
      if (error) throw error

      // Get user type from metadata
      const userType = data.user?.user_metadata?.user_type as 'investor' | 'realtor' | null
      setUser(data.user)
      setUserType(userType)

      // Redirect immediately after successful login
      const dashboardPath = userType === 'realtor' 
        ? '/realtor-dashboard' 
        : '/investor-dashboard'
      router.push(dashboardPath)
      
      toast.success('Login successful!')
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error instanceof Error ? error.message : 'Login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setUserType(null)
      router.push('/')
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error(error instanceof Error ? error.message : 'Logout failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session?.user) {
          setUser(session.user)
          setUserType(session.user.user_metadata?.user_type || null)
        }
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          setUserType(session.user.user_metadata?.user_type || null)
          
          // Redirect to appropriate dashboard after sign in
          if (event === 'SIGNED_IN') {
            const dashboardPath = session.user.user_metadata?.user_type === 'realtor'
              ? '/realtor-dashboard'
              : '/investor-dashboard'
            router.push(dashboardPath)
          }
        } else {
          setUser(null)
          setUserType(null)
        }
        
        if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType, 
      isLoading, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)