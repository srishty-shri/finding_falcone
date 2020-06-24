import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { PlanetVehicleContext } from "../App";

export default function PVComp({id, selPVList, setSelPVList}) {
  const { planetsInfo, vehiclesInfo, selectOrRemoveVehicle, selectorRemovePlanet, updateTotalTime } = React.useContext(PlanetVehicleContext);
  /**
   * We check for an already existing entry for a particular planet vehicle pair,
   */
  const pvObj = selPVList.find(pv => pv.id === id);
  /**
   * pvObj exists then we update the pvObj
   * if selected planet is removed then update total time
   * else we insert a new object into selPVList
   */
  const handlePlanetChange = (e,selPlanet) => {
    selPlanet && selectorRemovePlanet(selPlanet.name, true);
    if(pvObj) {
      selectorRemovePlanet(pvObj.planet.name, false);
      selPlanet && (pvObj.planet = selPlanet);
      if(!selPlanet) {
        selPVList = selPVList.filter(pv => pv.id !== id);
        removePrevVehicleAndUpdateTime(pvObj,selectOrRemoveVehicle,updateTotalTime);
      }
    } else {
      selPVList.push({planet : selPlanet, vehicle : null, id})
    }
    setSelPVList(selPVList);
  };
  /**
   * Update time and pvObj according to new vehicle selected.
   * We would always have pvObj in this case beacuse we only show th vehicle list once the planet is selected
   */
  const handleVehicleSelect = e => {
    const selVehicleObj = vehiclesInfo.find(v => v.name === e.target.value);
    selectOrRemoveVehicle(selVehicleObj.name, true);
    updateTotalTime(pvObj.planet.distance/selVehicleObj.speed);
    removePrevVehicleAndUpdateTime(pvObj,selectOrRemoveVehicle,updateTotalTime);
    pvObj.vehicle = selVehicleObj;
    setSelPVList(selPVList);
  }
  return (
    <div className="planetDiv">
      <Autocomplete
        id={`planet-${id}`}
        options={planetsInfo.filter(p => p.selected !== true)}
        getOptionLabel={option => option["name"]}
        onChange={handlePlanetChange}
        style={{width : 200}}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Destination ${id}`}
            variant="outlined"
            fullWidth
          />
        )}
      />
    <RadioGroup onChange={handleVehicleSelect}>
      {pvObj && pvObj.planet ? vehiclesInfo.map(vehicle => (
      <FormControlLabel
        value={vehicle.name}
        control={<Radio />}
        label={`${vehicle.name}(${vehicle.total_no})`}
        disabled={
          vehicle.total_no <= 0 || pvObj.planet.distance > vehicle.max_distance ? true : false
        }
      />
    )) : []}
    </RadioGroup>
    </div>
  );
}

function removePrevVehicleAndUpdateTime(pvObj, selectorRemoveVehicle, updateTotalTime) {
  pvObj.vehicle && selectorRemoveVehicle(pvObj.vehicle.name, false);
  pvObj.vehicle && updateTotalTime(-1 * pvObj.planet.distance/pvObj.vehicle.speed);
}
