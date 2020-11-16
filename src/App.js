import React from "react"
import Login from "./components/Login"
import "./App.css"
import { AuthProvider } from "./components/AuthContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/Home"
// import StarterClass from "./components/StarterClass"
import Starter from "./components/Starter"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/starter" component={Starter} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
