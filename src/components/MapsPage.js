import { AppBar, Button, Toolbar } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function MapsPage() {
  const history = useHistory()
  const [error, setError] = useState("")
  const { logout, trainerName } = useAuth()
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
    <div className="home">
      <div className="logo__container">
        <h2>Poke Reigns</h2>
      </div>
      <div className="nav__container">
        <AppBar position="static">
          <Toolbar>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push("/")}
            >
              Home
            </Button>
            <Button color="primary" variant="contained">
              Your Pokemons
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push("/maps")}
            >
              Maps
            </Button>
            <Button color="primary" variant="contained">
              Battle
            </Button>
            <Button color="primary" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}
