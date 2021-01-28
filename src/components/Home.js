import {
  AppBar,
  Avatar,
  Button,
  Card,
  Divider,
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
    height: "100vh",
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
  profileNo: {
    fontSize: 30,
    color: "#0078FF ",
  },
  profileAvatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  profileName: {
    textTransform: "capitalize",
    fontSize: 50,
    color: "#0078FF ",
    alignSelf: "flex-start",
  },
  dataPad: {
    paddingTop: 20,
  },
}))
export default function Home() {
  const classes = useStyles()
  const {
    logout,
    trainerName,
    setTrainer,
    trainerID,
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
  const [rpokemons, setRpokemons] = useState(0)
  // const classes = useStyles()
  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("pokemons")
      .onSnapshot((res) => setRpokemons(res.size))
  }, [])
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
            <Grid container direction={"column"}>
              <Grid item>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item sm={4} className={classes.profileAvatar}>
                      <Avatar
                        alt="Kushwanth"
                        src="/assets/question.gif"
                        className={classes.avatar}
                      />
                    </Grid>
                    <Divider light />
                    <Grid item sm={8}>
                      <Grid container direction={"column"}>
                        <Grid item className={classes.profileName}>
                          {trainerName ? trainerName : "LOADING"}
                        </Grid>
                        <Grid item>
                          Trainer ID:
                          {trainerID}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item className={classes.dataPad}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item sm={6}>
                      <Grid container direction={"column"}>
                        <Grid item className={classes.profileNo}>
                          {roster ? roster.length + rpokemons : "LOADING"}
                        </Grid>
                        <Grid item>Pokemons</Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={6}>
                      <Grid container direction={"column"}>
                        <Grid item className={classes.profileNo}>
                          {numBadges != null ? numBadges : "Loading"}
                        </Grid>
                        <Grid item>Badges</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
