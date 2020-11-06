import { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Login from "./components/Login"
import { useStateValue } from "./components/StateProvider"

function App() {
  const [{ user }, dispatch] = useStateValue()
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
