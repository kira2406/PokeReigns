import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import "./Starter.css"
import "./type.css"
import db from "./firebase"
import { Redirect } from "react-router-dom"
function Starter() {
  const [starter, setStarter] = useState(null)
  const [pokemon, setPokemon] = useState(null)
  const [name, setName] = useState("")
  const [toHome, setToHome] = useState(false)
  useEffect(() => {
    if (starter)
      db.collection("pokemondb")
        .doc(starter)
        .get()
        .then((pokemon) => {
          setPokemon(pokemon.data())
          console.log(pokemon.data().name + " name:" + name)
        })
        .catch((error) => console.log(error))
  }, [starter])
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("On submitting" + pokemon.name + " " + name)
    setToHome(true)
  }
  if (toHome) {
    return <Redirect to="/home" />
  }

  return (
    <div className="container" id="starter">
      <div className="starter__container">
        <h2>Welcome to PokeReigns!!</h2>
        <div className="starter__subcontainer">
          <div className="starter__subcontainer--pokemon">
            <h2>Choose your starter pokemon</h2>
            <div className="pokemon__container-column">
              <div className="pokemon__container-row">
                <div
                  className={
                    starter === "1"
                      ? "pokemon__container-card pokemon__container-selected grass__type"
                      : "pokemon__container-card grass__type"
                  }
                  onClick={() => setStarter("1")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/bulbasaur.gif" alt="Bulbasaur" />
                  </div>
                  <h4>Bulbasaur</h4>
                  <span className="type grass">grass</span>
                </div>
                <div
                  className={
                    starter === "4"
                      ? "pokemon__container-card pokemon__container-selected fire__type"
                      : "pokemon__container-card fire__type"
                  }
                  onClick={() => setStarter("4")}
                >
                  <div className="pokemon__sprite">
                    <img
                      src="/assets/sprites/charmander.gif"
                      alt="Charmander"
                    />
                  </div>
                  <h4>Charmander</h4>
                  <span className="type fire">fire</span>
                </div>
                <div
                  className={
                    starter === "7"
                      ? "pokemon__container-card pokemon__container-selected water__type"
                      : "pokemon__container-card water__type"
                  }
                  onClick={() => setStarter("7")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/squirtle.gif" alt="squirtle" />
                  </div>
                  <h4>Squirtle</h4>
                  <span className="type water">water</span>
                </div>
              </div>
              <div className="pokemon__container-row">
                <div
                  className={
                    starter === "387"
                      ? "pokemon__container-card pokemon__container-selected grass__type"
                      : "pokemon__container-card grass__type"
                  }
                  onClick={() => setStarter("387")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/turtwig.gif" alt="Turtwig" />
                  </div>
                  <h4>Turtwig</h4>
                  <span className="type grass">grass</span>
                </div>
                <div
                  className={
                    starter === "390"
                      ? "pokemon__container-card pokemon__container-selected fire__type"
                      : "pokemon__container-card fire__type"
                  }
                  onClick={() => setStarter("390")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/chimchar.gif" alt="Chimchar" />
                  </div>
                  <h4>Chimchar</h4>
                  <span className="type fire">fire</span>
                </div>
                <div
                  className={
                    starter === "393"
                      ? "pokemon__container-card pokemon__container-selected water__type"
                      : "pokemon__container-card water__type"
                  }
                  onClick={() => setStarter("393")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/piplup.gif" alt="Piplup" />
                  </div>
                  <h4>Piplup</h4>
                  <span className="type water">water</span>
                </div>
              </div>
              <div className="pokemon__container-row">
                <div
                  className={
                    starter === "650"
                      ? "pokemon__container-card pokemon__container-selected grass__type"
                      : "pokemon__container-card grass__type"
                  }
                  onClick={() => setStarter("650")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/chespin.gif" alt="Chespin" />
                  </div>
                  <h4>Chespin</h4>
                  <span className="type grass">grass</span>
                </div>
                <div
                  className={
                    starter === "653"
                      ? "pokemon__container-card pokemon__container-selected fire__type"
                      : "pokemon__container-card fire__type"
                  }
                  onClick={() => setStarter("653")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/fennekin.gif" alt="Fennekin" />
                  </div>
                  <h4>Fennekin</h4>
                  <span className="type fire">fire</span>
                </div>
                <div
                  className={
                    starter === "656"
                      ? "pokemon__container-card pokemon__container-selected water__type"
                      : "pokemon__container-card water__type"
                  }
                  onClick={() => setStarter("656")}
                >
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/froakie.gif" alt="Froakie" />
                  </div>
                  <h4>Froakie</h4>
                  <span className="type water">water</span>
                </div>
              </div>
            </div>
          </div>
          <div className="starter__subcontainer--user">
            <p>
              Hello there! Welcome to the world of pokémon! This world is
              inhabited by creatures called pokémon!
            </p>
            <p>
              Are you ready to begin your journey to be the{" "}
              <span className="n1t">#1 Trainer?</span>
            </p>
            <div className="form__container">
              <TextField
                type="text"
                label="Enter Your name"
                name="name"
                placeholder="Your Name"
                variant="outlined"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                className="start__button"
                type="submit"
                onClick={handleSubmit}
              >
                Let's Start!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Starter
