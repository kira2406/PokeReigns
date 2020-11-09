import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./Starter.css";
import "./type.css";
function Starter() {
  return (
    <div className="container" id="starter">
      <div className="starter__container">
        <h2>Welcome to PokeReigns!!</h2>
        <div className="starter__subcontainer">
          <div className="starter__subcontainer--pokemon">
            <h2>Choose your starter pokemon </h2>
            <div className="pokemon__container-column">
              <div className="pokemon__container-row">
                <div className="pokemon__container-card grass__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/bulbasaur.gif" alt="Bulbasaur" />
                  </div>
                  <h4>Bulbasaur</h4>
                  <span class="type grass">grass</span>
                </div>
                <div className="pokemon__container-card fire__type">
                  <div className="pokemon__sprite">
                    <img
                      src="/assets/sprites/charmander.gif"
                      alt="Charmander"
                    />
                  </div>
                  <h4>Charmander</h4>
                  <span class="type fire">fire</span>
                </div>
                <div className="pokemon__container-card water__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/squirtle.gif" alt="squirtle" />
                  </div>
                  <h4>Squirtle</h4>
                  <span class="type water">water</span>
                </div>
              </div>
              <div className="pokemon__container-row">
                <div className="pokemon__container-card grass__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/turtwig.gif" alt="Turtwig" />
                  </div>
                  <h4>Turtwig</h4>
                  <span class="type grass">grass</span>
                </div>
                <div className="pokemon__container-card fire__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/chimchar.gif" alt="Chimchar" />
                  </div>
                  <h4>Chimchar</h4>
                  <span class="type fire">fire</span>
                </div>
                <div className="pokemon__container-card water__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/piplup.gif" alt="Piplup" />
                  </div>
                  <h4>Piplup</h4>
                  <span class="type water">water</span>
                </div>
              </div>
              <div className="pokemon__container-row">
                <div className="pokemon__container-card grass__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/chespin.gif" alt="Chespin" />
                  </div>
                  <h4>Chespin</h4>
                  <span class="type grass">grass</span>
                </div>
                <div className="pokemon__container-card fire__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/fennekin.gif" alt="Fennekin" />
                  </div>
                  <h4>Fennekin</h4>
                  <span class="type fire">fire</span>
                </div>
                <div className="pokemon__container-card water__type">
                  <div className="pokemon__sprite">
                    <img src="/assets/sprites/froakie.gif" alt="Froakie" />
                  </div>
                  <h4>Froakie</h4>
                  <span class="type water">water</span>
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
              />
              <Button className="start__button" type="submit">
                Let's Start!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starter;
