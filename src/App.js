import React, { useEffect, useState } from "react"
import Login from "./components/Login"

import { AuthProvider, useAuth } from "./components/AuthContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/Home"
// import StarterClass from "./components/StarterClass"
import Starter from "./components/Starter"
import db, { auth } from "./components/firebase"
import MapsPage from "./components/MapsPage"
import YourPokemon from "./components/YourPokemon"
import "./App.css"
import {
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles"
import {
  AppBar,
  Button,
  CircularProgress,
  Toolbar,
  Switch as SwitchButton,
  Grid,
  Paper,
} from "@material-ui/core"
import { colors } from "@material-ui/core"
import { lightTheme, darkTheme } from "./themes/themes.js"
import GlobalStyles from "./themes/GlobalStyles"
import Demo from "./components/demo"
import RegionMap from "./components/RegionMap"
import Battle from "./components/Battle"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const {
    setLoading,
    setCurrentUser,
    setTrainer,
    setRosterData,
    moves,
    setTrainerID,
    setNumOfBadges,
  } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        var roster = []
        setCurrentUser(user)
        db.collection("users")
          .doc(user.uid)
          .onSnapshot((result) => {
            if (result.exists) {
              setTrainerID(result.data()["trainerID"])
              console.log(result.data()["trainerID"])
              setTrainer(result.data()["displayName"])
              setNumOfBadges(result.data()["numBadges"])
            }
          })
        var count = 1
        db.collection("users")
          .doc(user.uid)
          .collection("roster")
          .orderBy("pos", "asc")
          .onSnapshot((snapshot) => {
            roster = []
            snapshot.forEach((doc) => {
              roster.push({ id: doc.id, data: doc.data() })
              count++
            })
            console.log("count" + count)
            while (count <= 6) {
              roster.push({
                id: "empty",
                data: { pokemonName: "none", pos: count },
              })
              count++
            }
            setRosterData(roster)
            console.log(roster)
            setLoading(false)
          })
      }
    })

    return unsubscribe
  }, [])
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/starter" component={Starter} />
          <PrivateRoute exact path="/dash" component={Dashboard} />
          <PrivateRoute exact path="/maps" component={MapsPage} />
          <PrivateRoute exact path="/maps/:map/:name" component={RegionMap} />
          <PrivateRoute exact path="/pokemon" component={YourPokemon} />
          <PrivateRoute exact path="/demo" component={Demo} />
          <PrivateRoute exact path="/battle" component={Battle} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
