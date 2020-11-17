import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import db from "./firebase"
import "./Home.css"

export default function Home() {
  const { logout, trainerName, setTrainer, currentUser } = useAuth()
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
    <div className="home">
      <div className="logo__container">
        <h2>Poke Reigns</h2>
      </div>
      <div className="nav__container">
        <Button className="nav__button">Home</Button>|
        <Button>Your Pokemon</Button>|<Button>Maps</Button>|
        <Button>Battle</Button>|<Button>Profile</Button>|
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <div className="user__container">
        <div className="roster__container">roster</div>
        <div className="info__container">
          <div className="data__container">
            <p className="parameter">Trainer name:</p>
            <p className="value">{trainerName}</p>
          </div>
          <div className="data__container">
            <p className="parameter">Trainer ID:</p>
            <p className="value"> #########</p>
          </div>
          <div className="data__container">
            <p className="parameter">No of Pokemons:</p>
            <p className="value">1</p>
          </div>
          <div className="data__container">
            <p className="parameter">Badges Won:</p>
            <p className="value">0</p>
          </div>
        </div>
      </div>

      <div>{error}</div>
    </div>
  )
}
