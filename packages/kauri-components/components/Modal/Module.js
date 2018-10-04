// @flow
import * as React from 'react'
import createReducer from '../../../kauri-web/lib/createReducer'

type CloseModalAction = () => {
  type: 'CLOSE_MODAL'
}

type OpenModalPayload = {
  children: React.Node
}

type OpenModalAction = OpenModalPayload => {
  type: 'OPEN_MODAL',
  payload: OpenModalPayload
}

const CLOSE_MODAL = 'CLOSE_MODAL'
const OPEN_MODAL = 'OPEN_MODAL'

export const closeModalAction: CloseModalAction = () => ({
  type: CLOSE_MODAL,
})

export const openModalAction: OpenModalAction = (payload: OpenModalPayload) => ({
  type: OPEN_MODAL,
  payload,
})

type State = {
  isModalOpen: boolean,
  children: ?React.Node
}
const initialState: State = {
  isModalOpen: false,
  children: undefined,
}

type Action = CloseModalAction | OpenModalAction

const handlers = {
  [CLOSE_MODAL]: (state: State, action: Action) => ({ ...state, isModalOpen: false }),
  [OPEN_MODAL]: (state: State, action: Action) => ({ ...state, isModalOpen: true, children: action.payload.children }),
}

export default createReducer(initialState, handlers)
