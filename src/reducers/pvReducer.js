import {
  ADD_V,
  ADD_P,
  SELECT_REMOVE_V,
  SELECT_REMOVE_P,
  UPDATE_TIME,
} from "../actions/pvActions";

const initAllVehicles = (state, totalVehicles) => ({
  ...state,
  vehiclesInfo: totalVehicles,
});

const initAllPlanets = (state, totalPlanets) => ({
  ...state,
  planetsInfo: totalPlanets,
});

const selectOrRemoveVehicle = (state, name, sel = true) => ({
  ...state,
  vehiclesInfo: state.vehiclesInfo.map(v => {
    v.name === name && (sel ? v.total_no-- : v.total_no++);
    return v;
  }),
});

const selectorRemovePlanet = (state, pname, sel = true) => ({
  ...state,
  planetsInfo: state.planetsInfo.map(p => {
    p.name === pname && (p.selected = sel);
    return p;
  }),
});

const updateTotalTime = (state, time) => ({
  ...state,
  totalTimeTaken: state.totalTimeTaken + time,
});

export default function pvReducer(state, action) {
  switch (action.type) {
    case ADD_V:
      return initAllVehicles(state, action.totalVehicles);
    case ADD_P:
      return initAllPlanets(state, action.totalPlanets);
    case SELECT_REMOVE_V:
      return selectOrRemoveVehicle(state, action.vname, action.sel);
    case SELECT_REMOVE_P:
      return selectorRemovePlanet(state, action.pname, action.sel);
    case UPDATE_TIME:
      return updateTotalTime(state, action.time);
    default:
      return { ...state };
  }
}
