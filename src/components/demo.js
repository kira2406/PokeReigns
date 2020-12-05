import React from "react"
import PropTypes from "prop-types"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"

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
  },
}))

export default function Demo() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Grid cell 2, 1</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Grid cell 2, 1</Paper>
        </Grid>
      </Grid>
    </div>
  )
}
