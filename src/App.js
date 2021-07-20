import './App.css';
import Three from "./components/threejs/three";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home/home";
import Mathbox from "./components/mathbox/mathbox";

export default function App() {
  return (
      <div className="App">
          <Home />
          <Switch>
              <Route path={'/three'}>
                  <Three />
              </Route>
              <Route path={'/mathbox'}>
                  <Mathbox />
              </Route>
          </Switch>
      </div>
  );
}


