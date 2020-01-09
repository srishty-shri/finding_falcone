import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function Vehicle(props) {
  const handleChange = event => {
    props.handleVehicleChange(event.target.value);
  };
  const listOfVehicles = props.listOfVehicles.map(vehicle => (
    <FormControlLabel
      value={vehicle.name}
      control={<Radio />}
      label={`${vehicle.name}(${vehicle.total_no})`}
      disabled={
        vehicle.total_no <= 0 || props.selPlanet.distance > vehicle.max_distance
          ? true
          : false
      }
    />
  ));

  return (
    <RadioGroup aria-label="gender" name="gender1" onChange={handleChange}>
      {listOfVehicles}
    </RadioGroup>
  );
}
