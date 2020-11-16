import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import db from "./firebase"

export default function Dashboard() {
  const { currentUser, logout, trainerName, setTrainer } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()
  // const [pokemon, setPokemon] = useState()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  // useEffect(() => {
  //   const unsubscribe = db.collection("users").doc(currentUser.uid).get()
  //   if (currentUser) {
  //     unsubscribe.then((result) => {
  //       // console.log(result.data())
  //       setTrainer(result.data().displayName)
  //     })
  //   }
  //   return unsubscribe
  // }, [currentUser])

  return (
    <div>
      Dashboard
      <div>Email: {currentUser.email}</div>
      <div>User: {currentUser.displayName}</div>
      <div>uid: {currentUser.uid}</div>
      <div>Trainer name: {trainerName}</div>
      <Button onClick={handleLogout}>Logout</Button>
      <div>{error}</div>
    </div>
  )
}
