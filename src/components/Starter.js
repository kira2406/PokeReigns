import { Button, TextField } from "@material-ui/core"
import React from "react"
import "./Starter.css"
function Starter() {
  return (
    <div className="container" id="starter">
      <div className="starter__container">
        <h2>Welcome to PokeReigns!!</h2>
        <div className="starter__subcontainer">
          <div className="starter__subcontainer--user">
            USER
            <div className="form__container">
              <TextField
                type="text"
                label="Trainer name"
                name="name"
                placeholder="Enter Trainer Name"
                variant="outlined"
              />
            </div>
          </div>
          <div className="starter__subcontainer--pokemon">
            <h2>Choose your starter pokemon </h2>
            <div className="pokemon__container-column">
              <div className="pokemon__container-row">
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/bulbasaur.gif" alt="Bulbasaur" />
                  <h4>Bulbasaur</h4>
                </div>
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/charmander.gif" alt="Charmander" />
                  <h4>Charmander</h4>
                </div>
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/squirtle.gif" alt="squirtle" />
                  <h4>Squirtle</h4>
                </div>
              </div>
              <div className="pokemon__container-row">
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/turtwig.gif" alt="Turtwig" />
                  <h4>Turtwig</h4>
                </div>
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/chimchar.gif" alt="Chimchar" />
                  <h4>Chimchar</h4>
                </div>
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/piplup.gif" alt="Piplup" />
                  <h4>Piplup</h4>
                </div>
              </div>
              <div className="pokemon__container-row">
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/chespin.gif" alt="Chespin" />
                  <h4>Chespin</h4>
                </div>
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/fennekin.gif" alt="Fennekin" />
                  <h4>Fennekin</h4>
                </div>
                <div className="pokemon__container-card">
                  <img src="/assets/sprites/froakie.gif" alt="Froakie" />
                  <h4>Froakie</h4>
                </div>
              </div>
              <Button className="start__button">Let's Start!</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Starter
