import { Button } from "@material-ui/core"
import React, { Component } from "react"
import "./Login.css"
import db, { auth, provider } from "./firebase"
import { actionTypes } from "./reducer"
import { useStateValue } from "./StateProvider"
import { Redirect } from "react-router-dom"

function Login() {
  const [{}, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((result) => {
            dispatch({
              type: actionTypes.SET_USER,
              user: auth.currentUser,
              isNew: !result.exists ? true : false,
            })
            console.log(result)
            return <Redirect to="/" />
          })
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
