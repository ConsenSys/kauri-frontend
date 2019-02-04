import React from "react";
import styled from "styled-components";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import { H1, H3 } from "../../../../kauri-components/components/Typography";
import Loading from "../../common/Loading";

const VerifyEmailContainer = styled.div`
  ${props => `
    background: ${props.theme.colors.bgPrimary};
    display: flex;
    color: white;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`}
`;

const SVG = styled.svg`
  height: 48px;
  width: 60px;
  margin: ${props => props.theme.space[3]}px;
`;

const Image = (
  <SVG
    width="64"
    height="52"
    viewBox="0 0 64 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2H56C59.3 2 62 4.7 62 8V44C62 47.3 59.3 50 56 50H8C4.7 50 2 47.3 2 44V8C2 4.7 4.7 2 8 2Z"
      stroke="#0BA986"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M62 8L32 29L2 8"
      stroke="#0BA986"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
);

interface IProps {
  verifyEmailAction: (code: string, callback: any) => void;
  resendEmailVerificationAction: () => void;
  routeChangeAction: (route: string) => void;
  uuid: string;
}

interface IState {
  status: string;
}

class EmailActivation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      status: "loading",
    };
  }

  componentDidMount() {
    this.props.verifyEmailAction(this.props.uuid, (data: any) =>
      this.setVerifiedState(data)
    );
  }

  setVerifiedState(data: any) {
    if (data.type === "EMAIL_VERIFIED") {
      this.setState({ status: "verified" });
    } else {
      this.setState({ status: "failed" });
    }
  }

  resendEmailVerification() {
    this.props.resendEmailVerificationAction();
    this.setState({ status: "resent" });
  }

  render() {
    if (this.state.status === "loading") {
      return (
        <VerifyEmailContainer>
          <Loading />
        </VerifyEmailContainer>
      );
    } else if (this.state.status === "verified") {
      return (
        <VerifyEmailContainer>
          <H1 color="white">Email Address</H1>
          <H3 color="white">Your email address has now been verified</H3>
          {Image}
          <PrimaryButton onClick={() => this.props.routeChangeAction("/")}>
            Go To Homepage
          </PrimaryButton>
        </VerifyEmailContainer>
      );
    } else {
      return (
        <VerifyEmailContainer>
          <H1 color="white">Invalid Email Verification Link</H1>
          {this.state.status !== "resent" && (
            <>
              <H3 color="white">
                The link you clicked is now invalid, please click the button to
                receive a new valid link.
              </H3>
              {Image}
              <PrimaryButton onClick={() => this.resendEmailVerification()}>
                Resend Email
              </PrimaryButton>
            </>
          )}
          {this.state.status === "resent" && (
            <>
              {Image}
              <H3 color="white">Verification Email Sent.</H3>
            </>
          )}
        </VerifyEmailContainer>
      );
    }
  }
}

export default EmailActivation;
