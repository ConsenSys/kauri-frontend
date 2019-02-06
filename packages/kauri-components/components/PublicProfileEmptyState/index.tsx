import styled from "../../lib/styled-components";
import { Title2, BodyCard, Label } from "../../components/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  max-width: 450px;
  text-align: center;
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > :nth-child(3) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > :nth-last-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`;

const Icon = styled.img`
  height: 72px;
  width: 58px;
`;

const Link = styled(Label)``;

interface IProps {
  title: string;
  description: string | React.ReactElement<any>;
  learnMoreLinkComponent?: (
    childrenProps: React.ReactElement<any>
  ) => React.ReactElement<any>;
  iconSrc: string;
  primaryButton?: React.ReactElement<any>;
  secondaryButton?: React.ReactElement<any>;
}

export const PublicProfileEmptyState: React.FunctionComponent<IProps> = ({
  title,
  description,
  learnMoreLinkComponent,
  iconSrc,
  secondaryButton,
  primaryButton,
}) => (
  <Container>
    <Icon src={iconSrc} />
    <Title2>{title}</Title2>
    {typeof description === "string" ? (
      <BodyCard>{description}</BodyCard>
    ) : (
      description
    )}
    {learnMoreLinkComponent &&
      learnMoreLinkComponent(<Link color={"primary"}>Learn more</Link>)}
    <Buttons>
      {secondaryButton}
      {primaryButton}
    </Buttons>
  </Container>
);

export default PublicProfileEmptyState;
