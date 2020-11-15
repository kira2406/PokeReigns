import React from "react"
import Login from "./components/Login"
import "./App.css"
import { AuthProvider } from "./components/AuthContext"
function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  )
}

export default App
