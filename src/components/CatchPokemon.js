import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Slide,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
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
import axios from "axios"
import damageCalc from "./functions"
import HealthBar from "./HealthBar"
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
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Montserrat",
    color: theme.palette.text.primary,
    padding: 10,
  },
  subTitle: {
    fontSize: 20,
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
    justifyContent: "center",
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
  rosterPokemon: {
    width: "100%",
    padding: 20,
  },
  enemyPokemon: {
    width: "100%",
    padding: 20,
  },
  cover: {
    width: 151,
  },
  log_container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    flexDirection: "column",
  },
  move_container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    flexDirection: "row",
  },
  moveButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  quitButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  moveButton: {
    width: "100%",
  },
  catchButton: {
    width: "50%",
  },
  hp: {
    display: "flex",
    fontSize: 10,
    justifyItems: "end",
    paddingBottom: 5,
  },
  level: {
    fontSize: 13,
    paddingBottom: 5,
  },
  image_container: {
    height: "auto",
  },
  quitButton: {
    color: "red",
    width: "50%",
  },
  activeP: {
    backgroundColor: "rgb(28, 40, 51 )",
    borderRadius: "5px",
    marginBottom: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)",
    cursor: "pointer",
  },
  faintP: {
    borderRadius: "5px",
    marginBottom: "5px",
    pointerEvents: "none",
    opacity: 0.5,
  },
  greenColor: {
    bar: {
      backgroundColor: "#58D68D",
    },
  },
  redCOlor: {
    bar: {
      backgroundColor: "#C0392B",
    },
  },
}))

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "theme.palette.blue",
  },
  barColorPrimary: {
    color: "#58D68D",
  },
  bar: {
    borderRadius: 5,
  },
}))(LinearProgress)
const BorderDangerLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.blue,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#C0392B",
  },
}))(LinearProgress)
export default function CatchPokemon({ rosters, appearedPokemon, level }) {
  const [roster, setRoster] = useState(rosters)
  const [wildPokemon, setWildPokemon] = useState(appearedPokemon)
  const classes = useStyles()
  const history = useHistory()
  const {
    logout,
    trainerName,
    setTrainer,
    currentUser,
    pokemons,
    loading,
    darkMode,
    setDarkMode,
    rosterMoves,
  } = useAuth()
  const [error, setError] = useState("")
  const [userHealth, setUserHealth] = useState(0)
  const [battleLoading, setBattleLoading] = useState(true)
  const [inBattlePokemon, setInBattlePokemon] = useState(0) //index of the pokemon in battle
  const [refresh, setRefresh] = useState(false)
  const [movesLoading, setMovesLoading] = useState(true)
  const [movesData, setMovesData] = useState({})
  const [swapOpen, setSwapOpen] = useState(false)
  const [nextPokemon, setNextPokemon] = useState(1)
  const [battlelog, setBattlelog] = useState([])
  const [fainted, setFainted] = useState(false)
  const [allPokemonsFainted, setAllPokemonsFainted] = useState(false)
  const [pokemonCaught, setPokemonCaught] = useState(false)
  const [enemyFaints, setEnemyFaints] = useState(false)
  const [catchingLog, setCatchingLog] = useState([])
  const [catchingPokemon, setCatchingPokemon] = useState(false)
  const [addingLoading, setAddingLoading] = useState(false)
  const [addingSuccess, setAddingSuccess] = useState(false)

  // enemy moves fetching
  useEffect(() => {
    setMovesLoading(true)
    if (typeof wildPokemon.data.move1 !== "undefined") {
      // console.log(
      //   "length" +
      //     wildPokemon +
      //     "enemy moves" +
      //     wildPokemon.data.move1 +
      //     " " +
      //     typeof wildPokemon.data.move1 +
      //     "\n" +
      //     wildPokemon.data.move2 +
      //     " " +
      //     typeof wildPokemon.data.move3
      // )

      Promise.all(
        [
          wildPokemon.data.move1,
          wildPokemon.data.move2,
          wildPokemon.data.move3,
          wildPokemon.data.move4,
        ].map(async (moveID) => {
          if (moveID != null && moveID != "") {
            await db
              .collection("moves")
              .doc(moveID)
              .get()
              .then((result) => {
                movesData[moveID] = result.data()
                // console.log(result.data())
              })
              .catch((err) =>
                console.log("Error enemies fetching move" + moveID)
              )
          }
        })
      ).then((result) => setMovesLoading(false))
    }
  }, [wildPokemon.data.move1])

  useEffect(() => {
    // roster[inBattlePokemon].data["currentHP"] =
    //   roster[inBattlePokemon].data["hp"]
    setBattleLoading(true)
    var finalArray = []
    var finalem = []
    roster.map((pokemon) => {
      pokemon.data.currentHP = pokemon.data.hp
      finalArray = [
        ...new Set([
          ...finalArray,
          ...[
            pokemon.data["move1"],
            pokemon.data["move2"],
            pokemon.data["move3"],
            pokemon.data["move4"],
          ],
        ]),
      ]
    })

    appearedPokemon.data.currentHP = appearedPokemon.data.hp
    wildPokemon.data.currentHP = wildPokemon.data.hp
    wildPokemon.data.level = level
    setUserHealth((roster[0].data["currentHP"] / roster[0].data["hp"]) * 100)
    if (wildPokemon) {
      // console.log("appeared Pokemon data" + wildPokemon.data)
      const fetchem = async () =>
        await db
          .collection("pokemon_moves")
          .doc(wildPokemon.id)
          .get()
          .then((result) => {
            for (let l = 0; l <= level; l++) {
              if (result.data()[l]) {
                finalem = [
                  ...new Set([...finalem, ...JSON.parse(result.data()[l])]),
                ]
              }
            }
            // console.log("enemy moves list" + finalem)
          })
      fetchem().then(() => {
        wildPokemon.data.move1 = "33"
        wildPokemon.data.move2 = finalem[
          Math.floor(Math.random() * finalem.length)
        ].toString()
        wildPokemon.data.move3 = finalem[
          Math.floor(Math.random() * finalem.length)
        ].toString()
        wildPokemon.data.move4 = finalem[
          Math.floor(Math.random() * finalem.length)
        ].toString()

        // console.log(
        //   "enemyMoves" +
        //     wildPokemon.data.move1 +
        //     " " +
        //     wildPokemon.data.move2 +
        //     " " +
        //     wildPokemon.data.move3 +
        //     " " +
        //     wildPokemon.data.move4
        // )
      })
    }
    Promise.all(
      finalArray.map(async (moveID) => {
        setBattleLoading(true)
        if (moveID != null && moveID != "") {
          await db
            .collection("moves")
            .doc(moveID)
            .get()
            .then((result) => {
              movesData[moveID] = result.data()
              // console.log(result.data())
            })
            .catch((err) => console.log("Error fetching move" + moveID))
        }
      })
    ).then((result) => setBattleLoading(false))
  }, [])

  //enemies moves

  // console.log("currentHP" + roster[inBattlePokemon].data["currentHP"])
  // console.log("appeared" + appearedPokemon.name)
  // console.log("enemy" + appearedPokemon.hp)
  // console.log("enemyHP" + appearedPokemon["currentHP"])

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  async function addToPokemon() {
    setAddingLoading(true)
    var count = 0
    roster.map((pokemon) => {
      if (pokemon.id != "empty") count++
    })
    console.log("NUmber of pokemon in roster" + count)
    if (count < 6) {
      wildPokemon.data.pos = count + 1
      db.collection("users")
        .doc(currentUser.uid)
        .collection("roster")
        .add(wildPokemon.data)
        .then((result) => {
          setAddingSuccess(true)
          setAddingLoading(false)
        })
    } else {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("pokemons")
        .add(wildPokemon.data)
        .then((result) => {
          setAddingSuccess(true)
          setAddingLoading(false)
        })
    }
  }

  function checkAllFainted() {
    var flag = true
    if (setFainted) {
      roster.map((pokemon) => {
        if (pokemon.data.currentHP > 0) {
          flag = false
        }
      })
    }
    setAllPokemonsFainted(flag)
    flag ? console.log("All pokemons fainted") : console.log("Aata innu idhe")
  }

  const handleCloseSuccess = () => {
    setAddingSuccess(false)
  }
  const handleSwapConfOpen = (index) => {
    setSwapOpen(true)
    setNextPokemon(index)
    console.log(index)
  }
  const handleSwapConfClose = () => {
    setSwapOpen(false)
  }
  const SwapPokemonConf = () => {
    setSwapOpen(false)
    setFainted(false)
    setInBattlePokemon(nextPokemon)
    window.scrollTo(0, 0)
  }

  function throwPokeBall() {
    setCatchingPokemon(true)
    setCatchingLog(["You threw a pokeball!"])
    setTimeout(() => {
      setCatchingLog(["You threw a pokeball!", "3"])
      setTimeout(() => {
        setCatchingLog(["You threw a pokeball!", "3", "2"])
        setTimeout(() => {
          setCatchingLog(["You threw a pokeball!", "3", "2", "1"])
          setTimeout(() => {
            if (Math.random() < 0.5) {
              setPokemonCaught(true)
              setCatchingLog(["You threw a pokeball!", "3", "2", "1"])
              addToPokemon()
            } else {
              setPokemonCaught(false)
              setCatchingLog([
                "You threw a pokeball!",
                "3",
                "2",
                "1",
                "Pokemon Escaped!!",
              ])
              setCatchingPokemon(false)
            }
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  }

  function Battler(pokemon, enemy, pokemonMove, enemyMove) {
    // console.log("Battling")
    var battlerLog = []
    // console.log("Pokemon Attacking" + pokemon.data.name)
    // console.log("Pokemon move used Attacking" + pokemonMove.identifier)
    // console.log("enemy Attacking" + enemy.data.name)
    // console.log("Pokemon move used Attacking" + enemyMove.identifier)
    if (pokemon.data.speed > enemy.data.speed) {
      //pokemon attacking first

      battlerLog.push(pokemon.data.name + " used " + pokemonMove.identifier)
      battlerLog.push(enemy.data.name + " used " + enemyMove.identifier)
      if (pokemonMove["damage_class"] === "physical") {
        // console.log(
        //   "damage" +
        //     damageCalc(
        //       pokemon.data.level,
        //       pokemon.data.attack,
        //       pokemonMove.power,
        //       enemy.data.defense
        //     )
        // )
        enemy.data.currentHP = Math.max(
          0,
          enemy.data.currentHP -
            damageCalc(
              pokemon.data.level,
              pokemon.data.attack,
              pokemonMove.power,
              enemy.data.defense
            )
        )
      }

      if (enemy.data.currentHP <= 0) {
        setEnemyFaints(true)
        battlerLog.push(enemy.data.name + " fainted ")
      }

      if (enemyMove["damage_class"] === "physical") {
        pokemon.data.currentHP = Math.max(
          0,
          pokemon.data.currentHP -
            damageCalc(
              enemy.data.level,
              enemy.data.attack,
              enemyMove.power,
              pokemon.data.defense
            )
        )
      }

      if (pokemon.data.currentHP <= 0) {
        setFainted(true)
        checkAllFainted()
        battlerLog.push(pokemon.data.name + " fainted ")
      }
    } else {
      // enemy attacking first

      battlerLog.push(enemy.data.name + " used " + enemyMove.identifier)
      battlerLog.push(pokemon.data.name + " used " + pokemonMove.identifier)
      if (enemyMove["damage_class"] === "physical") {
        pokemon.data.currentHP = Math.max(
          0,
          pokemon.data.currentHP -
            damageCalc(
              enemy.data.level,
              enemy.data.attack,
              enemyMove.power,
              pokemon.data.defense
            )
        )
      }
      if (pokemon.data.currentHP <= 0) {
        setFainted(true)
        checkAllFainted()
        battlerLog.push(pokemon.data.name + " fainted ")
      }
      if (pokemonMove["damage_class"] === "physical") {
        // console.log(
        //   "damage" +
        //     damageCalc(
        //       pokemon.data.level,
        //       pokemon.data.attack,
        //       pokemonMove.power,
        //       enemy.data.defense
        //     )
        // )
        enemy.data.currentHP = Math.max(
          0,
          enemy.data.currentHP -
            damageCalc(
              pokemon.data.level,
              pokemon.data.attack,
              pokemonMove.power,
              enemy.data.defense
            )
        )
      }
      if (enemy.data.currentHP <= 0) {
        setEnemyFaints(true)
        battlerLog.push(enemy.data.name + " fainted ")
      }
    }
    // console.log(battlerLog)
    return battlerLog
  }

  return (
    <div>
      <Paper className={classes.container}>
        <h3 className={classes.subTitle}>Battle with Wild Pokemon</h3>
        {movesLoading || battleLoading ? (
          <div>
            <LinearProgress />
          </div>
        ) : (
          <div>
            <Grid container spacing={3}>
              <Grid item sm={6} className={classes.pokemon_container}>
                <Paper elevation={3} className={classes.rosterPokemon}>
                  <Grid container spacing={1}>
                    <Grid item sm={4} className={classes.image_container}>
                      <img
                        src={
                          "/assets/sprites/" +
                          roster[inBattlePokemon].data.name +
                          ".gif"
                        }
                        alt={roster[inBattlePokemon].data.name}
                      />
                    </Grid>
                    <Grid item sm={8}>
                      <Grid container>
                        <Grid item sm={6}>
                          {roster[inBattlePokemon].data.name}
                        </Grid>
                        <Grid item sm={6}>
                          <TypeButton
                            type1={roster[inBattlePokemon].data.type1}
                            type2={roster[inBattlePokemon].data.type2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <p className={classes.hp}>
                            HP: {roster[inBattlePokemon].data["currentHP"]}/
                            {roster[inBattlePokemon].data["hp"]}
                          </p>
                        </Grid>
                        <Grid item sm={6}>
                          <p className={classes.level}>
                            Level: {roster[inBattlePokemon].data.level}
                          </p>
                        </Grid>
                      </Grid>

                      <BorderLinearProgress
                        variant="determinate"
                        className={{
                          bar: {
                            backgroundColor: "#58D68D",
                          },
                        }}
                        value={
                          (roster[inBattlePokemon].data["currentHP"] /
                            roster[inBattlePokemon].data["hp"]) *
                          100
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item sm={6} className={classes.pokemon_container}>
                <Paper elevation={3} className={classes.enemyPokemon}>
                  <Grid container spacing={1}>
                    <Grid item sm={4} className={classes.image_container}>
                      <img
                        src={
                          "/assets/sprites/" +
                          appearedPokemon.data.name +
                          ".gif"
                        }
                        alt={appearedPokemon.data.name}
                      />
                    </Grid>
                    <Grid item sm={8}>
                      <Grid container>
                        <Grid item sm={6}>
                          {wildPokemon.data.name}
                        </Grid>
                        <Grid item sm={6}>
                          <TypeButton
                            type1={wildPokemon.data.type1}
                            type2={wildPokemon.data.type2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <p classes={classes.hp}>
                            HP: {wildPokemon.data["currentHP"]}/
                            {wildPokemon.data["hp"]}
                          </p>
                        </Grid>
                        <Grid item sm={6}>
                          <p className={classes.level}>
                            Level: {wildPokemon.data.level}
                          </p>
                        </Grid>
                      </Grid>
                      {
                        <BorderLinearProgress
                          variant="determinate"
                          value={
                            (wildPokemon.data["currentHP"] /
                              wildPokemon.data["hp"]) *
                            100
                          }
                        />
                      }
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.log_container}>
              {/*  Battle log displaying */}
              {battlelog && battlelog.map((log) => <div>{log}</div>)}
              {catchingLog && catchingLog.map((log) => <div>{log}</div>)}
              {pokemonCaught && (
                <Alert severity="info" variant="filled" icon={false}>
                  <Grid container direction={"column"}>
                    <Grid item>
                      <Grid container direction={"row"}>
                        <Grid item xs={4}>
                          <img
                            src={
                              "/assets/sprites/" +
                              wildPokemon.data.name +
                              ".gif"
                            }
                            alt={wildPokemon.data.name}
                          />
                          <p>{wildPokemon.data.name}</p>
                        </Grid>
                        <Grid item xs={4}>
                          <TypeButton
                            type1={wildPokemon.data.type1}
                            type2={wildPokemon.data.type2}
                          />
                          <p>Level:{wildPokemon.data.level}</p>
                        </Grid>
                        <Grid item xs={4}>
                          Added to your inventory !
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Alert>
              )}
              {fainted ? (
                allPokemonsFainted ? (
                  <Alert severity="error" icon={false} variant="filled">
                    Oh No ! All your pokemons have fainted. You have lost the
                    Battle.
                  </Alert>
                ) : (
                  <p>Choose your next Pokemon !</p>
                )
              ) : catchingPokemon ? (
                <p></p>
              ) : (
                <p>Choose your move !</p>
              )}
            </Grid>
            <Grid container spacing={3} className={classes.move_container}>
              {!fainted && !pokemonCaught && !enemyFaints ? (
                <>
                  <Grid item sm={3} className={classes.moveButtonContainer}>
                    <Button
                      className={
                        classes.moveButton +
                        " " +
                        movesData[roster[inBattlePokemon].data.move1]["type"] +
                        "__button"
                      }
                      onClick={() => {
                        setBattlelog("")
                        setBattlelog(
                          Battler(
                            roster[inBattlePokemon],
                            wildPokemon,
                            movesData[roster[inBattlePokemon].data.move1],
                            movesData[wildPokemon.data.move1]
                          )
                        )
                        setCatchingLog("")
                      }}
                    >
                      {
                        movesData[roster[inBattlePokemon].data.move1][
                          "identifier"
                        ]
                      }
                    </Button>
                  </Grid>
                  <Grid item sm={3} className={classes.moveButtonContainer}>
                    <Button
                      className={
                        classes.moveButton +
                        " " +
                        movesData[roster[inBattlePokemon].data.move2]["type"] +
                        "__button"
                      }
                      onClick={() => {
                        setBattlelog("")
                        setBattlelog(
                          Battler(
                            roster[inBattlePokemon],
                            wildPokemon,
                            movesData[roster[inBattlePokemon].data.move2],
                            movesData[wildPokemon.data.move2]
                          )
                        )
                        setCatchingLog("")
                      }}
                    >
                      {
                        movesData[roster[inBattlePokemon].data.move2][
                          "identifier"
                        ]
                      }
                    </Button>
                  </Grid>
                  <Grid item sm={3} className={classes.moveButtonContainer}>
                    <Button
                      className={
                        classes.moveButton +
                        " " +
                        movesData[roster[inBattlePokemon].data.move3]["type"] +
                        "__button"
                      }
                      onClick={() => {
                        setBattlelog("")
                        setBattlelog(
                          Battler(
                            roster[inBattlePokemon],
                            wildPokemon,
                            movesData[roster[inBattlePokemon].data.move3],
                            movesData[wildPokemon.data.move3]
                          )
                        )
                        setCatchingLog("")
                      }}
                    >
                      {
                        movesData[roster[inBattlePokemon].data.move3][
                          "identifier"
                        ]
                      }
                    </Button>
                  </Grid>
                  <Grid item sm={3} className={classes.moveButtonContainer}>
                    <Button
                      className={
                        classes.moveButton +
                        " " +
                        movesData[roster[inBattlePokemon].data.move4]["type"] +
                        "__button"
                      }
                      onClick={() => {
                        setBattlelog("")
                        setBattlelog(
                          Battler(
                            roster[inBattlePokemon],
                            wildPokemon,
                            movesData[roster[inBattlePokemon].data.move4],
                            movesData[wildPokemon.data.move4]
                          )
                        )
                        setCatchingLog("")
                      }}
                    >
                      {
                        movesData[roster[inBattlePokemon].data.move4][
                          "identifier"
                        ]
                      }
                    </Button>
                  </Grid>
                </>
              ) : null}
              {!pokemonCaught ? (
                <Grid item sm={6} className={classes.moveButtonContainer}>
                  {enemyFaints ? null : (
                    <Tooltip
                      title={
                        <React.Fragment>
                          <Typography>
                            Make sure the wild Pokemon's health is low before
                            attempting to catch it
                          </Typography>
                        </React.Fragment>
                      }
                    >
                      <Button
                        className={classes.catchButton}
                        onClick={() => {
                          // setUserHealth(userHealth - 10)
                          setBattlelog("")
                          throwPokeBall()
                          // wildPokemon.currentHP = wildPokemon.currentHP - 10
                        }}
                      >
                        Catch Pokemon
                      </Button>
                    </Tooltip>
                  )}
                </Grid>
              ) : null}
              <Grid item sm={6} className={classes.moveButtonContainer}>
                {!pokemonCaught ? (
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography>
                          Selecting to quit, you will lose the battle
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <Button
                      className={classes.quitButton}
                      onClick={() => history.push("/maps")}
                    >
                      Quit Battle
                    </Button>
                  </Tooltip>
                ) : addingLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    className={classes.quitButton}
                    onClick={() => history.push("/maps")}
                  >
                    Quit Battle
                  </Button>
                )}
              </Grid>
            </Grid>
            {!pokemonCaught ? (
              <Grid container spacing={3}>
                <Grid item sm={6} className={classes.pokemon_container}>
                  <Paper elevation={3} className={classes.enemyPokemon}>
                    <p>
                      Select a pokemon below to swap with the curent pokemon
                    </p>
                    <List className={classes.root}>
                      {roster.map((pokemon, index) =>
                        pokemon.id !== "empty" ? (
                          <ListItem
                            onClick={() => handleSwapConfOpen(index)}
                            elevation={3}
                            key={index}
                            className={
                              pokemon.data.currentHP <= 0
                                ? classes.faintP
                                : classes.activeP
                            }
                          >
                            <ListItemAvatar>
                              <img
                                src={
                                  "/assets/sprites/" +
                                  pokemon.data.name +
                                  ".gif"
                                }
                                alt={pokemon.data.name}
                              />
                            </ListItemAvatar>
                            <ListItemText>
                              {pokemon.data.name}
                              <br></br>
                              Level: {pokemon.data.level}
                              {(pokemon.data.currentHP / pokemon.data.hp) *
                                100 >
                              30 ? (
                                <BorderLinearProgress
                                  variant="determinate"
                                  value={
                                    (pokemon.data.currentHP / pokemon.data.hp) *
                                    100
                                  }
                                />
                              ) : (
                                <BorderDangerLinearProgress
                                  className={classes.danger}
                                  variant="determinate"
                                  value={
                                    (pokemon.data.currentHP / pokemon.data.hp) *
                                    100
                                  }
                                />
                              )}
                            </ListItemText>
                            <p className={classes.hp}>
                              HP: {pokemon.data.currentHP}/{pokemon.data.hp}
                            </p>
                          </ListItem>
                        ) : null
                      )}
                    </List>
                  </Paper>
                </Grid>
                <Grid item sm={6} className={classes.pokemon_container}>
                  <Paper elevation={3} className={classes.enemyPokemon}></Paper>
                </Grid>
                <Grid
                  item
                  sm={12}
                  className={classes.quitButtonContainer}
                ></Grid>
              </Grid>
            ) : null}
          </div>
        )}
      </Paper>
      <Dialog
        open={swapOpen}
        onClose={handleSwapConfClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Confirm swap?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSwapConfClose} color="primary">
            Disagree
          </Button>
          <Button onClick={SwapPokemonConf} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={addingSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="info">
          Wild Pokemon Caught Successfully !
        </Alert>
      </Snackbar>
    </div>
  )
}
