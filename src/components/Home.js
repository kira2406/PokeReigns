import {
  AppBar,
  Button,
  Card,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import db from "./firebase"
import "./Home.css"
import "./type.css"
import TypeButton from "./TypeButton"
import MenuIcon from "@material-ui/icons/Menu"
const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    padding: 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.42), 0 1px 2px rgba(0, 0, 0, 0.44)",
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(2),
  },
  container: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    flexDirection: "column",
    color: theme.palette.text.primary,
  },
  navbar: {
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    backgroundColor: theme.palette.background.paper,
    width: "90%",
  },
}))
export default function Home() {
  const classes = useStyles()
  const {
    logout,
    trainerName,
    setTrainer,
    currentUser,
    pokemons,
    loading,
    roster,
    darkMode,
    setDarkMode,
  } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")
  // const classes = useStyles()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <div className={classes.container}>
      <h1>Poke Reigns</h1>
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        className={classes.navbar}
      >
        <Button color="primary">Home</Button>
        <Button color="primary">Your Pokemons</Button>
        <Button color="primary" onClick={() => history.push("/maps")}>
          Maps
        </Button>
        <Button color="primary">Battle</Button>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      <Grid container width="80%">
        <Grid item xs={12} sm={5}>
          <div className="pokemon__container">
            {roster.map((p, index) => (
              <div
                key={index}
                className={"pokemon__panel-card " + p.type1 + "__type"}
              >
                <div className="pokemon__panel-sprite">
                  <img
                    src={"/assets/sprites/" + p.name + ".gif"}
                    alt={p.name}
                  />
                </div>
                <div className="pokemon__panel-info">
                  <h4>{p.name}</h4>
                  <p className="level">Level: {p.level}</p>
                  <TypeButton type1={p.type1} type2={p.type2} />
                </div>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p className="parameter">Trainer name:</p>
          <p className="value">{trainerName ? trainerName : "LOADING"}</p>
        </Grid>
      </Grid>

      {/* 
      <div className="user__container">
        <div className="roster__container">
          <h2>Your Roster</h2>
          <div className="pokemon__container">
            {roster.map((p, index) => (
              <div
                key={index}
                className={"pokemon__panel-card " + p.type1 + "__type"}
              >
                <div className="pokemon__panel-sprite">
                  <img
                    src={"/assets/sprites/" + p.name + ".gif"}
                    alt={p.name}
                  />
                </div>
                <div className="pokemon__panel-info">
                  <h4>{p.name}</h4>
                  <p className="level">Level: {p.level}</p>
                  <TypeButton type1={p.type1} type2={p.type2} />
                </div>
              </div>
            ))} */
      /* { while (true) {
              <div className="pokemon__panel-card fire__type">
              <div className="pokemon__panel-sprite">
                <img src="/assets/sprites/abra.gif" alt="No pokemon" />
              </div>
              <div className="pokemon__panel-info">
                <h4>No pokemon</h4>
                <span className="type fire">fire</span>
              </div>
            </div>  
            }
            

        </div>
        <div className="info__container">
          <div className="data__container">
            <p className="parameter">Trainer name:</p>
            <p className="value">{trainerName ? trainerName : "LOADING"}</p>
          </div>
          <div className="data__container">
            <p className="parameter">Trainer ID:</p>
            <p className="value"> #########</p>
          </div>
          <div className="data__container">
            <p className="parameter">No of Pokemons:</p>
            <p className="value">{roster.length + pokemons.length}</p>
          </div>
          <div className="data__container">
            <p className="parameter">Badges Won:</p>
            <p className="value">0</p>
          </div>
        </div>
      </div> */}
    </div>
  )
}
