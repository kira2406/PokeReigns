import React, { Component } from "react"
import Starter from "./Starter"
import db from "./firebase"
import { Button } from "@material-ui/core"
import { Redirect } from "react-router-dom"

class StarterClass extends Component {
  render() {
    return (
      <div>
        <Starter />
      </div>
    )
  }
}

export default StarterClass
