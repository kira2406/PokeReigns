import { Button, Input, InputLabel, TextField } from "@material-ui/core"
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
          <div className="starter__subcontainer--pokemon">POKEMON</div>
        </div>
      </div>
    </div>
  )
}

export default Starter
