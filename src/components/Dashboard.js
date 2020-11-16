import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

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
      Dashboard
      <div>Email: {currentUser.email}</div>
      <div>User: {currentUser.displayName}</div>
      <div>uid: {currentUser.uid}</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}