import styled from "styled-components";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";

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

interface IProps {
  router: { query: { uuid: string } };
}

const EmailActivation = (props: IProps) => (
  <VerifyEmailContainer>
    <div>UUID: {props.router && props.router.query.uuid}</div>
    <PrimaryButton>Verify Your Email</PrimaryButton>
  </VerifyEmailContainer>
);

export default EmailActivation;
