import { Button } from "@material-ui/core"
import React, { Component } from "react"
import "./Login.css"
import db, { auth, provider } from "./firebase"
import { useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"

function Login() {
  const { login, currentUser } = useAuth()
  const history = useHistory()
  function loginHandler() {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result.user)
      // history.push("/starter")
    })
  }
  // const signIn = () => {
  //   auth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       db.collection("users")
  //         .doc(auth.currentUser.uid)
  //         .get()
  //         .then((result) => {
  //           dispatch({
  //             type: actionTypes.SET_USER,
  //             user: auth.currentUser,
  //             isNew: !result.exists ? true : false,
  //           })
  //           console.log(result)
  //           return <Redirect to="/home" />
  //         })
  //     })
  //     .catch((e) => console.log(e.message))
  // }
  return (
    <div className="container">
      <div className="display-section">{currentUser && currentUser.email}</div>
      <div className="login-section">
        <h2>Login</h2>
        <Button onClick={loginHandler}>Login with Google</Button>
      </div>
    </div>
  )
}

export default Login
