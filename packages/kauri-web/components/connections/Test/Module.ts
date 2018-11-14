import { Epic } from 'redux-observable'
import createReducer from '../../../lib/createReducer'
import { showNotificationAction } from '../../../lib/Module'
import { Observable } from 'rxjs/Observable'

interface Action {
  type: string
}

interface CloseModalAction extends Action {
  type: 'CLOSE_MODAL'
}

const CLOSE_MODAL = 'CLOSE_MODAL'

export const closeModalAction = (): CloseModalAction => ({
  type: CLOSE_MODAL,
})

type State = {
  isModalOpen: boolean
}
const initialState: State = {
  isModalOpen: false,
}

const handlers = {
  [CLOSE_MODAL]: (state: State, _action: Action) => ({ ...state, isModalOpen: false }),
}

export default createReducer(initialState, handlers)

export const myEpic: Epic<CloseModalAction, {}> = (action$, _store) =>
  action$
    .ofType(CLOSE_MODAL)
    .switchMap(() =>
      Observable.of(showNotificationAction({ notificationType: 'success', message: 'lol', description: 'lol' }))
    )
