import {
  Avatar,
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  NativeSelect,
  Paper,
  Select,
  Snackbar,
  Typography,
} from "@material-ui/core"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"
import db from "./firebase"
import TypeButton from "./TypeButton"
import MuiAlert from "@material-ui/lab/Alert"
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    padding: 30,
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
    minHeight: "100vh",
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
  dialog_pokemon: {
    justifyContent: "center",
    alignContent: "center",
    justifySelf: "center",
    alignSelf: "center",
    justifyItems: "center",
    alignItems: "center",
  },
  otherPokemonPanel: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)",
    color: theme.palette.text.primary,
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
  },
  yptitle: {
    padding: 10,
    fontSize: 30,
  },
  loadingDisp: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
    paddingBottom: 20,
  },
  move: {
    textTransform: "capitalize",
    padding: 20,
  },
  disabled: {
    pointerEvents: "none",
  },
}))
export default function YourPokemon() {
  const [fetchMoves, setFetchMoves] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [selectedPokemon, setSelectedPokemon] = React.useState(null)
  const classes = useStyles()
  const history = useHistory()
  const [error, setError] = useState("")
  const { logout, trainerName, roster, currentUser, setRosterData } = useAuth()
  const [movesdb, setMovesdb] = useState({}) //allowable moves of roster pokemon
  const [rosterMoves, setRosterMoves] = useState({}) //moves of roster pokemons
  const [movesLoading, setMovesLoading] = useState(false) //moves loading
  const [pokemonsLoading, setPokemonsLoading] = useState(true) //pokemons loading
  const [movesData, setMovesData] = useState({})
  const [MovesIds, setMovesIds] = useState([]) //storing all moves into a single array
  const [remainingPokemons, setRemainingPokemons] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const [SwappingPokemon, setSwappingPokemon] = useState(null)
  const [changesMade, setChangesMade] = useState(false)
  const [savingChanges, setSavingChanges] = useState(false)

  const handleClickOpen = (value) => {
    setOpen(true)
    setSelectedPokemon(value)
    console.log("selected Pokemon" + value.id)
  }

  const handleClose = (value) => {
    if (value == true) {
      console.log("something was returned ")

      var count = 1
      var roster = []
      db.collection("users")
        .doc(currentUser.uid)
        .collection("roster")
        .get()
        .then((snapshot) => {
          roster = []
          snapshot.forEach((doc) => {
            roster.push({ id: doc.id, data: doc.data() })
            count++
          })
          while (count <= 6) {
            roster.push({
              id: "empty",
              data: { pokemonName: "none", pos: count },
            })
            count++
          }
          setRosterData(roster)
          console.log(roster)
        })
    }
    setOpen(false)
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
  useEffect(() => {
    var rpokemon = []
    setRemainingPokemons(rpokemon)
    db.collection("users")
      .doc(currentUser.uid)
      .collection("pokemons")
      .onSnapshot((result) => {
        rpokemon = []
        result.forEach((pokemon) => {
          console.log(pokemon.data())
          rpokemon.push({ id: pokemon.id, data: pokemon.data() })
        })
        console.log(rpokemon)
        setRemainingPokemons(rpokemon)
        setPokemonsLoading(false)
      })
  }, [])
  useEffect(() => {
    if (roster !== null) {
      setMovesLoading(true)

      roster.forEach((pokemon) => {
        if (pokemon.id !== "empty") {
          db.collection("pokemon_moves")
            .doc(pokemon.data.pid)
            .get()
            .then((doc) => {
              // console.log(pokemon.id)
              var finalArray = []
              for (let l = 0; l <= pokemon.data.level; l++) {
                if (doc.data()[l]) {
                  finalArray = [
                    ...new Set([...finalArray, ...JSON.parse(doc.data()[l])]),
                  ]
                }
              }
              movesdb[pokemon.id] = finalArray
              console.log("fetching pokemon moves id")

              setMovesIds([...new Set([...MovesIds, ...finalArray])])
              setMovesLoading(false)
              // console.log(MovesIds)
            })
            .catch((e) => console.log("Error fetching pokemon moves"))
        }
      })
      // console.log(MovesIds)
    }
  }, [roster])

  useEffect(() => {
    setMovesLoading(true)
    // console.log(MovesIds)
    MovesIds.forEach((element) => {
      // console.log(element)
      db.collection("moves")
        .doc(element.toString())
        .get()
        .then((result) => {
          // console.log(result.data())
          movesData[element] = result.data()
          setMovesLoading(false)
        })
        .catch((e) => console.log("error"))
      // console.log("MovesData" + movesData["33"]["identifier"])
    })
  }, [MovesIds, roster])
  function HandleSelectOpen() {
    setSelectOpen(true)
  }
  function HandleSelectClose() {
    setSelectOpen(false)
  }

  function handleSwapPokemon(pos, index) {
    setChangesMade(true)
    setSwappingPokemon(remainingPokemons[index])
    console.log(
      "Swapping " +
        remainingPokemons[index].data.name +
        " with " +
        roster[pos - 1].data.name
    )
    var temp = roster[pos - 1]
    roster[pos - 1] = remainingPokemons[index]
    remainingPokemons[index] = temp
  }

  async function handleSaveChanges() {
    const dbRoster = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("roster")
      .orderBy("pos", "asc")
      .get()
    let rindex = 0
    const result = await dbRoster.forEach((rosterPokemon) => {
      async function a(rosterPokemon, index) {
        console.log(rosterPokemon.id + " " + roster[index].id)
        if (rosterPokemon.id !== roster[index].id) {
          roster[index].data.pos = index + 1
          // console.log(roster[index])
          const pdata = rosterPokemon.data()
          pdata.pos = null
          // console.log(rosterPokemon)
          const res1 = await db
            .collection("users")
            .doc(currentUser.uid)
            .collection("pokemons")
            .doc(rosterPokemon.id)
            .set(pdata)
          const res4 = await db
            .collection("users")
            .doc(currentUser.uid)
            .collection("pokemons")
            .doc(roster[index].id)
            .delete()
          const res2 = await db
            .collection("users")
            .doc(currentUser.uid)
            .collection("roster")
            .doc(roster[index].id)
            .set(roster[index].data)
          console.log("Added pokemons to roster and pokemons")
          const res3 = await db
            .collection("users")
            .doc(currentUser.uid)
            .collection("roster")
            .doc(rosterPokemon.id)
            .delete()
        }
      }
      a(rosterPokemon, rindex)
      rindex = rindex + 1
    })

    setChangesMade(false)
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
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h2>Your Roster</h2>
              <Grid container className={classes.pokemon_container}>
                {!movesLoading ? (
                  roster.map((p, index) =>
                    p.data.name ? (
                      <Grid
                        item
                        key={p.data.pos}
                        className={
                          classes.pokemon_panel + " " + p.data.type1 + "__type"
                        }
                        sm={5}
                        onClick={() => handleClickOpen(p)}
                      >
                        <div className="pokemon__panel-sprite ">
                          <img
                            src={
                              "/assets/sprites/" +
                              p.data.name.toLowerCase() +
                              ".gif"
                            }
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
                  )
                ) : (
                  <CircularProgress />
                )}
                {changesMade ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSavingChanges(true)
                      handleSaveChanges()
                      setSavingChanges(false)
                    }}
                  >
                    Save Changes
                  </Button>
                ) : null}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h2>Your Pokemons</h2>
              <Grid container>
                {pokemonsLoading ? (
                  <CircularProgress />
                ) : remainingPokemons ? (
                  remainingPokemons.map((pokemon, index) => (
                    <Grid item sm={12} className={classes.otherPokemonPanel}>
                      <Grid container>
                        <Grid item sm={4}>
                          <img
                            src={
                              "/assets/sprites/" +
                              pokemon.data.name.toLowerCase() +
                              ".gif"
                            }
                            alt={pokemon.data.name}
                          />
                        </Grid>
                        <Grid item sm={4}>
                          <h3>{pokemon.data.name}</h3>
                          <p>Level: {pokemon.data.level}</p>
                          <TypeButton
                            type1={pokemon.data.type1}
                            type2={pokemon.data.type2}
                          />
                        </Grid>
                        <Grid item sm={4}>
                          <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="contained primary button group"
                            disabled={changesMade ? true : false}
                          >
                            <ButtonGroup
                              orientation="vertical"
                              color="primary"
                              aria-label="vertical contained primary button group"
                              variant="contained"
                            >
                              <Button
                                onClick={() => handleSwapPokemon(1, index)}
                              >
                                One
                              </Button>
                              <Button
                                onClick={() => handleSwapPokemon(3, index)}
                              >
                                Three
                              </Button>
                              <Button
                                onClick={() => handleSwapPokemon(5, index)}
                              >
                                Five
                              </Button>
                            </ButtonGroup>
                            <ButtonGroup
                              orientation="vertical"
                              color="primary"
                              aria-label="vertical contained primary button group"
                              variant="contained"
                            >
                              <Button
                                onClick={() => handleSwapPokemon(2, index)}
                              >
                                Two
                              </Button>
                              <Button
                                onClick={() => handleSwapPokemon(4, index)}
                              >
                                Four
                              </Button>
                              <Button
                                onClick={() => handleSwapPokemon(6, index)}
                              >
                                Six
                              </Button>
                            </ButtonGroup>
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))
                ) : null}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
        <SimpleDialog
          selectedPokemon={selectedPokemon}
          movesdb={movesdb}
          open={open}
          onClose={handleClose}
          movesData={movesData}
          movesLoading={movesLoading}
          currentUser={currentUser}
          setRosterData={setRosterData}
        />
        <Dialog
          open={savingChanges}
          disableBackdropClick
          disableEscapeKeyDown
          minWidth="xs"
        >
          <DialogTitle id="customized-dialog-title">Saving Changes</DialogTitle>
          <DialogContent>
            <Grid className={classes.loadingDisp}>
              <CircularProgress />
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
//trial code

function SimpleDialog(props) {
  const classes = useStyles()
  const [move1, setMove1] = useState()
  const [move2, setMove2] = useState()
  const [move3, setMove3] = useState()
  const [move4, setMove4] = useState()
  const [displaySave, setDisplaySave] = useState(false)
  const [updatedPokemon, setUpdatedPokemon] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [changed, setChanged] = useState(false)

  const {
    onClose,
    selectedPokemon,
    open,
    setRosterData,
    movesdb,
    movesData,
    movesLoading,
    currentUser,
  } = props

  const handleClose = () => {
    onClose(changed)
    setDisplaySave(false)
  }
  const handleCloseSuccess = async (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpenSuccess(false)
  }
  const handleSave = async (move1, move2, move3, move4, updatedPokemon) => {
    setUpdating(true)
    await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("roster")
      .doc(updatedPokemon)
      .update({
        move1: move1,
        move2: move2,
        move3: move3,
        move4: move4,
      })
      .then((result) => {
        console.log("Updated successfully")
        setUpdating(false)
        setDisplaySave(false)
        setChanged(true)
        setOpenSuccess(true)
      })
      .catch((e) => console.log("Error in updating"))
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit Moves
      </DialogTitle>
      {selectedPokemon ? (
        <DialogContent>
          <Grid container alignItems="center" justify="center">
            <Grid item sm={4} className={classes.dialog_pokemon}>
              <div className={classes.pok}>
                <img
                  src={
                    "/assets/sprites/" +
                    selectedPokemon.data.name.toLowerCase() +
                    ".gif"
                  }
                  alt={selectedPokemon.data.name}
                />
              </div>
              <h4>{selectedPokemon.data.name}</h4>
              <p className="level">Level: {selectedPokemon.data.level}</p>
              <TypeButton
                type1={selectedPokemon.data.type1}
                type2={selectedPokemon.data.type2}
              />
            </Grid>
            <Grid item sm={8}>
              <Grid container>
                <Grid item sm={6} className={classes.move}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">
                      Move 1
                    </InputLabel>
                    <NativeSelect
                      onChange={(event) => {
                        setMove1(event.target.value)
                        setMove2(selectedPokemon.data.move2)
                        setMove3(selectedPokemon.data.move3)
                        setMove4(selectedPokemon.data.move4)
                        setUpdatedPokemon(selectedPokemon.id)

                        selectedPokemon.data.move1 === event.target.value
                          ? setDisplaySave(false)
                          : setDisplaySave(true)
                      }}
                      defaultValue={selectedPokemon.data.move2}
                      inputProps={{
                        name: "move1",
                        id: "filled-age-native-simple",
                      }}
                    >
                      {!movesLoading &&
                        movesdb[selectedPokemon.id].map((move) => (
                          <option key={move} value={move}>
                            {movesData[move]["identifier"]}
                          </option>
                        ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid item sm={6} className={classes.move}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">
                      Move 2
                    </InputLabel>
                    <NativeSelect
                      onChange={(event) => {
                        setMove2(event.target.value)
                        setMove1(selectedPokemon.data.move1)
                        setMove3(selectedPokemon.data.move3)
                        setMove4(selectedPokemon.data.move4)
                        setUpdatedPokemon(selectedPokemon.id)

                        selectedPokemon.data.move2 === event.target.value
                          ? setDisplaySave(false)
                          : setDisplaySave(true)
                      }}
                      defaultValue={selectedPokemon.data.move2}
                      inputProps={{
                        name: "move2",
                        id: "filled-age-native-simple",
                      }}
                    >
                      {!movesLoading &&
                        movesdb[selectedPokemon.id].map((move) => (
                          <option value={move}>
                            {movesData[move]["identifier"]}
                          </option>
                        ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={6} className={classes.move}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">
                      Move 3
                    </InputLabel>
                    <NativeSelect
                      onChange={(event) => {
                        setMove3(event.target.value)
                        setMove1(selectedPokemon.data.move1)
                        setMove2(selectedPokemon.data.move2)
                        setMove4(selectedPokemon.data.move4)
                        setUpdatedPokemon(selectedPokemon.id)

                        selectedPokemon.data.move3 === event.target.value
                          ? setDisplaySave(false)
                          : setDisplaySave(true)
                      }}
                      defaultValue={selectedPokemon.data.move3}
                      inputProps={{
                        name: "age",
                        id: "filled-age-native-simple",
                      }}
                    >
                      {!movesLoading &&
                        movesdb[selectedPokemon.id].map((move) => (
                          <option value={move}>
                            {movesData[move]["identifier"]}
                          </option>
                        ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item sm={6} className={classes.move}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">
                      Move 4
                    </InputLabel>
                    <NativeSelect
                      onChange={(event) => {
                        setMove4(event.target.value)
                        setMove1(selectedPokemon.data.move1)
                        setMove3(selectedPokemon.data.move3)
                        setMove2(selectedPokemon.data.move2)
                        setUpdatedPokemon(selectedPokemon.id)

                        selectedPokemon.data.move4 === event.target.value
                          ? setDisplaySave(false)
                          : setDisplaySave(true)
                      }}
                      defaultValue={selectedPokemon.data.move4}
                      inputProps={{
                        name: "age",
                        id: "filled-age-native-simple",
                      }}
                    >
                      {!movesLoading &&
                        movesdb[selectedPokemon.id].map((move) => (
                          <option value={move}>
                            {movesData[move]["identifier"]}
                          </option>
                        ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <DialogActions>
            {displaySave ? (
              <Button
                onClick={() =>
                  handleSave(move1, move2, move3, move4, updatedPokemon)
                }
                color="primary"
                variant="filled"
              >
                Save
              </Button>
            ) : (
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      ) : null}
      {updating && <LinearProgress />}
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="info">
          Moves Updated Successfully !
        </Alert>
      </Snackbar>
    </Dialog>
  )
}
