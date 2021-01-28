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
  Divider,
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
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    height: "auto",
    padding: 20,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)",
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
  header1: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  header2: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 20,
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
    alignItems: "center",
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
  badgeTitle: {
    textAlign: "center",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeContent: {
    height: "70vh",
    backgroundImage: "url('/assets/badgeCollect2.png')",
  },
  badgeConfetti: {
    backgroundImage: "url('/assets/confetti.gif')",
  },
  badgeName: {
    fontSize: 40,
    color: "#000",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textShadow: "2px 2px #1E4673 ",
    padding: 10,
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
export default function GymBattle({ rosters, oppPokemons, gymleader }) {
  const [roster, setRoster] = useState(rosters)
  const [ePokemons, setEPokemons] = useState(oppPokemons)
  const [gymLeader, setGymLeader] = useState(gymleader)
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
    numBadges,
  } = useAuth()
  const [error, setError] = useState("")
  const [userHealth, setUserHealth] = useState(0)
  const [battleLoading, setBattleLoading] = useState(true)
  const [inBattlePokemon, setInBattlePokemon] = useState(0) //index of the pokemon in battle
  const [inBattleEPokemon, setInBattleEPokemon] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [movesLoading, setMovesLoading] = useState(true)
  const [movesData, setMovesData] = useState({})
  const [swapOpen, setSwapOpen] = useState(false)
  const [nextPokemon, setNextPokemon] = useState(1)
  const [battlelog, setBattlelog] = useState([])
  const [fainted, setFainted] = useState(false)
  const [allPokemonsFainted, setAllPokemonsFainted] = useState(false)
  const [battleVictory, setBattleVictory] = useState(false)
  const [enemyFaints, setEnemyFaints] = useState(false)
  const [catchingPokemon, setCatchingPokemon] = useState(false)
  const [badgeCollect, setBadgeCollect] = useState(false)
  const [updating, setUpdating] = useState(false)

  // enemy moves fetching
  useEffect(() => {
    setMovesLoading(true)
    ePokemons.map((ePokemon) => {
      if (typeof ePokemon.move1 !== "undefined") {
        Promise.all(
          [ePokemon.move1, ePokemon.move2, ePokemon.move3, ePokemon.move4].map(
            async (moveID) => {
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
            }
          )
        ).then((result) => setMovesLoading(false))
      }
    })
  }, [ePokemons[0].move1])

  useEffect(() => {
    setBattleLoading(true)
    var finalArray = []
    console.log(roster)
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
    ePokemons.map((pokemon) => {
      pokemon.currentHP = pokemon.hp
    })

    setUserHealth((roster[0].data["currentHP"] / roster[0].data["hp"]) * 100)

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
  }, [roster])

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

  function checkAllEFainted() {
    var flag = true
    if (setFainted) {
      ePokemons.map((pokemon) => {
        if (pokemon.currentHP > 0) {
          flag = false
        }
      })
    }
    setBattleVictory(flag)
    flag
      ? console.log("All enemy pokemons fainted")
      : console.log("Aata innu idhe")
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

  const gymBattleVictory = (numBadges) => {
    setBadgeCollect(true)
    setUpdating(true)
    db.collection("users")
      .doc(currentUser.uid)
      .update({ numBadges: numBadges + 1 })
      .then((res) => {
        console.log("updated badge")
        setUpdating(false)
      })
  }
  function Battler(pokemon, enemy, pokemonMove, enemyMove) {
    console.log("enemyMove" + enemyMove)
    var battlerLog = []

    if (pokemon.data.speed > enemy.speed) {
      //pokemon attacking first

      battlerLog.push(pokemon.data.name + " used " + pokemonMove.identifier)

      if (pokemonMove["damage_class"] === "physical") {
        enemy.currentHP = Math.max(
          0,
          enemy.currentHP -
            damageCalc(
              pokemon.data.level,
              pokemon.data.attack,
              pokemonMove.power,
              enemy.defense,
              pokemonMove.type,
              enemy.type1,
              enemy.type2
            )
        )
      }

      if (enemy.currentHP <= 0) {
        setEnemyFaints(true)
        battlerLog.push(enemy.name + " fainted ")
        checkAllEFainted()
      }

      //enemy attacking
      battlerLog.push(enemy.name + " used " + enemyMove.identifier)
      if (enemyMove["damage_class"] === "physical") {
        pokemon.data.currentHP = Math.max(
          0,
          pokemon.data.currentHP -
            damageCalc(
              enemy.level,
              enemy.attack,
              enemyMove.power,
              pokemon.data.defense,
              enemyMove.type,
              pokemon.data.type1,
              pokemon.data.type2
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

      battlerLog.push(enemy.name + " used " + enemyMove.identifier)
      battlerLog.push(pokemon.data.name + " used " + pokemonMove.identifier)
      if (enemyMove["damage_class"] === "physical") {
        pokemon.data.currentHP = Math.max(
          0,
          pokemon.data.currentHP -
            damageCalc(
              enemy.level,
              enemy.attack,
              enemyMove.power,
              pokemon.data.defense,
              enemyMove.type,
              pokemon.data.type1,
              pokemon.data.type2
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
        enemy.currentHP = Math.max(
          0,
          enemy.currentHP -
            damageCalc(
              pokemon.data.level,
              pokemon.data.attack,
              pokemonMove.power,
              enemy.defense,
              pokemonMove.type,
              enemy.type1,
              enemy.type2
            )
        )
      }

      if (enemy.currentHP <= 0) {
        setEnemyFaints(true)
        battlerLog.push(enemy.name + " fainted ")
        checkAllEFainted()
      }
    }
    // console.log(battlerLog)
    return battlerLog
  }
  if (enemyFaints && !battleVictory) {
    battlelog.push(
      gymLeader.name + " chose " + ePokemons[inBattleEPokemon].name
    )
    setEnemyFaints(false)
    setInBattleEPokemon((prevState) => prevState + 1)
  }
  return (
    <div>
      <Paper className={classes.container}>
        <h3 className={classes.subTitle}>{gymLeader.gym} Battle</h3>
        {movesLoading || battleLoading ? (
          <div>
            <LinearProgress />
          </div>
        ) : (
          <div>
            <Grid container spacing={3}>
              <Grid item sm={6} className={classes.header1}>
                <span className={classes.header1}>Kira</span>
              </Grid>
              <Grid item sm={6} className={classes.header2}>
                <span className={classes.header2}>{gymLeader.name}</span>
              </Grid>
              <Grid item sm={6} className={classes.pokemon_container}>
                <Paper elevation={3} className={classes.rosterPokemon}>
                  <Grid container spacing={1}>
                    <Grid item sm={4} className={classes.image_container}>
                      <img
                        src={
                          "/assets/sprites/" +
                          roster[inBattlePokemon].data.name.toLowerCase() +
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
                          ePokemons[inBattleEPokemon].name.toLowerCase() +
                          ".gif"
                        }
                        alt={ePokemons[inBattleEPokemon].name}
                      />
                    </Grid>
                    <Grid item sm={8}>
                      <Grid container>
                        <Grid item sm={6}>
                          {ePokemons[inBattleEPokemon].name}
                        </Grid>
                        <Grid item sm={6}>
                          <TypeButton
                            type1={ePokemons[inBattleEPokemon].type1}
                            type2={ePokemons[inBattleEPokemon].type2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <p classes={classes.hp}>
                            HP: {ePokemons[inBattleEPokemon]["currentHP"]}/
                            {ePokemons[inBattleEPokemon]["hp"]}
                          </p>
                        </Grid>
                        <Grid item sm={6}>
                          <p className={classes.level}>
                            Level: {ePokemons[inBattleEPokemon].level}
                          </p>
                        </Grid>
                      </Grid>
                      {
                        <BorderLinearProgress
                          variant="determinate"
                          value={
                            (ePokemons[inBattleEPokemon]["currentHP"] /
                              ePokemons[inBattleEPokemon]["hp"]) *
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
              ) : battleVictory ? null : (
                <p>Choose your move !</p>
              )}
            </Grid>
            <Grid container spacing={3} className={classes.move_container}>
              {!fainted && !battleVictory ? (
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
                            ePokemons[inBattleEPokemon],
                            movesData[roster[inBattlePokemon].data.move1],
                            movesData[
                              [
                                ePokemons[inBattleEPokemon].move1,
                                ePokemons[inBattleEPokemon].move2,
                                ePokemons[inBattleEPokemon].move3,
                                ePokemons[inBattleEPokemon].move4,
                              ][Math.floor(Math.random() * 4)]
                            ]
                          )
                        )
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
                            ePokemons[inBattleEPokemon],
                            movesData[roster[inBattlePokemon].data.move2],
                            movesData[
                              [
                                ePokemons[inBattleEPokemon].move1,
                                ePokemons[inBattleEPokemon].move2,
                                ePokemons[inBattleEPokemon].move3,
                                ePokemons[inBattleEPokemon].move4,
                              ][Math.floor(Math.random() * 4)]
                            ]
                          )
                        )
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
                            ePokemons[inBattleEPokemon],
                            movesData[roster[inBattlePokemon].data.move3],
                            movesData[
                              [
                                ePokemons[inBattleEPokemon].move1,
                                ePokemons[inBattleEPokemon].move2,
                                ePokemons[inBattleEPokemon].move3,
                                ePokemons[inBattleEPokemon].move4,
                              ][Math.floor(Math.random() * 4)]
                            ]
                          )
                        )
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
                            ePokemons[inBattleEPokemon],
                            movesData[roster[inBattlePokemon].data.move4],
                            movesData[
                              [
                                ePokemons[inBattleEPokemon].move1,
                                ePokemons[inBattleEPokemon].move2,
                                ePokemons[inBattleEPokemon].move3,
                                ePokemons[inBattleEPokemon].move4,
                              ][Math.floor(Math.random() * 4)]
                            ]
                          )
                        )
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
              ) : battleVictory ? (
                <Paper direction={"column"}>
                  <div>{gymLeader.name}'s all pokemon have fainted.</div>
                  <div>Congratulations on defeating {gymLeader.name} !!</div>
                </Paper>
              ) : null}
              <Grid item sm={12} className={classes.moveButtonContainer}>
                {battleVictory ? (
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => gymBattleVictory(numBadges)}
                  >
                    Collect Badge
                  </Button>
                ) : (
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
                      variant={"contained"}
                      className={classes.quitButton}
                      onClick={() => history.push("/maps")}
                    >
                      Quit Battle
                    </Button>
                  </Tooltip>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item sm={6} className={classes.pokemon_container}>
                <Paper elevation={3} className={classes.enemyPokemon}>
                  <p>Select a pokemon below to swap</p>
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
                                pokemon.data.name.toLowerCase() +
                                ".gif"
                              }
                              alt={pokemon.data.name}
                            />
                          </ListItemAvatar>
                          <ListItemText>
                            {pokemon.data.name}
                            <br></br>
                            Level: {pokemon.data.level}
                            {(pokemon.data.currentHP / pokemon.data.hp) * 100 >
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
                <Paper elevation={3} className={classes.enemyPokemon}>
                  <p>{gymLeader.name}'s Pokemons</p>
                  <List className={classes.root}>
                    {ePokemons.map((pokemon, index) =>
                      pokemon.id !== "empty" ? (
                        <ListItem
                          elevation={3}
                          key={index}
                          className={
                            pokemon.currentHP <= 0
                              ? classes.faintP
                              : classes.activeP
                          }
                        >
                          <ListItemAvatar>
                            <img
                              src={
                                "/assets/sprites/" +
                                pokemon.name.toLowerCase() +
                                ".gif"
                              }
                              alt={pokemon.name}
                            />
                          </ListItemAvatar>
                          <ListItemText>
                            {pokemon.name}
                            <br></br>
                            Level: {pokemon.level}
                            {(pokemon.currentHP / pokemon.hp) * 100 > 30 ? (
                              <BorderLinearProgress
                                variant="determinate"
                                value={(pokemon.currentHP / pokemon.hp) * 100}
                              />
                            ) : (
                              <BorderDangerLinearProgress
                                className={classes.danger}
                                variant="determinate"
                                value={(pokemon.currentHP / pokemon.hp) * 100}
                              />
                            )}
                          </ListItemText>
                          <p className={classes.hp}>
                            HP: {pokemon.currentHP}/{pokemon.hp}
                          </p>
                        </ListItem>
                      ) : null
                    )}
                  </List>
                </Paper>
              </Grid>
              <Grid item sm={12} className={classes.quitButtonContainer}></Grid>
            </Grid>
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
      <Dialog maxWidth={"md"} fullWidth={true} open={badgeCollect}>
        <DialogContent className={classes.badgeContent}>
          <Grid container className={classes.badgeContainer}>
            <Grid item>
              <h2 className={classes.badgeTitle}>Congratulations !</h2>
            </Grid>
            <Grid item>
              <h3 className={classes.badgeTitle}>You won </h3>
            </Grid>
            <Grid item>
              <img
                src={"/assets/badges/" + gymLeader.badge + ".gif"}
                height={250}
              />
            </Grid>
            <Grid item className={classes.badgeName}>
              {gymLeader.badge} Badge
            </Grid>
            <Divider variant="middle" />
            {updating ? (
              <CircularProgress />
            ) : (
              <Button
                variant={"contained"}
                color="primary"
                onClick={() => {
                  history.push("/")
                }}
              >
                Return Home
              </Button>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
