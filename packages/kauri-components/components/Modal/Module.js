// @flow

const CLOSE_MODAL = 'CLOSE_MODAL'

type CloseModalAction = () => {
  type: 'CLOSE_MODAL'
}

export const closeModalAction: CloseModalAction = () => ({
  type: CLOSE_MODAL,
})
