import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import db from "./firebase"
import "./Home.css"
import "./type.css"
import TypeButton from "./TypeButton"

export default function Home() {
  const {
    logout,
    trainerName,
    setTrainer,
    currentUser,
    pokemons,
    loading,
    roster,
  } = useAuth()
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

  // useEffect(() => {
  //   if (currentUser)
  //     db.collection("users")
  //       .doc(currentUser.uid)
  //       .collection("roster")
  //       .get()
  //       .then((snapshot) => {
  //         snapshot.forEach((doc) => {
  //           console.log(doc.data())
  //         })
  //       })
  //       .catch((e) => console.log(e))
  // }, [currentUser])

  return loading ? (
    <div>LOADING......</div>
  ) : (
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
        <div className="roster__container">
          <h2>Your Roster</h2>
          <div className="pokemon__container">
            {roster.map((p, index) => (
              <div
                key={index}
                className={"pokemon__panel-card " + p.type1 + "__type"}
              >
                <div className="pokemon__panel-sprite">
                  <img
                    src={"/assets/sprites/" + p.name + ".gif"}
                    alt={p.name}
                  />
                </div>
                <div className="pokemon__panel-info">
                  <h4>{p.name}</h4>
                  <p className="level">Level: {p.level}</p>
                  <TypeButton type1={p.type1} type2={p.type2} />
                </div>
              </div>
            ))}
            {/* { while (true) {
              <div className="pokemon__panel-card fire__type">
              <div className="pokemon__panel-sprite">
                <img src="/assets/sprites/abra.gif" alt="No pokemon" />
              </div>
              <div className="pokemon__panel-info">
                <h4>No pokemon</h4>
                <span className="type fire">fire</span>
              </div>
            </div>  
            }
            
            } */}
          </div>
        </div>
        <div className="info__container">
          <div className="data__container">
            <p className="parameter">Trainer name:</p>
            <p className="value">{trainerName ? trainerName : "LOADING"}</p>
          </div>
          <div className="data__container">
            <p className="parameter">Trainer ID:</p>
            <p className="value"> #########</p>
          </div>
          <div className="data__container">
            <p className="parameter">No of Pokemons:</p>
            <p className="value">{roster.length + pokemons.length}</p>
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
