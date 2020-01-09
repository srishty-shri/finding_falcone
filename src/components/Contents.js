import React from "react";
import PlanetsAndVehicles from './PlanetAndVehicle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class MainContents extends React.Component {
  constructor(props) {
    super(props);
    this.totalDestinations = 4;
    this.planets = [];
    this.vehicleStore = [];
    this.vehicles = [];
    this.selPlanet = {};
    this.selVehicle = {};
    this.state = {
        vehicleApiCalled : false,
        planetApiCalled : false,
        timeTaken : 0,
        response : null,
      };
    this.handleTimeTakenChange = this.handleTimeTakenChange.bind(this);
    this.findFalcone = this.findFalcone.bind(this);
    this.emptyResponse = this.emptyResponse.bind(this);
  }
  findFalcone() {
    var planet_names = [];
    Object.keys(this.selPlanet).forEach(index => {
      planet_names.push(this.selPlanet[index]);
    }); 
    var vehicle_names = [];
    Object.keys(this.selVehicle).forEach(index => {
      vehicle_names.push(this.selVehicle[index]);
    }); 
    fetch('https://findfalcone.herokuapp.com/token', {
      method : 'POST',
      headers : {
        'Accept' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      fetch('https://findfalcone.herokuapp.com/find',{
        method : 'POST',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          token : response.token,
          planet_names,
          vehicle_names
        })
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          response,
          timeTaken : 0,
        });
        this.selPlanet = {};
        this.selVehicle = {};
      })
    })
  }
  emptyResponse() {
    this.vehicles =JSON.parse(JSON.stringify(this.vehicleStore));
    this.setState({
      response : null,
    });
  }
  handleTimeTakenChange(timeTaken) {
    this.setState(prevState => ({
      timeTaken : prevState.timeTaken + timeTaken
    }));
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  componentDidMount() {
    fetch("https://findfalcone.herokuapp.com/planets")
      .then(res => {
        return res.json();
      })
      .then(planets => {
        this.planets = planets;
        this.setState({ 
          planetApiCalled : true
        });
      });
    fetch('https://findfalcone.herokuapp.com/vehicles')
      .then(res => (res.json()))
      .then(vehicles => {
        this.vehicleStore = JSON.parse(JSON.stringify(vehicles));
        this.vehicles = JSON.parse(JSON.stringify(vehicles));
          this.setState({
            vehicleApiCalled : true
          });
      });
  }
  makePlanetAndVehicleComponent() {
    let planetVehicleComponentId = 1;
    const planetAndVehicle = [];
    for(let i = 0; i < this.totalDestinations ; i++) {
        planetAndVehicle.push(<PlanetsAndVehicles initPV={this} planetVehicleComponentId={planetVehicleComponentId++}/>);
    }
    return planetAndVehicle;
  }
  render() {
    if(this.state.response) {
      if(this.state.response.status === "false") {
        return <div>Sorry, Please Try Again!
          <Button onClick={this.emptyResponse} variant="contained" color="primary">Try Again!</Button>
        </div>;
      } else if(this.state.response.status === "success") {
          return <div>
            <div>Congratulations, planet name : {this.state.response.planet_name}</div>
            <Button onClick={this.emptyResponse} variant="contained" color="primary">Try Again!</Button>
          </div>
      } else if(!this.state.response.error){
          return <div>{this.state.response.error}</div>;
      }
    } else if(this.state.planetApiCalled && this.state.vehicleApiCalled) {
      return (
        <div>
            <Grid container spacing={3} justify="center">
              {this.makePlanetAndVehicleComponent.bind(this).call()}
              <Grid item xs={2}>
                <div>
                  Time Taken : {this.state.timeTaken}
                </div>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={this.findFalcone} variant="contained" color="primary" disabled={Object.keys(this.selVehicle).length === 4 ? false : true}>Find Falcone!</Button>
              </Grid>
          </Grid>
        </div>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}

export default MainContents;
