// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import Email from "./Email";
import Logo from "./Logo";
import ConsenSys from "./ConsenSys";

const NewFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-auto-columns: auto;
  width: 100%;
  background-color: ${props => props.theme.primaryTextColor};
  padding: 0px ${props => props.theme.padding};

  @media (max-width: 500px) {
    display: none;
  }
`;

class StyledFooter extends React.Component<{}> {
  render() {
    return (
      <Fragment>
        <NewFooter>
          <Email />
          <Logo />
          <ConsenSys />
        </NewFooter>
      </Fragment>
    );
  }
}

export default StyledFooter;
