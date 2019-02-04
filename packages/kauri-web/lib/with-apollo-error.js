import React from "react";
import styled from "styled-components";
import { branch, renderComponent } from "recompose";
import { connect } from "react-redux";
import theme from "./theme-config";
import { setNavcolorOverrideAction } from "./Module";

const Message = styled.h4`
  display: block;
  text-align: center;
  width: 100%;
  color: red;
`;

export class ErrorMessage extends React.Component<Props> {
  componentDidMount () {
    this.props.setNavcolorOverrideAction(theme.colors.bgPrimary);
  }

  componentWillUnmount () {
    this.props.setNavcolorOverrideAction(null);
  }

  render () {
    const {
      data: {
        error: { message },
      },
    } = this.props;
    return process.env.NODE_ENV === "production" ? (
      <Message>Something went wrong.</Message>
    ) : (
      <Message>{message}</Message>
    );
  }
}

const ConnectedErrorMessage = connect(
  () => ({}),
  { setNavcolorOverrideAction }
)(ErrorMessage);

export default (component = ConnectedErrorMessage, propName = "data") =>
  branch(
    props => props[propName] && props[propName].error,
    renderComponent(component)
  );
