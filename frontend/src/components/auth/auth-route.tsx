// components/auth/auth-route.tsx
'use client'

import { useAuth } from '@/context/authContext'
import { useEffect } from 'react'
import { useModalStore } from '@/stores/modalStore'

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const onLoginModal = useModalStore((state) => state.onLoginPrompt)

  useEffect(() => {
    if (!isLoading && !user) {
      
      onLoginModal()
    }
  }, [user, isLoading, onLoginModal])

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}