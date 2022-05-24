import {createContext, useState, useCallback, useEffect} from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((userId, token) => {
    setToken(token)
    setUserId(userId)

    localStorage.setItem(
      'auth',
      JSON.stringify({
        token,
        userId,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem('auth')
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('auth'))

    if (data?.userId) {
      const {token, userId} = data

      setToken(token)
      setUserId(userId)
    }
  }, [token, userId])

  return (
    <AuthContext.Provider value={{token, userId, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
