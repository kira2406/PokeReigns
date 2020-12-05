import { createStyles, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        backgroundColor: "#222",
      },
      body: {
        padding: 0,
        margin: 0,
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        padding: 0,
        margin: 0,
      },
    },
  })
)

const GlobalStyles = () => {
  useStyles()

  return null
}

export default GlobalStyles
