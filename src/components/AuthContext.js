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
  const [pokemons, setPokemons] = useState([])
  const [roster, setRoster] = useState([])
  const [trainerName, setTrainerName] = useState("")
  const [darkMode, setDarkMode] = useState(true)

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

  function setRosterData(pokes) {
    pokes.sort((a, b) => {
      return a.pos - b.pos
    })
    setRoster(pokes)
    console.log("writing" + roster)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((result) => {
            // setTrainer(result.data().displayName)
          })
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    setTrainer,
    pokemons,
    setPokemonData,
    trainerName,
    roster,
    setRosterData,
    setLoading,
    loading,
    darkMode,
    setDarkMode,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
