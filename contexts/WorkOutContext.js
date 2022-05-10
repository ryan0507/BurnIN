/* eslint-disable */
import React, {createContext, useReducer, useEffect} from 'react';
import axios from 'axios';

const initialState = {
  distance: '', // float
  time: '', // int(sec)
  calories: '', // int
  averagePace: '', // int(sec)
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
        distance: action.payload.distacne,
        time: action.payload.time,
        calories: action.payload.calories,
        averagePace: action.payload.averagePace,
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

  useEffect(() => {
    console.log(state);
  }, [state]);

  const sendRecord = async () => {
    try {
      console.log(state);
      const res = await axios.post('url', state);
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
