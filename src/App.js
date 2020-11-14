import { useState } from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Login from "./components/Login"
import Starter from "./components/Starter"
import StarterClass from "./components/StarterClass"
import { useStateValue } from "./components/StateProvider"

function App() {
  const [{ user, isNew }, dispatch] = useStateValue()
  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={() => {
            if (!user) {
              return <Redirect to="/login" />
            } else {
              return <Redirect to="/home" />
            }
          }}
        />
        <Route
          path="/login"
          exact
          render={() => {
            if (!user) {
              return <Login />
            } else {
              return <Redirect to="/starter" />
            }
          }}
        />
        <Route
          path="/home"
          exact
          render={() => {
            if (user) {
              return <Home />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/starter"
          exact
          render={() => {
            if (isNew) {
              return <StarterClass />
            } else {
              return <Redirect to="/home" />
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App
