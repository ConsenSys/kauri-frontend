import React, {Component} from 'react';
import styled from 'styled-components';
import Input from '../../../../kauri-components/components/Input/Input';
import UploadLogoButton from '../../../../kauri-components/components/Button/UploadLogoButton';
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton';
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton';
import TriggerImageUploader from '../../common/ImageUploader';

const HeaderContainer = styled.div`
    height: 190px;
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
        const { username, email, title, avatar, website} = this.state;
        return(
            <HeaderContainer>
                <UploadLogoButton handleClick={() => this.uploadImage()} text="Profile" color="white" />
                <InputsContainers>
                    <div>0x{userId}</div>
                    <Input onChange={(e) => this.setState({ username: e.target.value})} fontWeight="normal" fontSize={5} value={username} placeHolder="Add Username" />
                    <Input onChange={(e) => this.setState({ title: e.target.value })} fontWeight="normal" fontSize={2} value={title}  placeHolder="Add Role" />
                    <Input onChange={(e) => this.setState({ website: e.target.value })} fontWeight="normal" fontSize={2} value={website}  placeHolder="Add Website" />
                    <Input onChange={(e) => this.setState({ email: e.target.value })} fontWeight="normal" fontSize={2} value={email} placeHolder="Add Email address" />
                </InputsContainers>
                <TertiaryButton onClick={() => this.props.toggleEditing()}>Discard</TertiaryButton>
                <PrimaryButton onClick={() => this.saveUser()}>Save Changes</PrimaryButton>
            </HeaderContainer>
        );
    }
};

export default EditableHeader;