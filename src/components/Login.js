import { Button } from "@material-ui/core"
import React, { Component } from "react"
import "./Login.css"
import { auth, provider } from "./firebase"
import { actionTypes } from "./reducer"
import { useStateValue } from "./StateProvider"

function Login() {
  const [{}, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
        console.log(result)
      })
      .catch((e) => console.log(e.message))
  }
  return (
    <div class="container">
      <div class="display-section"></div>
      <div class="login-section">
        <h2>Login</h2>
        <Button onClick={signIn}>Login with Google</Button>
      </div>
    </div>
  )
}

export default Login
