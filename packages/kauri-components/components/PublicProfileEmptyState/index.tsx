import styled from "../../lib/styled-components";
import { Title2, BodyCard, Label } from "../../components/Typography";

const Container = styled<{ moveIconLeftBecauseCSS?: boolean }, "div">("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  max-width: 450px;
  text-align: center;
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
    ${props =>
      typeof props.moveIconLeftBecauseCSS !== "undefined" &&
      "margin-left: 27px;"}
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
  > :nth-child(2) {
    margin-left: ${props => props.theme.space[2]}px;
  }
`;

const Icon = styled.img`
  height: 72px;
  width: 83px;
`;

const Link = styled(Label)``;

interface IProps {
  title: string;
  description: string | React.ReactElement<any>;
  learnMoreLinkComponent?: (
    childrenProps: React.ReactElement<any>
  ) => React.ReactElement<any>;
  iconSrc: string | null;
  primaryButton?: React.ReactElement<any>;
  secondaryButton?: React.ReactElement<any>;
  moveIconLeftBecauseCSS?: boolean;
}

export const PublicProfileEmptyState: React.FunctionComponent<IProps> = ({
  title,
  description,
  learnMoreLinkComponent,
  iconSrc,
  secondaryButton,
  primaryButton,
  moveIconLeftBecauseCSS,
}) => (
  <Container moveIconLeftBecauseCSS={moveIconLeftBecauseCSS}>
    {typeof iconSrc === "string" && <Icon src={iconSrc} />}
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
