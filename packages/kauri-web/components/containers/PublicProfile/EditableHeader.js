import React, {Component} from 'react';
import styled from 'styled-components';
import Input from '../../../../kauri-components/components/Input/Input';
import UploadLogoButton from '../../../../kauri-components/components/Button/UploadLogoButton';
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton';
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton';
import TriggerImageUploader from '../../common/ImageUploader';

const HeaderContainer = styled.div`
    height: 300px;
    background-color: #1e2428;
    display: flex;
    align-items: center;
    color: white;
    padding: 2.5em calc((100vw - 1280px) / 2);
    justify-content: space-between;
`;

const InputsContainers = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 20px;
    justify-content: space-between;
`;

const StyledInput = styled(Input)`
    margin: 20px;
`;

const ActionsContainer = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
`;


class EditableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            email: props.email,
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
    }
    
    uploadImage() {
        TriggerImageUploader(null, null, (file, url) => this.setState({ avatar: url}));
    }

    render() {
        const { userId  } = this.props;
        const { username, email, title, avatar, website, name, twitter, github} = this.state;
        return(
            <HeaderContainer>
                <UploadLogoButton bg={avatar} ndleClick={() => this.uploadImage()} text="Profile" color="white" />
                <InputsContainers>
                    <div>0x{userId}</div>
                    <StyledInput onChange={(e) => this.setState({ name: e.target.value})} fontWeight="normal" fontSize={6} value={name} placeHolder="Add your full name" />
                    <StyledInput onChange={(e) => this.setState({ title: e.target.value})} fontWeight="normal" fontSize={3} value={title} placeHolder="Add job title" />
                    <StyledInput onChange={(e) => this.setState({ username: e.target.value })} fontWeight="normal" fontSize={1} value={username}  placeHolder="Add Role" />
                    <StyledInput onChange={(e) => this.setState({ website: e.target.value })} fontWeight="normal" fontSize={1} value={website}  placeHolder="Add Website" />
                    <StyledInput onChange={(e) => this.setState({ twitter: e.target.value })} fontWeight="normal" fontSize={1} value={twitter}  placeHolder="Twitter" />
                    <StyledInput onChange={(e) => this.setState({ github: e.target.value })} fontWeight="normal" fontSize={1} value={github}  placeHolder="Github" />
                    <StyledInput onChange={(e) => this.setState({ email: e.target.value })} fontWeight="normal" fontSize={1} value={email} placeHolder="Add Email address" />
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