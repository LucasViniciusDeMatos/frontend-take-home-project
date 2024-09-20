import React, { createContext, useReducer, Dispatch, useContext } from "react";
import { reducer, initialState } from "src/reducers/reducer";
import { IState, IAction } from "src/interfaces/state";

const StateContext = createContext<{
  state: IState;
  dispatch: Dispatch<IAction>;
} | null>(null);

const StateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

export const useStateValues = () => {
  const value = useContext(StateContext);
  if (!value) {
    throw new Error("State is not connected");
  }
  return value;
};
