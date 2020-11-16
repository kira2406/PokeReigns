import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { auth } from "./firebase"

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  function handleLogout() {
    setError("")
    try {
      auth.signOut()
      history.push("/login")
    } catch {
      setError("Failed to logout")
    }
  }

  return (
    <div>
      Dashboard
      <div>Email: {currentUser.email}</div>
      <div>User: {currentUser.displayName}</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
