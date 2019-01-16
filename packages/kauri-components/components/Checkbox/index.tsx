import * as React from "react";
import styled from "../../lib/styled-components";

const Styled = styled<{ disabled: boolean }, "div">("div")`
  display: flex;
  cursor: ${props => props.disabled && "not-allowed"};
  > input {
    opacity: 0;
  }
  > input + label {
    position: relative;
    padding-left: 25px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    color: white;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 700;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 17px;
      height: 17px;
      border: 1px solid ${props => props.theme.primaryColor};
      background: transparent;
      border-radius: 4px;
    }
    &:after {
      content: "✓";
      position: absolute;
      top: -4px;
      left: 1px;
      font-size: 16px;
      color: white;
      transition: all 0.2s;
    }
  }
  > input:not(:checked) + label {
    &:after {
      opacity: 0;
      transform: scale(0);
    }
  }
  > input:disabled:not(:checked) + label {
    &:before {
      background-color: transparent;
    }
  }
  > input:disabled:checked + label {
    &:after {
      opacity: 0.3;
    }
  }
  > input:disabled + label {
    opacity: 0.3;
  }
  > input:checked + label {
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
  > input:checked:focus + label,
  input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
      border-radius: 4px;
    }
  }
`;

interface IProps {
  checked: boolean;
  disabled: boolean;
  onChange: (payload: any) => void;
  label: string;
}

const Component: React.SFC<IProps> = props => (
  <Styled
    disabled={props.disabled}
    onClick={() => !props.disabled && props.onChange(!props.checked)}
  >
    <input disabled={props.disabled} type="checkbox" checked={props.checked} />
    <label>{props.label}</label>
  </Styled>
);

export default Component;
