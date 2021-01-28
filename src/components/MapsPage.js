import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import TypeButton from "./TypeButton"
import PCard from "../themes/PokemonCards"
import "./Home.css"
import "./type.css"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    padding: 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)",
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
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)",
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
    fontSize: 10,
    display: "flex",
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    cursor: "pointer",
    flex: "0 0 200",
    margin: 10,
    width: "50%",
  },
  cover: {
    width: 151,
  },
  map__card: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.24)",
  },
  map__image: {
    width: "100%",
    height: 100,
  },
  map_cards_container: {
    padding: 30,
  },
}))
export default function MapsPage() {
  const classes = useStyles()
  const history = useHistory()
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
  const [error, setError] = useState("")
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
            <Button color="primary" onClick={() => history.push("/")}>
              Home
            </Button>
            <Button color="primary" onClick={() => history.push("/pokemon")}>
              Your Pokemons
            </Button>
            <Button color="primary" onClick={() => history.push("/maps")}>
              Maps
            </Button>
            <Button color="primary" onClick={() => history.push("/battle")}>
              Battle
            </Button>
            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Paper>
        </Grid>
      </div>
      <div className={classes.content}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paper}>
              <p>Your Roster</p>
              <Grid container className={classes.pokemon_container}>
                {roster.map((p, index) =>
                  p.data.name ? (
                    <Grid
                      item
                      key={p.data.pos}
                      className={
                        classes.pokemon_panel + " " + p.data.type1 + "__type"
                      }
                      sm={5}
                    >
                      <div className="pokemon__panel-sprite ">
                        <img
                          src={"/assets/sprites/" + p.data.name + ".gif"}
                          alt={p.data.name}
                        />
                      </div>
                      <div className="pokemon__panel-info">
                        <h4>{p.data.name}</h4>
                        <p className="level">Level: {p.data.level}</p>
                        <TypeButton type1={p.data.type1} type2={p.data.type2} />
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
          <Grid item xs={12} sm={7}>
            <Paper className={classes.paper}>
              <h2>Choose a map</h2>
              <Grid
                container
                spacing={4}
                className={classes.map_cards_container}
              >
                {[
                  ["grasslands", "Grasslands"],
                  ["forestlands", "Turahalli Forest"],
                  ["rocklands", "BarrenLands"],
                  ["islands", "Islands"],
                  ["caves", "Rocky Caves"],
                  ["ruins", "Ruins"],
                  ["powerplant", "Powerplant"],

                  ["magmalands", "Mount Yelmer"],

                  ["marshlands", "Swamps"],
                  ["icelands", "Antarctica"],
                ].map((map) => (
                  <Grid item xs={12} sm={6} key={map[0]}>
                    <Link to={`/maps/${map[0]}/${map[1]}`}>
                      <Card className={classes.map__card} variant="outlined">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            className={classes.map__image}
                            image={"/assets/maps/" + map[0] + ".png"}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {map[1]}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
