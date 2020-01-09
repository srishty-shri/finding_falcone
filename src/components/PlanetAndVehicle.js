import React from "react";
import Planet from "./Planet";
import Vehicle from './Vehicle';
import Grid from '@material-ui/core/Grid';

class PlanetsAndVehicles extends React.Component {
  constructor(props) {
    super(props);
    this.parentObj = props.initPV;
    this.index = props.planetVehicleComponentId;
    this.state = {
      selPlanet : null,
      selVehicle : ''
    };
    this.handlePlanetChange = this.handlePlanetChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
  }
  handlePlanetChange(val) {
    if(val) {
      this.setState({
        selPlanet : val
      });
      this.parentObj.selPlanet[this.index] = val.name;
    } else {
      this.parentObj.vehicles.forEach(element => {
        if(element.name === this.state.selVehicle) {
          element.total_no++;
        }
      });
      this.setState({
        selVehicle : '',
        selPlanet : null
      });
      delete this.parentObj.selPlanet[this.index];
      delete this.parentObj.selVehicle[this.index];
    }
  }
  handleVehicleChange(selVehicle) {
    this.setState({
      selVehicle
    });
    this.parentObj.selVehicle[this.index] = selVehicle;
    this.parentObj.vehicles.forEach((element,key) => { 
      if(element.name === selVehicle) {
          element.total_no--;
          this.parentObj.handleTimeTakenChange(element.max_distance/element.speed);
      } else if(element.name === this.state.selVehicle) {
          element.total_no++;
          this.parentObj.handleTimeTakenChange(-1 * (element.max_distance/element.speed))
      }
    });  
  }
  render() {
    var planetProps = {
      id: `planet-list-${this.props.planetVehicleComponentId}`,
      options: this.parentObj.planets,
      optionLabel: "name",
      label: `Destination ${this.props.planetVehicleComponentId}`,
      handlePlanetChange : this.handlePlanetChange
    };
    var vehicleProps = {
      listOfVehicles : this.parentObj.vehicles,
      selPlanet : this.state.selPlanet,
      handleVehicleChange : this.handleVehicleChange
    }
    return (
      <Grid item xs={2}>
        <Planet {...planetProps} />
        {
        !!this.state.selPlanet && 
        <Vehicle {...vehicleProps}/>
        }
      </Grid>
    );
  }
}

export default PlanetsAndVehicles;
