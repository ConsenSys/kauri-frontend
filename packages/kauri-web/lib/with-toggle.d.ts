import { compose, withState, withHandlers } from "recompose";

export interface IToggleProps {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  toggledOn: boolean;
}

const withToggle = compose(
  withState("toggledOn", "toggle", false),
  withHandlers({
    show: ({ toggle }) => e => toggle(true),
    hide: ({ toggle }) => e => toggle(false),
    toggle: ({ toggle }) => e => toggle(current => !current),
  })
);

export default withToggle;
