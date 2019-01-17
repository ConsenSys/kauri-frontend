import React, { Component } from "react";
import styled from "styled-components";
import Input from "../../../../kauri-components/components/Input/Input";
import UploadLogoButton from "../../../../kauri-components/components/Button/UploadLogoButton";
import SocialWebsiteIcon from "../../../../kauri-components/components/PublicProfile/SocialWebsiteIcon.tsx";
import TriggerImageUploader from "../../common/ImageUploader";
import R from "ramda";
import { regenerateEmailVerification } from "../../../queries/User";
import EmailField from "./EmailField";

const InputsContainers = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${props => props.theme.space[2]}px;
  justify-content: space-between;
  height: 230px;
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

class EditableHeader extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    if (!props.OwnProfile.getMyProfile) {
      this.state = {
        pendingSubmit: false,
        username: "",
        title: "",
        avatar: "",
        website: "",
        twitter: "",
        github: "",
        name: "",
        email: "",
        status: "CREATED",
      };
    } else {
      const {
        username,
        title,
        avatar,
        website,
        social,
        name,
        email,
        status,
      } = props.OwnProfile.getMyProfile;
      this.state = {
        pendingSubmit: false,
        username,
        title,
        avatar,
        website,
        twitter: social && social.twitter,
        github: social && social.github,
        name,
        email,
        status,
      };
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      typeof prevProps.OwnProfile.getMyProfile === "undefined" &&
      typeof this.props.OwnProfile.getMyProfile !== "undefined"
    ) {
      const {
        username,
        title,
        avatar,
        website,
        social,
        name,
        email,
        status,
      } = this.props.OwnProfile.getMyProfile;

      this.setState({
        username,
        title,
        avatar,
        website,
        github: social && social.github,
        twitter: social && social.twitter,
        name,
        email,
        status,
      });
    }
  }

  saveUser() {
    const payload = R.filter(R.is(String), this.state);
    this.setState({ pendingSubmit: true });
    this.props.saveUserDetailsAction(payload);
  }

  uploadImage() {
    TriggerImageUploader(() => {}, "", (file, url: string) =>
      this.setState({ avatar: url })
    );
  }

  handleChange(param: string, value: string) {
    this.setState({
      [param]: value,
    });
  }

  render() {
    const {
      username,
      title,
      avatar,
      website,
      name,
      twitter,
      github,
      email,
      status,
    } = this.state;

    return (
      <Container>
        <StyledUpload
          bg={avatar}
          handleClick={() => this.uploadImage()}
          text="Profile"
          color="white"
        />
        <InputsContainers>
          <Input
            onChange={e => this.handleChange("name", e.target.value)}
            fontWeight="normal"
            fontSize={6}
            value={name}
            placeHolder="Add your full name"
          />
          <Input
            onChange={e => this.handleChange("title", e.target.value)}
            fontWeight="normal"
            fontSize={3}
            value={title}
            placeHolder="Add job title"
          />
          <Input
            onChange={e => this.handleChange("username", e.target.value)}
            fontWeight="normal"
            fontSize={1}
            value={username}
            placeHolder="Add username"
          />
          <Input
            onChange={e => this.handleChange("website", e.target.value)}
            fontWeight="normal"
            fontSize={1}
            value={website}
            placeHolder="Add Website"
          />
          <Offset>
            <SocialWebsiteIcon brand="twitter" />
            <Input
              onChange={e => this.handleChange("twitter", e.target.value)}
              fontWeight="normal"
              fontSize={1}
              value={twitter}
              placeHolder="Twitter"
            />
          </Offset>
          <Offset>
            <SocialWebsiteIcon brand="github" />
            <Input
              onChange={e => this.handleChange("github", e.target.value)}
              fontWeight="normal"
              fontSize={1}
              value={github}
              placeHolder="Github"
            />
          </Offset>
          <EmailField
            resendEmailVerification={this.props.resendEmailVerification}
            email={email}
            handleChange={this.handleChange}
            status={status}
          />
        </InputsContainers>
      </Container>
    );
  }
}

export default EditableHeader;
