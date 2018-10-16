// @flow
import React, {Component} from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton';
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton';
import EditProfile from '../EditProfile';

import type { HeaderState, HeaderProps } from './types';

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
    handleSubmit() {
        this.login.getWrappedInstance().getWrappedInstance().saveUser();
        this.props.toggleEditing();
    }
  render () {
    return (
      <HeaderContainer>
        <EditProfile ref={ comp => this.login = comp} />
        <ActionsContainer>
          <TertiaryButton onClick={() => this.props.toggleEditing()}>Discard</TertiaryButton>
          <PrimaryButton onClick={() => this.handleSubmit()}>Save Changes</PrimaryButton>
        </ActionsContainer>
      </HeaderContainer>
    );
  }
};

export default EditableHeader;