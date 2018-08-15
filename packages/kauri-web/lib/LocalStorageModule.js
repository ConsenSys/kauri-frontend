// @flow
import { Observable } from 'rxjs'
import createReducer from './createReducer'
import approvalSteps from './DriverSteps/approvals'

import type { Dependencies } from './Module'

export type DriverStep = {
  element: string,
  popover: {
    title: string,
    description?: string,
    position: 'top' | 'left' | 'bottom' | 'right',
    closeBtnText: string,
    nextBtnText: string,
    prevBtnText: string,
  },
}

type StepPage = 'approvals'

type StartDriverStepsPayload = { page: StepPage }
type FinishedDriverStepsPayload = StartDriverStepsPayload
type SetFinishedDriverStepsPayload = StartDriverStepsPayload

type StartDriverStepsAction = {
  type: string,
  payload: StartDriverStepsPayload,
}

type FinishedDriverStepsAction = {
  type: string,
  payload: FinishedDriverStepsPayload,
}

type PersistStateToLocalStorageAction = {
  type: string,
}

type SetFinishedDriverStepsAction = {
  type: string,
  payload: SetFinishedDriverStepsPayload,
}

type Action = SetFinishedDriverStepsAction

type DriverJSState = {
  [key: StepPage]: boolean,
}
type State = {
  driverJS: DriverJSState,
}

const START_DRIVER_STEPS = 'START_DRIVER_STEPS'
const PERSIST_TO_LOCALSTORAGE = 'PERSIST_TO_LOCALSTORAGE'
const FINISHED_DRIVER_STEPS = 'FINISHED_DRIVER_STEPS'
const SET_FINISHED_DRIVER_STEPS = 'SET_FINISHED_DRIVER_STEPS'

export const startDriverStepsAction = (payload: StartDriverStepsPayload): StartDriverStepsAction => ({
  type: START_DRIVER_STEPS,
  payload,
})

export const finishedDriverStepsAction = (payload: FinishedDriverStepsPayload): FinishedDriverStepsAction => ({
  type: FINISHED_DRIVER_STEPS,
  payload,
})

export const setFinishedDriverStepsAction = (payload: SetFinishedDriverStepsPayload): SetFinishedDriverStepsAction => ({
  type: SET_FINISHED_DRIVER_STEPS,
  payload,
})

export const persistStateToLocalStorageAction = (): PersistStateToLocalStorageAction => ({
  type: PERSIST_TO_LOCALSTORAGE,
})

const stepTypes = {
  approvals: approvalSteps,
}

const startDriverSteps = (getState: any, driverJS: any) => ({ payload: { page } }: StartDriverStepsAction) => {
  driverJS.defineSteps(stepTypes[page])
  const state = getState()
  const driverStepPage = state.localStorage.driverJS[page]
  // driverJS.highlight(stepTypes[page][0])

  if (!driverStepPage) {
    driverJS.start()
    return false
  }
  return true
}

const persistStateToLocalStorage = (getState: any) => ({ payload }: { payload: any }) => {
  const state = getState()
  window.localStorage.setItem('redux', JSON.stringify({ localStorage: state.localStorage }))
}

export const startDriverStepsEpic = (
  action$: Observable<StartDriverStepsAction>,
  { getState }: any,
  { driverJS }: Dependencies
) =>
  action$.ofType(START_DRIVER_STEPS).mergeMap(action =>
    Observable.of(action)
      .map(startDriverSteps(getState, driverJS))
      .map(
        skip =>
          skip
            ? { type: 'SKIPPED_DRIVER_STEPS', payload: { page: action.payload.page } }
            : finishedDriverStepsAction({ page: 'approvals' })
      )
  )

export const persistStateToLocalStorageEpic = (
  action$: Observable<PersistStateToLocalStorageAction>,
  { getState }: any,
  { driverJS }: Dependencies
) =>
  action$
    .ofType(PERSIST_TO_LOCALSTORAGE)
    .do(persistStateToLocalStorage(getState))
    .ignoreElements()

export const finishedDriverStepsEpic = (
  action$: Observable<FinishedDriverStepsAction>,
  { getState }: any,
  { driverJS }: Dependencies
) =>
  action$
    .ofType(FINISHED_DRIVER_STEPS)
    .mergeMap(action =>
      Observable.of(setFinishedDriverStepsAction({ page: action.payload.page }), persistStateToLocalStorageAction())
    )

const initialState: State = {
  driverJS: {
    approvals: false,
  },
}

const handlers = {
  [SET_FINISHED_DRIVER_STEPS]: (state: State, action: Action) => {
    const newDriverJSState = {
      ...state.driverJS,
    }
    newDriverJSState[action.payload.page] = true
    return Object.assign({}, state, { driverJS: newDriverJSState })
  },
}

export default createReducer(initialState, handlers)
