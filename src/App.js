import React, { useEffect } from "react"
import Login from "./components/Login"
import "./App.css"
import { AuthProvider, useAuth } from "./components/AuthContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/Home"
// import StarterClass from "./components/StarterClass"
import Starter from "./components/Starter"
import db, { auth } from "./components/firebase"

function App() {
  const {
    setLoading,
    setCurrentUser,
    setTrainer,
    loading,
    setPokemonData,
  } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        var pokemons = []
        setCurrentUser(user)
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((result) => {
            if (result.exists) setTrainer(result.data()["displayName"])
          })
        var count = 0
        db.collection("users")
          .doc(user.uid)
          .collection("roster")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              pokemons.push({ id: doc.id, pokemonName: doc.data().pokemonName })
              count++
            })
            // while (count < 6) {
            //   pokemons.push({ id: "empty", pokemonName: "none" })
            //   count++
            // }
            setPokemonData(pokemons)
          })

        console.log(pokemons)
      }
    })
    setLoading(false)
    return unsubscribe
  }, [])
  return loading ? (
    <div className="App">LOADING...</div>
  ) : (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/starter" component={Starter} />
          <PrivateRoute exact path="/dash" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
