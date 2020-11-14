import { Button } from "@material-ui/core"
import React, { Component } from "react"
import "./Login.css"
import { auth, provider } from "./firebase"
import { actionTypes } from "./reducer"
import { useStateValue } from "./StateProvider"
import { Redirect } from "react-router-dom"

function Login() {
  const [{}, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
          isNew: result.additionalUserInfo.isNewUser,
        })
        console.log(result)
      })
      .catch((e) => console.log(e.message))
  }
  return (
    <div className="container">
      <div className="display-section"></div>
      <div className="login-section">
        <h2>Login</h2>
        <Button onClick={signIn}>Login with Google</Button>
      </div>
    </div>
  )
}

export default Login
