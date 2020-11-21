import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function YourPokemon() {
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
        <Button className="nav__button" onClick={() => history.push("/")}>
          Home
        </Button>
        <Button
          className="nav__button active"
          onClick={() => history.push("/ypokemon")}
        >
          Your Pokemon
        </Button>
        <Button className="nav__button" onClick={() => history.push("/maps")}>
          Maps
        </Button>
        <Button className="nav__button">Battle</Button>
        <Button className="nav__button">Profile</Button>
        <Button className="nav__button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
