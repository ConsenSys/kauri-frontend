import * as React from "react";

interface ICloseModalAction {
  type: "CLOSE_MODAL";
}

interface IOpenModalPayload {
  children: React.ReactElement<any>;
}

interface IOpenModalAction {
  type: "OPEN_MODAL";
  payload: IOpenModalPayload;
}

export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_MODAL = "OPEN_MODAL";

export const closeModalAction = (): ICloseModalAction => ({
  type: CLOSE_MODAL,
});

export const openModalAction = (
  payload: IOpenModalPayload
): IOpenModalAction => ({
  payload,
  type: OPEN_MODAL,
});

interface IState {
  isModalOpen: boolean;
  children: React.ReactElement<any> | undefined;
}

const initialState: IState = {
  children: undefined,
  isModalOpen: false,
};

type Action = ICloseModalAction | IOpenModalAction;

export default (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case OPEN_MODAL:
      return { ...state, isModalOpen: true, children: action.payload.children };
    default:
      return state;
  }
};
