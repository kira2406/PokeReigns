import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import { LinearProgress } from "@material-ui/core"

class HealthBar extends Component {
  render() {
    const { classes } = this.props
    return (
      <LinearProgress
        {...this.props}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    )
  }
}

const styles = (props) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#C0392B",
  },
  barColorPrimary: {
    backgroundColor: "#C0392B",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#C0392B",
  },
})

export default withStyles(styles)(HealthBar)
