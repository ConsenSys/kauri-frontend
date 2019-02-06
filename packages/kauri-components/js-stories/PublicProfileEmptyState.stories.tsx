import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import PrimaryButtonComponent from "../components/Button/PrimaryButton";
import MediumImportButton from "../components/Button/MediumImportButton";
import { Title2, BodyCard, Label } from "../components/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  max-width: 300px;
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
  description: string;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  iconSrc: string;
  primaryButton?: React.ReactElement<any>;
  secondaryButton?: React.ReactElement<any>;
}

const PublicProfileEmptyState: React.FunctionComponent<IProps> = ({
  title,
  description,
  linkComponent,
  iconSrc,
  secondaryButton,
  primaryButton,
}) => (
  <Container>
    <Icon src={iconSrc} />
    <Title2>{title}</Title2>
    {description && <BodyCard>{description}</BodyCard>}
    {linkComponent(<Link color={"primary"}>Learn more</Link>, "")}
    <Buttons>
      {secondaryButton}
      {primaryButton}
    </Buttons>
  </Container>
);

const DecoratorContainer = styled.div`
  display: flex;
  width: 500px;
  margin: 0 auto;
`;

storiesOf("PublicProfile Empty States", module)
  .addDecorator(story => <DecoratorContainer>{story()}</DecoratorContainer>)
  .add("No Articles Published", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-published-articles.svg"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis gravida."
      }
      linkComponent={childrenProps => childrenProps}
      title="No Articles Published"
      secondaryButton={<MediumImportButton border={true} />}
      primaryButton={
        <PrimaryButtonComponent>Create Article</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Saved Drafts", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-saved-drafts.svg"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis gravida."
      }
      linkComponent={childrenProps => childrenProps}
      title="No Saved Drafts"
      primaryButton={
        <PrimaryButtonComponent>Create Article</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Collections Created", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-collections-created.svg"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis gravida."
      }
      linkComponent={childrenProps => childrenProps}
      title="No Collections Created"
      primaryButton={
        <PrimaryButtonComponent>Create Collection</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Collections Created - Others", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-collections-created.svg"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis gravida."
      }
      linkComponent={childrenProps => childrenProps}
      title="No Collections Created"
    />
  ))
  .add("No Articles Published - Others", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-published-articles.svg"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis gravida."
      }
      linkComponent={childrenProps => childrenProps}
      title="No Articles Published"
    />
  ));
