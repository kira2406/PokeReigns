import {
  AppBar,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
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
import CatchPokemon from "./CatchPokemon"
import GymBattle from "./GymBattle"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.34)",
    color: theme.palette.text.primary,
    width: "auto",
    alignSelf: "start",
  },
  leaderContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    padding: 20,
    marign: 20,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "auto",
    alignSelf: "start",
    justifyItems: "center",
    margin: "auto",
    alignItems: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
  container: {
    backgroundColor: theme.palette.background.default,
    height: "auto",
    padding: 20,
  },
  battleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  gymTitleContainer: {
    padding: 10,
  },
  gymTitle: {
    fontSize: 20,
    padding: 10,
  },
  gymPokemons: {
    display: "flex",
    justiyContent: "space-between",
    flexDirection: "row",
    alignSelf: "start",
  },
  vstitle: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Montserrat",
  },
  vscontent: {
    height: "40vh",
    backgroundImage: `url("/assets/vsbackground.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyItems: "center",
  },
  vstext: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontSize: 80,
    fontWeight: 500,
  },
  vsopponent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
  },
  vsopponentText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
    color: "#000",
    fontSize: 50,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textShadow: "2px 2px #ff1f8f ",
  },
  vsuser: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    fontWeight: 500,
    color: "#000",
    letterSpacing: "0.1em",
    textShadow: "2px 2px #1E4673 ",
  },
}))

export default function Battle() {
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
    numBadges,
  } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")
  const [gymLeaderPokemons, setGymLeaderPokemons] = useState([])
  const [currentLeader, setCurrentLeader] = useState(null)
  const [gymLoading, setGymLoading] = useState(true)
  const [gymPokemonLoading, setGymPokemonLoading] = useState(true)
  const [openBattle, setOpenBattle] = useState(false)
  const [openVSDisplay, setOpenVSDisplay] = useState(false)

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

  async function VSDialogClose() {
    setTimeout(() => {
      setOpenVSDisplay(false)
    }, 5000)
  }

  useEffect(() => {
    console.log(numBadges)

    db.collection("gymLeaders")
      .doc((numBadges + 1).toString())
      .get()
      .then((result) => {
        console.log(result.data())
        setCurrentLeader(result.data())
        setGymLoading(false)
      })
  }, [numBadges])

  useEffect(() => {
    console.log(numBadges)
    setGymLeaderPokemons([])
    db.collection("gymLeaders")
      .doc((numBadges + 1).toString())
      .collection("pokemons")
      .get()
      .then((result) => {
        result.forEach((pokemon) => {
          console.log(pokemon.data())
          setGymLeaderPokemons((gymLeaderPokemons) => [
            ...gymLeaderPokemons,
            pokemon.data(),
          ])
        })
        console.log(gymLeaderPokemons)
        setGymPokemonLoading(false)
      })
  }, [numBadges])

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
        {openBattle ? (
          <Grid container className={classes.battleContainer}>
            <GymBattle
              rosters={roster}
              oppPokemons={gymLeaderPokemons}
              gymleader={currentLeader}
            />
          </Grid>
        ) : (
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <h2>Your Roster</h2>
                  <Grid container className={classes.pokemon_container}>
                    {roster.map((p, index) =>
                      p.data["name"] ? (
                        <Grid
                          item
                          key={p.data.pos}
                          className={
                            classes.pokemon_panel +
                            " " +
                            p.data.type1 +
                            "__type"
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
                            <TypeButton
                              type1={p.data.type1}
                              type2={p.data.type2}
                            />
                          </div>
                        </Grid>
                      ) : (
                        <Grid
                          item
                          key={p.data.pos}
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
                  <Grid>
                    <h2>Gym Battle - Indigo League</h2>
                  </Grid>
                  <Paper>
                    {gymLoading || gymPokemonLoading ? (
                      "Loading"
                    ) : (
                      <Grid container>
                        <Grid container className={classes.leaderContainer}>
                          <Grid
                            item
                            sm={12}
                            className={classes.gymTitleContainer}
                          >
                            <Chip
                              label={currentLeader.gym}
                              className={classes.gymTitle}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <Grid container direction={"column"}>
                              <Grid item>
                                <img
                                  src={
                                    "assets/gymLeaders/" +
                                    currentLeader.name +
                                    "2.gif"
                                  }
                                />
                              </Grid>

                              <Grid item>{currentLeader.name}</Grid>
                            </Grid>
                          </Grid>
                          <Grid item sm={6}>
                            <Grid container direction={"column"}>
                              <Grid item>
                                Defeat {currentLeader.name} to get
                              </Grid>
                              <Grid item>
                                <img
                                  src={
                                    "assets/badges/" +
                                    currentLeader.badge +
                                    ".gif"
                                  }
                                  alt={currentLeader.badge}
                                  width={100}
                                />
                              </Grid>
                              <Grid item>{currentLeader.badge} Badge</Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item sm={12}>
                            <Grid
                              container
                              className={classes.pokemon_container}
                            >
                              {gymLeaderPokemons.map((pokemon) => (
                                <Grid
                                  item
                                  sm={6}
                                  className={
                                    classes.pokemon_panel +
                                    " " +
                                    pokemon.type1 +
                                    "__type"
                                  }
                                >
                                  <Grid
                                    container
                                    direction={"column"}
                                    className={classes.gymPokemons}
                                  >
                                    <Grid
                                      item
                                      className="pokemon__panel-sprite "
                                    >
                                      <img
                                        src={
                                          "/assets/sprites/" +
                                          pokemon.name +
                                          ".gif"
                                        }
                                        alt={pokemon.name}
                                      />
                                    </Grid>
                                    <Grid item className="pokemon__panel-info">
                                      <h4>{pokemon.name}</h4>
                                      <p className="level">
                                        Level: {pokemon.level}
                                      </p>
                                      <TypeButton
                                        type1={pokemon.type1}
                                        type2={pokemon.type2}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              ))}
                            </Grid>
                            <Button
                              onClick={() => {
                                setOpenBattle(true)
                                setOpenVSDisplay(true)
                                VSDialogClose()
                              }}
                              color="primary"
                              variant="contained"
                            >
                              Start battle
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}
        <Dialog maxWidth={"xl"} fullWidth={true} open={openVSDisplay}>
          {gymLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <DialogTitle>
                <h2 className={classes.vstitle}>Prepare for Battle !</h2>
              </DialogTitle>
              <DialogContent className={classes.vscontent}>
                <Grid container>
                  <Grid item sm={5} className={classes.vsuser}>
                    <div>{trainerName}</div>
                  </Grid>
                  <Grid item sm={2} className={classes.vstext}>
                    {"V    S"}
                  </Grid>
                  <Grid item sm={5} className={classes.vsopponent}>
                    <Grid container>
                      <Grid item sm={6} className={classes.vsopponentText}>
                        {currentLeader.name}
                      </Grid>
                      <Grid item sm={6}>
                        <img
                          src={
                            "/assets/gymLeaders/VS" +
                            currentLeader.name +
                            ".png"
                          }
                          height={150}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  )
}
