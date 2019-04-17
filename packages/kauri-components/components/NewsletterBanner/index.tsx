import * as React from "react";
import styled from "../../lib/styled-components";
import { Title2, BodyCard } from "../Typography";
import { Input } from "../Input";
import PrimaryButtonComponent from "../Button/PrimaryButton";
import * as Yup from "yup";

const Container = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.space[3]}px;
  background: ${props => props.theme.colors.bgPrimary};
`;

const Content = styled.section`
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[0]}px;
  }
`;

const Icon = () => (
  <svg
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
  </svg>
);

interface IProps {
  handleSubmit: (emailAddress: string) => void;
  handleError: () => void;
}

interface IState {
  emailAddress: string | null;
}

const handleEmailAddress = (props: IProps, state: IState) => async () => {
  const validate = Yup.string()
    .email()
    .required();
  const result = await validate.isValid(state.emailAddress);
  if (result && state.emailAddress) {
    return props.handleSubmit(state.emailAddress);
  } else {
    props.handleError();
  }
};

const NewsletterBanner: React.FunctionComponent<IProps> = props => {
  const [state, setState] = React.useState<IState>({
    emailAddress: null,
  });

  return (
    <Container>
      <Content>
        <Icon />
        <Title2 color="white">Kauri Newsletter</Title2>
        <BodyCard color="white" textAlign={"center"}>
          Subscribe below and receive the latest Ethereum tutorials and project
          announcements every 2 weeks!
        </BodyCard>
        <Input
          color="white"
          textAlign={"center"}
          placeHolder={"Enter your email address"}
          fontSize={3}
          handleChange={({ target: { value: emailAddress } }) =>
            setState({ emailAddress })
          }
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              handleEmailAddress(props, state)().catch(_ => {
                return;
              });
            }
          }}
        >
          {state.emailAddress}
        </Input>
        <PrimaryButtonComponent onClick={handleEmailAddress(props, state)}>
          Subscribe
        </PrimaryButtonComponent>
      </Content>
    </Container>
  );
};

export default NewsletterBanner;
