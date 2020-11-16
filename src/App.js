import React from "react"
import Login from "./components/Login"
import "./App.css"
import { AuthProvider } from "./components/AuthContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"

import StarterClass from "./components/StarterClass"
import Starter from "./components/Starter"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <div className="App">
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/starter" component={Starter} />
            <Route path="/login" component={Login} />
          </div>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
