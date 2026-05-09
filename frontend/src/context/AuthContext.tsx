/**
 * Auth Context for managing authentication state
 * Provides user info and auth methods to components
 */

import { createContext, ReactNode, useState, useCallback } from 'react'
import { IUser } from '@/types'

interface IAuthContextType {
  user: IUser | null
  isAuthenticated: boolean
  login: (user: IUser, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<IUser | null>(null)

  const login = useCallback((user: IUser, token: string) => {
    setUser(user)
    localStorage.setItem('authToken', token)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('authToken')
  }, [])

  const value: IAuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
