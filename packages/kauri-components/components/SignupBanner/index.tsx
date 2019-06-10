import * as React from "react";
import styled from "../../lib/styled-components";
import { Title1, BodyCard } from "../Typography";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import Stack from "stack-styled";
import PrimaryButtonComponent from "../Button/PrimaryButton";

const ResourceDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const ViewContainer = styled.section`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    display: none;
  }
`;

interface IProps {
  linkComponent: (
    children: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
}

const SignupBannerStack = styled(Stack)`
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
  background: ${props => props.theme.colors.bgPrimary};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: ${props => props.theme.space[3]}px
      ${props => props.theme.space[2]}px;
  }
`;

const SignupBanner: React.FunctionComponent<IProps> = props => (
  <SignupBannerStack
    alignItems={[""]}
    justifyContent={[""]}
    gridAutoFlow={["column"]}
    gap={30}
  >
    <ResourceDetailsContainer>
      <Title1 color="white">Learn to Build on Ethereum with Kauri</Title1>
      <BodyCard color="white">
        Articles, Tutorials, Documentation and Best Practices
      </BodyCard>
    </ResourceDetailsContainer>
    <ViewContainer>
      {props.linkComponent(
        <PrimaryButtonComponent color="white">{`Sign up`}</PrimaryButtonComponent>,
        `/login`
      )}
      {props.linkComponent(
        <SecondaryButtonComponent
          border="white"
          color="white"
        >{`Learn more`}</SecondaryButtonComponent>,
        `/help`
      )}
    </ViewContainer>
  </SignupBannerStack>
);

export default SignupBanner;
