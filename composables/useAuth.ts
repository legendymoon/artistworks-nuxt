import { ref } from 'vue'
import { useCookie } from '#app'

export function useAuth() {
  const isAuthenticated = ref(false)

  const login = (email: string, password: string): boolean => {
    if (email === 'admin' && password === 'password') {
      const authToken = useCookie('auth_token')
      authToken.value = 'mock-jwt-token'
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    const authToken = useCookie('auth_token')
    authToken.value = null
    isAuthenticated.value = false
  }

  const checkAuth = () => {
    const authToken = useCookie('auth_token')
    isAuthenticated.value = !!authToken.value
  }

  if (process.client) {
    checkAuth()
  }

  return { isAuthenticated, login, logout }
}
