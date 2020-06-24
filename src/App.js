import React from "react";
import Navbar from "./components/TopNavigation";
import DashBoardPage from "./pages/DashBoardPage";
import pvReducer from "./reducers/pvReducer";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { ADD_V, ADD_P, SELECT_REMOVE_V, SELECT_REMOVE_P, UPDATE_TIME} from "./actions/pvActions";

export const PlanetVehicleContext = React.createContext();

export default function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact render= {(props) =>  <PVProvider key={Date.now()} {...props}><DashBoardPage/></PVProvider>} />
          <Route><Redirect to="/"></Redirect></Route>
        </Switch>
    </Router>
  );
}

/**
 * Setting a parent provider context 
 */
function PVProvider({ children }) {
  const initState = {
    planetsInfo: [],
    vehiclesInfo: [],
    totalTimeTaken: 0,
  };
  const [state, dispatcher] = React.useReducer(pvReducer, initState);
  const initAllVehicles = totalVehicles => dispatcher({ type: ADD_V, totalVehicles });
  const initAllPlanets = totalPlanets => dispatcher({ type: ADD_P, totalPlanets });
  const selectOrRemoveVehicle = (vname, sel) => dispatcher({ type: SELECT_REMOVE_V, vname, sel });
  const selectorRemovePlanet = (pname, sel) => dispatcher({ type: SELECT_REMOVE_P, pname, sel });
  const updateTotalTime = time => dispatcher({type : UPDATE_TIME, time});
  const value = {
    totalTimeTaken: state.totalTimeTaken,
    planetsInfo : state.planetsInfo,
    vehiclesInfo : state.vehiclesInfo,
    updateTotalTime,
    selectOrRemoveVehicle,
    selectorRemovePlanet,
    initAllVehicles,
    initAllPlanets,
  };
  return (
    <PlanetVehicleContext.Provider value={value}>
      {children}
    </PlanetVehicleContext.Provider>
  );
}

