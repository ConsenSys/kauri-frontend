import React, { Component } from "react";
import styled from "styled-components";
import EditProfile from "../../common/EditProfile";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../../kauri-components/components/Button";
import Loading from "../../common/Loading";

const Page = styled.div`
  display: flex;
  background: ${props => props.theme.bgPrimary};
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.space[3]}px;
  justify-content: space-between;
  width: 100%;
`;

class OnboardingEditProfile extends Component {
  handleSubmit() {
    this.login
      .getWrappedInstance()
      .getWrappedInstance()
      .saveUser();
    this.redirect();
  }

  redirect() {
    if (this.props.query.r) {
      this.props.query.r.indexOf("https://") !== -1
        ? this.props.routeChangeAction(
            "/" + this.props.query.r + "?redirected=true"
          )
        : this.props.routeChangeAction("/" + this.props.query.r);
    } else {
      this.props.routeChangeAction(`/public-profile/${this.props.userId}`);
    }
  }

  componentDidMount() {
    const {
      name,
      username,
      email,
      avatar,
      social,
      title,
      website,
    } = this.props.user;
    const github = social && social.github;
    const twitter = social && social.twitter;
    const hasData =
      name ||
      username ||
      email ||
      avatar ||
      github ||
      twitter ||
      title ||
      website;
    // if (hasData) {
    //   return this.redirect();
    // }
  }

  render() {
    const {
      name,
      username,
      email,
      avatar,
      social,
      title,
      website,
    } = this.props.user;
    const github = social && social.github;
    const twitter = social && social.twitter;
    const hasData =
      name ||
      username ||
      email ||
      avatar ||
      github ||
      twitter ||
      title ||
      website;
    // if (hasData) {
    //   return (
    //     <Page>
    //       <Loading />
    //     </Page>
    //   );
    // }
    return (
      <Page>
        <Wrapper>
          <EditProfile ref={comp => (this.login = comp)} />
          <ButtonWrapper>
            <SecondaryButton onClick={() => this.redirect()}>
              Skip
            </SecondaryButton>
            <PrimaryButton onClick={() => this.handleSubmit()}>
              Next
            </PrimaryButton>
          </ButtonWrapper>
        </Wrapper>
      </Page>
    );
  }
}

export default OnboardingEditProfile;
