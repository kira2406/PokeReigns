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
  map_container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
  },
  pokemon_container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  pokemon__panel_sprite: {
    height: 50,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  pokemon_panel: {
    fontSize: 10,
    display: "flex",
    padding: 20,
    borderRadius: 5,
    cursor: "pointer",
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
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
    height: 50,
  },
  map_cards_container: {
    padding: 30,
  },
  map__display: {
    borderRadius: 5,
    cursor: "pointer",
  },
}))
export default function RegionMap({ match }) {
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
          <Grid item xs={12} sm={2}>
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
                  <Grid item xs={12} sm={12} key={map[0]}>
                    <Link
                      to={`/maps/${map[0]}/${map[1]}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <Card className={classes.map__card} variant="outlined">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            className={classes.map__image}
                            image={"/assets/maps/" + map[0] + ".png"}
                          />
                          <CardContent>{map[1]}</CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <h2>{match.params.name}</h2>
              <Grid container className={classes.map_container}>
                <img
                  src={"/assets/maps/" + match.params.map + ".png"}
                  onClick={() => console.log(Math.random())}
                  className={classes.map__display}
                />
                Click anywhere on the map to search for a pokemon!
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Paper className={classes.paper}>
              <p>Your Roster</p>
              <Grid container className={classes.pokemon_container}>
                {roster.map((p, index) =>
                  p.name ? (
                    <Grid
                      item
                      key={p.pos}
                      className={
                        classes.pokemon_panel + " " + p.type1 + "__type"
                      }
                      sm={6}
                    >
                      <div className="pokemon__panel_sprite">
                        <img
                          src={"/assets/sprites/" + p.name + ".gif"}
                          alt={p.name}
                        />
                        Ready!
                      </div>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      key={p.pos}
                      className={classes.pokemon_panel + " none__type"}
                      sm={6}
                    >
                      <div className="pokemon__panel-sprite">None</div>
                    </Grid>
                  )
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
