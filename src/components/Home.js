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
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    padding: 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.42), 0 1px 2px rgba(0, 0, 0, 0.44)",
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(2),
  },
  container: {
    backgroundColor: theme.palette.background.default,
    height: "auto",
    padding: 20,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Montserrat",
    color: theme.palette.text.primary,
    padding: 10,
  },
  navbar: {
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.42), 0 1px 2px rgba(0, 0, 0, 0.44)",
    backgroundColor: theme.palette.background.paper,
    width: "90%",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  pokemon_container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  pokemon_panel: {
    display: "flex",
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",

    cursor: "pointer",
    flex: "0 0 200",
    margin: 10,
    width: "50%",
  },
}))
// const useStyles = makeStyles((theme) => ({
//   title: {
//     fontSize: 40,
//     textAlign: "center",
//     fontFamily: "Montserrat",
//   },
//   paper: {
//     textAlign: "center",
//     padding: 40,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.42), 0 1px 2px rgba(0, 0, 0, 0.44)",
//     color: theme.palette.text.primary,
//   },
//   control: {
//     padding: theme.spacing(2),
//   },
//   container2: {
//     backgroundColor: "#000",
//     padding: 20,
//   },
//   paper2: {
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     padding: 20,
//   },
//   roster_container: {
//     color: theme.palette.text.primary,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.42), 0 1px 2px rgba(0, 0, 0, 0.44)",
//     borderRadius: 5,
//   },
//   pokemon_container: {
//     display: "flex",
//     flexWrap: "wrap",
//     padding: 10,
//     justifyContent: "space-evenly",
//   },
//   info_container: {
//     color: theme.palette.text.primary,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
//     borderRadius: 5,
//     padding: 30,
//     textAlign: "center",
//   },
//
//   pokemon_panel: {
//     display: "flex",
//     padding: 20,
//     borderRadius: 5,
//     flexDirection: "row",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.32), 0 1px 2px rgba(0, 0, 0, 0.34)",
//     cursor: "pointer",
//     flex: "0 0 200",
//     margin: 10,
//     width: "50%",
//   },
//   fire__type: {
//     boxShadow:
//       "0 1px 3px rgba(255, 78, 24, 0.808),0 1px 2px rgba(255, 78, 24, 0.829)",
//   },
// }))
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
      <h1 className={classes.title}>Poke Reigns</h1>
      <div>
        <Grid container justify="space-evenly" alignItems="center">
          <Paper className={classes.navbar}>
            <Button color="primary">Home</Button>
            <Button color="primary">Your Pokemons</Button>
            <Button color="primary" onClick={() => history.push("/maps")}>
              Maps
            </Button>
            <Button color="primary">Battle</Button>
            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Paper>
        </Grid>
      </div>
      <div className={classes.content}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h2>Your Roster</h2>
              <Grid container className={classes.pokemon_container}>
                {roster.map((p, index) =>
                  p.name ? (
                    <Grid
                      item
                      key={p.pos}
                      className={
                        classes.pokemon_panel + " " + p.type1 + "__type"
                      }
                      sm={5}
                    >
                      <div className="pokemon__panel-sprite ">
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
                    </Grid>
                  ) : (
                    <Grid
                      item
                      key={p.pos}
                      className={classes.pokemon_panel + " none__type"}
                      sm={5}
                    >
                      <div className="pokemon__panel-sprite">None</div>
                      <div className="pokemon__panel-info">
                        <h4>{p.name}</h4>
                        <p className="level">Level: {p.level}</p>
                        <TypeButton type1={p.type1} type2={p.type2} />
                      </div>
                    </Grid>
                  )
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <p className="parameter">
                Trainer name:
                <span className="value">
                  {trainerName ? trainerName : "LOADING"}
                </span>
              </p>
              <p className="parameter">
                Trainer ID:
                <span className="value">85985675</span>
              </p>
              <p className="parameter">
                No of Pokemons:
                <span className="value">
                  {roster ? roster.length : "LOADING"}
                </span>
              </p>
              <p className="parameter">
                Badges:
                <span className="value">0</span>
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
