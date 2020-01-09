import React from "react";
import Navbar from "./components/TopNavigation";
import Contents from './components/Contents';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function TotalApp(props) {
  return <div>
    <Navbar />
    <Contents {...props}/>
    </div>;
}

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" component={TotalApp} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
