import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api, onSessionExpired } from '../lib/api'
import { setAccessToken } from '../lib/tokenStore'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const clearSession = useCallback(() => {
    setAccessToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    onSessionExpired(clearSession)
  }, [clearSession])

  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      try {
        const { data } = await api.post('/auth/refresh')
        setAccessToken(data.access_token)
        if (!cancelled) setUser(data.user)
      } catch {
        if (!cancelled) clearSession()
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    restoreSession()
    return () => {
      cancelled = true
    }
  }, [clearSession])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setAccessToken(data.access_token)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    setAccessToken(data.access_token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      clearSession()
    }
  }, [clearSession])

  const updateProfile = useCallback(async (payload) => {
    const { data } = await api.patch('/users/me', payload)
    setUser(data)
    return data
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
