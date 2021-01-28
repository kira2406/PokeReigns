import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import TypeButton from "./TypeButton"
import PCard from "../themes/PokemonCards"
import "./Home.css"
import "./type.css"
import db from "./firebase"
import { Alert } from "@material-ui/lab"
import CatchPokemon from "./CatchPokemon"
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
    flexDirection: "column",
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
    justify: "center",
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
    justify: "center",
    alignItems: "center",
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
  wild_container: {
    display: "flex",
    flexDirection: "column",
    justify: "center",
    alignItems: "center",
  },
  wild_encounter_success: {
    padding: 5,
    marginBottom: 10,

    width: "200",
  },
  wild_encounter_fail: {
    padding: 10,
    marginBottom: 10,
  },
  catch_link: {
    textDecoration: "none",
    fontSize: 15,
    color: "black",
  },
  appeared_message: {
    justify: "center",
    alignItems: "center",
    textAlign: "center",
  },
  capture_button: {
    backgroundColor: "#1b5e20",
    width: 100,
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
  const [appear, setAppear] = useState(false)
  const [attempt, setAttempt] = useState(false)
  const [appearedPokemon, setAppearedPokemon] = useState(null)
  const [presentPokemon, setPresentPokemon] = useState({})
  const [pokemonLoading, setPokemonLoading] = useState(false)
  const [openBattle, setOpenBattle] = useState(false)
  const [appearedLevel, setAppearedLevel] = useState(5)
  var choices = [
    "21",
    "16",
    "420",
    "495",
    "672",
    "187",
    "13",
    "316",
    "327",
    "406",
    "511",
    "69",
    "10",
    "204",
    "123",
    "168",
    "165",
    "167",
    "60",
    "418",
    "84",
    "551",
    "675",
    "198",
    "443",
    "149",
    "108",
    "115",
    "161",
    "335",
    "615",
    "124",
    "220",
    "131",
    "646",
    "698",
    "478",
    "393",
    "109",
    "133",
    "216",
    "241",
    "399",
    "424",
    "434",
    "23",
    "88",
    "453",
    "1",
    "48",
    "92",
    "427",
    "449",
    "58",
    "77",
    "324",
    "513",
    "244",
    "146",
    "250",
    "587",
    "506",
    "507",
    "163",
    "396",
    "519",
    "172",
    "179",
    "667",
    "436",
    "203",
    "261",
    "509",
    "307",
    "338",
    "337",
    "63",
    "96",
    "202",
    "325",
    "403",
    "355",
    "574",
    "605",
    "527",
    "374",
    "562",
    "263",
    "287",
    "19",
    "359",
    "228",
    "248",
    "274",
    "658",
    "125",
    "27",
    "105",
    "231",
    "328",
    "341",
    "100",
    "7",
    "54",
    "90",
  ]
  var mapDiverse = {
    grasslands: [
      ["19", "399", "16", "21", "16", "10", "406", "13", "327"],
      ["420"],
      ["495", "672", "187"],
    ],
    forestlands: [
      ["115", "13", "316", "216", "327", "406", "511", "69", "10", "204"],
      ["123", "168", "165", "167"],
      ["60", "418"],
    ],
    rocklands: [
      ["84", "163", "519"],
      ["551", "675", "198"],
      ["443", "149"],
    ],
    caves: [
      ["263", "27", "287", "19", "359"],
      ["228", "248", "274"],
      ["658", "125", "100"],
    ],
    islands: [
      ["27", "105"],
      ["231", "328", "341"],
      ["100", "7", "54", "90"],
    ],
    ruins: [
      ["203", "261", "509", "307", "338", "337", "27"],
      ["63", "96", "202", "325", "403", "355"],
      ["574", "605", "527", "374", "562"],
    ],
    powerplant: [
      ["506", "507", "163", "396", "519"],
      ["172", , "179", "667"],
      ["374", "436"],
    ],
    magmalands: [
      ["427", "506", "449"],
      ["58", "77", "324", "513"],
      ["244", "146", "250", "587"],
    ],
    marshlands: [
      ["109", "133", "216", "241", "399", "424"],
      ["434", "23", "88"],
      ["453", "1", "48", "92"],
    ],
    icelands: [
      ["108", "115", "133", "161", "335"],
      ["615", "124", "220", "131"],
      ["646", "698", "478", "393"],
    ],
  }
  useEffect(() => {
    var i = 0
    while (i < choices.length) {
      db.collection("pokemondb")
        .doc(choices[i])
        .get()
        .then((result) => {
          // appearedPokemon.add([choices[i], result.data()])
          // appearedPokemon[choices[i]] = result.data()

          presentPokemon[result.id] = { id: result.id, data: result.data() }
          presentPokemon[result.id].data["pid"] = result.id

          // console.log(appearedPokemon[result.id].name + "in loop")
        })
        .catch((e) => console.log("pokemon could not be fetched"))
      i++
    }
  }, [])
  async function catchPokemon(region) {
    console.log("IN region:" + mapDiverse[region])
    setAttempt(true)
    setPokemonLoading(true)
    if (Math.random() <= 0.8) {
      setAppear(true)
      var chance = Math.random()
      if (chance <= 0.5) {
        setAppearedPokemon(
          presentPokemon[
            mapDiverse[region][0][
              Math.floor(Math.random() * mapDiverse[region][0].length)
            ]
          ]
        )
      } else if (chance <= 0.9)
        setAppearedPokemon(
          presentPokemon[
            mapDiverse[region][1][
              Math.floor(Math.random() * mapDiverse[region][1].length)
            ]
          ]
        )
      else
        setAppearedPokemon(
          presentPokemon[
            mapDiverse[region][2][
              Math.floor(Math.random() * mapDiverse[region][2].length)
            ]
          ]
        )
      setAppearedLevel(Math.floor(Math.random() * 15) + 3)
      setPokemonLoading(false)
    } else {
      setAppear(false)
    }
  }
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
              <h4>Choose a map</h4>
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
                      onClick={() => {
                        setAttempt(false)
                        window.scrollTo(0, 0)
                      }}
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
            {openBattle ? (
              <CatchPokemon
                rosters={roster}
                appearedPokemon={appearedPokemon}
                level={appearedLevel}
              />
            ) : (
              <Paper className={classes.paper}>
                <h2>{match.params.name}</h2>
                <Grid container className={classes.map_container} spacing={2}>
                  <div className={classes.wild_container}>
                    <div>
                      {attempt ? (
                        appear ? (
                          <Paper className={classes.wild_encounter_success}>
                            {pokemonLoading ? (
                              <CircularProgress />
                            ) : (
                              <Alert
                                icon={false}
                                variant="filled"
                                severity="success"
                              >
                                <Grid container direction={"column"}>
                                  <Grid
                                    item
                                    className={classes.appeared_message}
                                  >
                                    <p>A wild pokemon has appeared !</p>
                                  </Grid>

                                  <Grid item className={classes.pokemon_panel}>
                                    <Grid container direction={"row"}>
                                      <Grid item xs={4}>
                                        <img
                                          src={
                                            "/assets/sprites/" +
                                            appearedPokemon.data.name.toLowerCase() +
                                            ".gif"
                                          }
                                          alt={appearedPokemon.data.name}
                                        />
                                        <p>{appearedPokemon.data.name}</p>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <TypeButton
                                          type1={appearedPokemon.data.type1}
                                          type2={appearedPokemon.data.type2}
                                        />
                                        <p>Level:{appearedLevel}</p>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <Button
                                          width={"100"}
                                          className={classes.capture_button}
                                          onClick={() => setOpenBattle(true)}
                                          size="small"
                                        >
                                          Catch pokemon !
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Alert>
                            )}
                          </Paper>
                        ) : (
                          <Paper className={classes.wild_encounter_fail}>
                            <Alert variant="filled" severity="error">
                              Sorry, no pokemon appeared
                            </Alert>
                          </Paper>
                        )
                      ) : null}
                    </div>
                    <div>
                      <img
                        width="500"
                        src={"/assets/maps/" + match.params.map + ".png"}
                        onClick={() => catchPokemon(match.params.map)}
                        className={classes.map__display}
                        alt={"map" + match.params.map}
                      />
                    </div>
                    <div>
                      Click anywhere on the map to search for a pokemon!
                    </div>
                  </div>
                </Grid>
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
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
                      sm={6}
                    >
                      <div className="pokemon__panel_sprite">
                        <img
                          src={
                            "/assets/sprites/" +
                            p.data.name.toLowerCase() +
                            ".gif"
                          }
                          alt={p.data.name}
                        />
                        Ready!
                      </div>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      key={p.data.pos}
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
