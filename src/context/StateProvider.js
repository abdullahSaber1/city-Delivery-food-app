import React, {createContext, useReducer, useContext} from 'react';

export const stateContext = createContext();

export const StateProvider = ({reducer, initalState, children}) => (
  <stateContext.Provider value={useReducer(reducer, initalState)}>
    {children}
  </stateContext.Provider>
);

// create custom Hook
export const useStateValue = () => useContext(stateContext);
