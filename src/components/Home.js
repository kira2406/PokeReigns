import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function Home() {
  const { logout, trainerName } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div>
      <div>Home</div>
      <div>Trainer name: {trainerName}</div>
      <Button onClick={handleLogout}>Logout</Button>
      <div>{error}</div>
    </div>
  )
}
