import * as React from "react";

export interface IToggleState {
  toggledOn: boolean;
}

export type ToggleActionType = "show" | "hide" | "toggle";

export interface IToggleAction {
  type: ToggleActionType;
}

export const toggleInitialState: IToggleState = { toggledOn: false };

export function toggleReducer(state: IToggleState, action: IToggleAction) {
  switch (action.type) {
    case "show":
      return { toggledOn: true };
    case "hide":
      return { toggledOn: false };
    case "toggle":
      return { toggledOn: !state.toggledOn };
    default:
      throw new Error("Invalid useToggle action type dispatched");
  }
}

export const showDispatch = (dispatch: React.Dispatch<IToggleAction>) => () =>
  dispatch({ type: "show" });

export const hideDispatch = (dispatch: React.Dispatch<IToggleAction>) => () =>
  dispatch({ type: "hide" });

export const toggleDispatch = (dispatch: React.Dispatch<IToggleAction>) => () =>
  dispatch({ type: "toggle" });

/*
  const [{ toggledOn }, dispatch] = React.useReducer<
    IToggleState,
    IToggleAction
  >(toggleReducer, toggleInitialState);

  onClick={toggleDispatch(dispatch)} === onClick={() => dispatch({ type: 'toggle })}
*/
