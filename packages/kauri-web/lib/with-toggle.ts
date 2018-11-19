import * as React from "react";
import { compose, withState, withHandlers } from "recompose";

export interface IToggleProps {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  toggledOn: boolean;
}

type ToggleFunc = (current: boolean) => boolean;

interface IOutterProps {
  show: (toggle: boolean) => React.MouseEvent<HTMLElement>;
  hide: (toggle: boolean) => React.MouseEvent<HTMLElement>;
  toggle: (toggle: boolean | ToggleFunc) => React.MouseEvent<HTMLElement>;
}

interface IHandlerProps {
  show: (toggle: boolean) => React.MouseEvent<HTMLElement>;
  hide: (toggle: boolean) => React.MouseEvent<HTMLElement>;
  toggle: (
    toggle: (current: boolean) => boolean
  ) => React.MouseEvent<HTMLElement>;
}

const withToggle = compose(
  withState("toggledOn", "toggle", false),
  withHandlers<IOutterProps, IHandlerProps>({
    hide: ({ toggle }) => () => toggle(false),
    show: ({ toggle }) => () => toggle(true),
    toggle: ({ toggle }) => () => toggle((current: boolean) => !current),
  })
);

export default withToggle;
