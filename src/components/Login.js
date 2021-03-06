import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core"
import React, { Component, useState } from "react"
import db, { auth, provider } from "./firebase"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    padding: 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(2),
  },
  container: {
    backgroundColor: theme.palette.background.default,
    padding: 30,
    height: "100%",
    minHeight: "100vh",
  },
  front: {
    backgroundImage: "url('/assets/poke.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "50vh",
    marginTop: 30,
  },
}))
function Login() {
  const { login, currentUser, setTrainer, setPokemonData } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [starterRefer, setStarterRefer] = useState(false)
  const [homeRefer, setHomeRefer] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  async function loginHandler() {
    try {
      setError("")
      setLoading(true)
      login(provider).then((result) => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((pokemon) => {
            if (pokemon.exists) {
              console.log(pokemon.data())

              setHomeRefer(true)
            } else {
              console.log("no pokemon found")
              setStarterRefer(true)
            }
          })
      })
    } catch {
      setError("Failed to sign in")
    }
    setLoading(false)
    // history.push("/starter")
  }

  if (starterRefer) {
    history.push("/starter")
    setStarterRefer(false)
  }
  if (homeRefer) {
    history.push("/")
    setHomeRefer(false)
  }
  // const signIn = () => {
  //   auth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       db.collection("users")
  //         .doc(auth.currentUser.uid)
  //         .get()
  //         .then((result) => {
  //           dispatch({
  //             type: actionTypes.SET_USER,
  //             user: auth.currentUser,
  //             isNew: !result.exists ? true : false,
  //           })
  //           console.log(result)
  //           return <Redirect to="/home" />
  //         })
  //     })
  //     .catch((e) => console.log(e.message))
  // }
  return (
    <div className={classes.container}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h2>Poke Reigns</h2>
            <p>Pokemon Online RPG Game</p>
            <Container className={classes.front}></Container>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Grid container className={classes.pokemon_container}>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/pikachu.gif" alt="pikachu" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/charmander.gif" alt="charmander" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/turtwig.gif" alt="turtwig" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/eevee.gif" alt="eevee" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/riolu.gif" alt="riolu" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/jigglypuff.gif" alt="jigglypuff" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/glaceon.gif" alt="glaceon" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/greninja.gif" alt="greninja" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/blastoise.gif" alt="blastoise" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/gengar.gif" alt="gengar" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/registeel.gif" alt="registeel" />
                </div>
              </Grid>
              <Grid item className={classes.pokemon_panel} sm={4}>
                <div className="pokemon__panel_sprite">
                  <img src="/assets/sprites/grotle.gif" alt="grotle" />
                </div>
              </Grid>
            </Grid>
            <h2>Join US!</h2>
            <Button color="primary" variant="contained" onClick={loginHandler}>
              Login with Google
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
