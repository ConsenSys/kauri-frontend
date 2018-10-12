// @flow
import React, {Component} from 'react';
import styled from 'styled-components';
import Input from '../../../../kauri-components/components/Input/Input';
import UploadLogoButton from '../../../../kauri-components/components/Button/UploadLogoButton';
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton';
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton';
import SocialWebsiteIcon from '../../../../kauri-components/components/PublicProfile/SocialWebsiteIcon.bs';
import TriggerImageUploader from '../../common/ImageUploader';
import R from 'ramda'

import type { HeaderState, HeaderProps } from './types';

const HeaderContainer = styled.div`
    background-color: ${props => props.theme.colors.bgPrimary};
    display: flex;
    align-items: flex-start;
    color: ${props => props.theme.colors.white};
    padding: 2.5em ${props => props.theme.padding};
`;

const InputsContainers = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: ${props => props.theme.space[2]}px;
    justify-content: space-between;
`;

const StyledInput = styled(Input)`
    margin-bottom: ${props => props.theme.space[1]}px;
`;

const ActionsContainer = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
`;

const StyledUpload = styled(UploadLogoButton)`
    margin-right: ${props => props.theme.space[1]}px;
`;

const Offset = styled.div`
    margin-left: -${props => props.theme.space[3]}px;
    display: flex;
    flex-direction: row;
    & > a {
        margin-right: ${props => props.theme.space[1]}px;
    }
`;

class EditableHeader extends Component<HeaderProps, HeaderState> {
  constructor (props: HeaderProps) {
    super(props);
    this.state = {
      username: props.username,
      title: props.title,
      avatar: props.avatar,
      website: props.website,
      twitter: props.social && props.social.twitter,
      github: props.social && props.social.github,
      name: props.name,
      email: props.email,
    }
  }

  saveUser () {
    const payload = R.filter(R.is(String), this.state)
    this.props.saveUserAction(payload);
    this.props.toggleEditing();
  }

  uploadImage () {
    TriggerImageUploader(() => {}, '', (file, url: string) => this.setState({ avatar: url }));
  }

  handleChange (param: string, value: string) {
    this.setState({
      [param]: value,
    });
  }

  render () {
    const { username, title, avatar, website, name, twitter, github, email } = this.state;

    return (
      <HeaderContainer>
        <StyledUpload bg={avatar} handleClick={() => this.uploadImage()} text='Profile' color='white' />
        <InputsContainers>
          <StyledInput onChange={e => this.handleChange('name', e.target.value)} fontWeight='normal' fontSize={6} value={name} placeHolder='Add your full name' />
          <StyledInput onChange={e => this.handleChange('title', e.target.value)} fontWeight='normal' fontSize={3} value={title} placeHolder='Add job title' />
          <StyledInput onChange={e => this.handleChange('email', e.target.value)} fontWeight='normal' fontSize={1} value={email} placeHolder='Add Email' />
          <StyledInput onChange={e => this.handleChange('username', e.target.value)} fontWeight='normal' fontSize={1} value={username} placeHolder='Add username' />
          <StyledInput onChange={e => this.handleChange('website', e.target.value)} fontWeight='normal' fontSize={1} value={website} placeHolder='Add Website' />
          <Offset>
            <SocialWebsiteIcon brand='twitter' />
            <StyledInput onChange={e => this.handleChange('twitter', e.target.value)} fontWeight='normal' fontSize={1} value={twitter} placeHolder='Twitter' />
          </Offset>
          <Offset>
            <SocialWebsiteIcon brand='github' />
            <StyledInput onChange={e => this.handleChange('github', e.target.value)} fontWeight='normal' fontSize={1} value={github} placeHolder='Github' />
          </Offset>
        </InputsContainers>
        <ActionsContainer>
          <TertiaryButton onClick={() => this.props.toggleEditing()}>Discard</TertiaryButton>
          <PrimaryButton onClick={() => this.saveUser()}>Save Changes</PrimaryButton>
        </ActionsContainer>
      </HeaderContainer>
    );
  }
};

export default EditableHeader;
