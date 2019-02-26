// @flow
import React, { Component } from "react";
import styled from "styled-components";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import EditProfile from "../../common/EditProfile";
import Helmet from "react-helmet";

import type { HeaderState, HeaderProps } from "./types";

const HeaderContainer = styled.div`
  background-color: ${props => props.theme.colors.bgPrimary};
  display: flex;
  align-items: flex-start;
  color: ${props => props.theme.colors.white};
  padding: 2.5em ${props => props.theme.padding};
`;

const ActionsContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
`;

class EditableHeader extends Component<HeaderProps, HeaderState> {
  componentDidMount() {
    this.props.router &&
      this.props.router.events.on("routeChangeStart", this.props.toggleEditing);
  }

  componentWillUnmount() {
    this.props.router &&
      this.props.router.events.off(
        "routeChangeStart",
        this.props.toggleEditing
      );
  }

  handleSubmit() {
    this.login
      .getWrappedInstance()
      .getWrappedInstance()
      .saveUser(undefined, this.props.toggleEditing);
  }

  render() {
    return (
      <HeaderContainer>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://transloadit.edgly.net/releases/uppy/v0.24.3/dist/uppy.min.css"
          />
        </Helmet>
        <EditProfile ref={comp => (this.login = comp)} />
        <ActionsContainer>
          <TertiaryButton onClick={() => this.props.toggleEditing()}>
            Discard
          </TertiaryButton>
          <PrimaryButton onClick={() => this.handleSubmit()}>
            Save Changes
          </PrimaryButton>
        </ActionsContainer>
      </HeaderContainer>
    );
  }
}

export default EditableHeader;
