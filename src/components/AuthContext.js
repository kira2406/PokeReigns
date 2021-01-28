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
  const [moves, setMoves] = useState([])
  const [roster, setRoster] = useState([])
  const [trainerName, setTrainerName] = useState("")
  const [numBadges, setNumBadges] = useState(0)
  const [darkMode, setDarkMode] = useState(true)
  const [trainerID, setTrainerid] = useState(0)

  function login(provider) {
    return auth.signInWithPopup(provider)
  }

  function logout() {
    return auth.signOut()
  }

  function setNumOfBadges(num) {
    setNumBadges(num)
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
  function setTrainerID(params) {
    setTrainerid(params)
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
    moves,
    setNumOfBadges,
    numBadges,
    setTrainerID,
    trainerID,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
