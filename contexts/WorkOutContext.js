/* eslint-disable */
import React, {createContext, useReducer} from 'react';
import axios from 'axios';
import loginStorages from '../storages/loginStorages';

const initialState = {
  distance: '', // float
  time: '', // int(sec)
  calories: '', // int
  paces: [], // int(sec) arr
  locations: [], // obj arr
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        locations: state.locations.concat(action.payload),
      };
    case 'UPDATE_PACE':
      return {
        ...state,
        paces: state.paces.concat(action.payload),
      };
    case 'UPDATE_RECORD':
      return {
        ...state,
        distance: action.payload.distance,
        time: action.payload.time,
        calories: action.payload.calories,
      };
    case 'CLEAR_WORKOUT':
      return initialState;
    default:
      return state;
  }
}
const WorkOutContext = createContext();
export function WorkOutContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {paces, locations} = state;

  const sendRecord = async () => {
    try {
      const token = await loginStorages.get();
      const {distance, time, calories, paces} = state;
      const data = {
        distance: distance.toFixed(2),
        time,
        calories,
        pace_1: paces[0] || 0,
        pace_2: paces[1] || 0,
        pace_3: paces[2] || 0,
      };
      const options = {
        headers: {Authorization: `Token ${token}`},
      };

      const res = await axios.post(
        'http://34.67.158.106:5000/race-finish',
        data,
        options,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WorkOutContext.Provider
      value={{
        dispatch,
        paces,
        locations,
        sendRecord,
      }}>
      {children}
    </WorkOutContext.Provider>
  );
}

export default WorkOutContext;
