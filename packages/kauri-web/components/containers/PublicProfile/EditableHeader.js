//@flow
import React, {Component} from 'react';
import styled from 'styled-components';
import Input from '../../../../kauri-components/components/Input/Input';
import UploadLogoButton from '../../../../kauri-components/components/Button/UploadLogoButton';
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton';
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton';
import TriggerImageUploader from '../../common/ImageUploader';
import userIdTrim from '../../../lib/userid-trim';
import type { HeaderState, HeaderProps } from './types';

const HeaderContainer = styled.div`
    background-color: #1e2428;
    display: flex;
    align-items: flex-start;
    color: white;
    padding: 2.5em calc((100vw - 1280px) / 2);
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
    margin: ${props => props.theme.space[1]}px;
`;

class EditableHeader extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            username: props.username,
            title: props.title,
            avatar: props.avatar,
            website: props.website,
            twitter: props.twitter,
            github: props.github,
            name: props.name,
        }
    }

    saveUser() {
        this.props.saveUser({...this.state});
        this.props.toggleEditing();
        this.props.updateHeader({ ...this.state });
    }
    
    uploadImage() {
        TriggerImageUploader(() => {}, '', (file, url: string) => this.setState({ avatar: url}));
    }

    render() {
        const { userId: string  } = this.props;
        const { username, title, avatar, website, name, twitter, github} = this.state;
        return(
            <HeaderContainer>
                <StyledUpload bg={avatar} handleClick={() => this.uploadImage()} text="Profile" color="white" />
                <InputsContainers>
                    <StyledInput onChange={(e: { target: {value: string }}) => this.setState({ name: e.target.value})} fontWeight="normal" fontSize={6} value={name} placeHolder="Add your full name" />
                    <StyledInput onChange={(e: { target: {value: string }}) => this.setState({ title: e.target.value})} fontWeight="normal" fontSize={3} value={title} placeHolder="Add job title" />
                    <StyledInput onChange={(e: { target: {value: string }}) => this.setState({ username: e.target.value })} fontWeight="normal" fontSize={1} value={username}  placeHolder="Add username" />
                    <StyledInput onChange={(e: { target: {value: string }}) => this.setState({ website: e.target.value })} fontWeight="normal" fontSize={1} value={website}  placeHolder="Add Website" />
                    <StyledInput onChange={(e: { target: {value: string }}) => this.setState({ twitter: e.target.value })} fontWeight="normal" fontSize={1} value={twitter}  placeHolder="Twitter" />
                    <StyledInput onChange={(e: { target: {value: string }}) => this.setState({ github: e.target.value })} fontWeight="normal" fontSize={1} value={github}  placeHolder="Github" />
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