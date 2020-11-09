import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Starter from "./components/Starter";
import { useStateValue } from "./components/StateProvider";

function App() {
  const [{ user, isNew }, dispatch] = useStateValue();
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : isNew ? (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/">
                <Starter />
              </Route>
            </Switch>
          </Router>
        </div>
      ) : (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/">
                <Starter />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
