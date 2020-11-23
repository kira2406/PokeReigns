import { createMuiTheme, colors } from "@material-ui/core"
import shadows from "./shadows"
import typography from "./typography"

const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.indigo[500],
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
})
const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#212121",
      // default: colors.common.white,
      paper: "#212121",
    },
    primary: {
      main: colors.blue[700],
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: colors.common.white,
      secondary: colors.grey,
    },
  },
  shadows,
  typography,
})

export { lightTheme, darkTheme }
