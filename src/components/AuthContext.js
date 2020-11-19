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
    console.log("writing" + pokemons)
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
    trainerName,
    pokemons,
    setPokemonData,
    setLoading,
    loading,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
