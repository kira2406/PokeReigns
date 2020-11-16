import React, { useContext, useEffect, useState } from "react"
import db, { auth } from "./firebase"
import firebase from "firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState()
  const [trainerName, setTrainerName] = useState("")

  function login(provider) {
    return auth.signInWithPopup(provider)
  }

  function logout() {
    return auth.signOut()
  }

  function setTrainer(trainerName) {
    setTrainerName(trainerName)
  }

  function setPokemonData(pokes) {
    setPokemons(pokes)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    setTrainer,
    trainerName,
    pokemons,
    setPokemonData,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
