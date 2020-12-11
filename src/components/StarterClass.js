import React, { Component } from "react"
import Starter from "./Starter"

class StarterClass extends Component {
  componentDidMount() {
    console.log("Mounted")
  }

  render() {
    return (
      <div>
        <Starter />
      </div>
    )
  }
}

export default StarterClass
