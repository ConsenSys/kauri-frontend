import React, { Component } from "react";
import styled from "styled-components";
import EditProfile from "../../common/EditProfile";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../../kauri-components/components/Button";
import Loading from "../../common/Loading";
import analytics from "../../../lib/analytics";
import moment from "moment";

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
  justify-content: center;
  width: 100%;
`;

class OnboardingEditProfile extends Component {
  handleSubmit() {
    const loginComp = this.login.getWrappedInstance().getWrappedInstance();

    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailCheck.test(
      String(loginComp.state.email).toLowerCase()
    );

    if (validEmail) {
      loginComp.saveUser(
        this.props.router.query.redirected
          ? `${this.props.router.query.r}?redirected=true`
          : this.props.router.query.r
      );
    } else {
      this.props.showNotificationAction({
        notificationType: "error",
        message: "Email Required",
        description: "Please enter a valid email address",
      });
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
      dateCreated,
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

    const loginTrackingPending = window.localStorage.getItem(
      "login-tracking-pending"
    );

    if (loginTrackingPending) {
      const daysCreated = moment().diff(moment(dateCreated), "minutes");
      if (!daysCreated || daysCreated <= 5) {
        analytics.signup(this.props.user);
      } else {
        analytics.login(this.props.user);
      }
      window.localStorage.removeItem("login-tracking-pending");
    }
    if (hasData) {
      let newRedirectURL;
      if (typeof this.props.router.query.r === "string") {
        newRedirectURL =
          this.props.router.query.r.indexOf("https://") !== -1 ||
          this.props.router.query.redirected
            ? this.props.router.query.r + "?redirected=true"
            : this.props.router.query.r;
      } else {
        newRedirectURL = `/public-profile/${this.props.userId}`;
      }
      return this.props.routeChangeAction(newRedirectURL);
    }
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
    const hasData = name && username && email;
    if (hasData) {
      return (
        <Page>
          <Loading />
        </Page>
      );
    }
    return (
      <Page>
        <Wrapper>
          <EditProfile ref={comp => (this.login = comp)} />
          <ButtonWrapper>
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
