/* eslint-disable */
import React, {createContext, useReducer, useEffect} from 'react';
import axios from 'axios';

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
    const {distance, time, calories, paces} = state;
    try {
      const data = {
        distance: distance.toFixed(2),
        time,
        calories,
        paces,
      };
      console.log(data);

      const res = await axios.post(
        'http://34.67.158.106:5000/race-finish',
        data,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getRaceRecord = async () => {
    try {
      const res = await axios.get('url');
    } catch (e) {
      console.log(e);
    }
  };

  const getAnalyticsRecord = async () => {
    try {
      const res = await axios.get('url');
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
        getRaceRecord,
        getAnalyticsRecord,
      }}>
      {children}
    </WorkOutContext.Provider>
  );
}

export default WorkOutContext;
