import React from "react"
import db from "./firebase"

export function getData(currentUser) {
  return db.collection("users").doc(currentUser.uid).get()
}
