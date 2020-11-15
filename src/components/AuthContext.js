import React, { useContext, useEffect, useState } from "react"
import { auth } from "./firebase"
import firebase from "firebase"

const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
