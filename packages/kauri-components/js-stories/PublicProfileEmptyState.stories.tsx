import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import PrimaryButtonComponent from "../components/Button/PrimaryButton";
import MediumImportButton from "../components/Button/MediumImportButton";
import PublicProfileEmptyState from "../components/PublicProfileEmptyState";

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
      learnMoreLinkComponent={childrenProps => childrenProps}
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
      learnMoreLinkComponent={childrenProps => childrenProps}
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
      learnMoreLinkComponent={childrenProps => childrenProps}
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
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Collections Created"
    />
  ))
  .add("No Articles Published - Others", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-published-articles.svg"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis gravida."
      }
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Articles Published"
    />
  ));
