import React from "react";
import PVComp from "../components/PVComp";
import Button from "@material-ui/core/Button";
import { PlanetVehicleContext } from "../App";
import {Link} from 'react-router-dom';

export default function DashBoardPage() {
  const { initAllVehicles, initAllPlanets, totalTimeTaken } = React.useContext(
    PlanetVehicleContext
  );
  /**
   * setSelPVList : array of objects of selected planet and vehicle set in format
   * { planet, vehicle, id}
   */
  const [selPVList, setSelPVList] = React.useState([]);
  const [result, setResult] = React.useState(null);
  //Do initial load of planets and vehicles
  const fetchInitData = () => {
    (async function () {
      let planetData = await fetch("https://findfalcone.herokuapp.com/planets");
      planetData = await planetData.json();
      let vehicleData = await fetch(
        "https://findfalcone.herokuapp.com/vehicles"
      );
      vehicleData = await vehicleData.json();
      initAllVehicles(vehicleData);
      initAllPlanets(planetData);
    })();
  }

  React.useEffect(fetchInitData, []);

  /**
   * Keep the selected planet and vehicle in separate arrays to be sent along with token for finding falcone
   */
  let totalPVSel = 0;
  let planet_names = [];
  let vehicle_names = [];
  selPVList.forEach((pv) => {
    pv.vehicle && totalPVSel++;
    pv.vehicle && vehicle_names.push(pv.vehicle.name);
    pv.planet && planet_names.push(pv.planet.name);
  });

  /**
   * Find Falcone to be called only when all 4 planets and evhicles are selected  
   */
  const handleFindFacone = async () => {
    const token = await getToken();
    let response = await fetch("https://findfalcone.herokuapp.com/find", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        planet_names,
        vehicle_names,
      }),
    });
    response = await response.json();
    setResult(response);
  };
  //Make 4 destination components id array
  const pvComp = [1, 2, 3, 4];
  /**
   * Either we are showing the result or the Find Falcone dashboard depnding upon the result state.
   */
  return result ? (
    <div className="flexDiv">
      {result.status === "success" ? (
        <div>
          <div>
            Success! Congratulations on finding Falcone. King Shan is mighty
            pleased
          </div>
          <div>Time taken : {totalTimeTaken}</div>
          <div>Planet found : {result.planet_name}</div>
          <div><Link to="/" className="customlink"><Button variant="contained" color="primary">START AGAIN</Button></Link></div>
          </div>
      ) : (
        <div>
        <div>Couldn't find the falcone!</div>
        <div><Link to="/" className="customlink"><Button variant="contained" color="primary">TRY AGAIN</Button></Link></div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <div className="flexDiv"><h3>Finding Falcone!</h3></div>
      <div className="flexDiv"><h4>Select planets you want to search in:</h4></div>
      <div className="flexDiv">
        {pvComp.map((id) => (
          <PVComp
            key={id}
            id={id}
            selPVList={selPVList}
            setSelPVList={setSelPVList}
          ></PVComp>
        ))}
      </div>
      <div className="flexDiv">
          Total Time : {totalTimeTaken}
        </div>
      <div className="flexDiv">
        <Button
          variant="contained"
          color="primary"
          onClick={handleFindFacone}
          disabled={totalPVSel === 4 ? false : true}
        >
          FIND FALCONE
        </Button>
      </div>
    </div>
  );
}

async function getToken() {
  let token = await fetch("https://findfalcone.herokuapp.com/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  token = await token.json();
  return token.token;
}
