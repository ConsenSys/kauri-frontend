// @flow
const { compose, withState, withHandlers } = require('recompose')

export type ToggleProps = {
  show: () => void,
  hide: () => void,
  toggle: () => void,
  toggledOn: boolean,
}

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current),
  })
)

export default withToggle
