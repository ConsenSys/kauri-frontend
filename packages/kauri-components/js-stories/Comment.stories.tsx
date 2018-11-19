import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { Label, CTA, BodyCard } from "../components/Typography";
import SecondaryButton from "../components/Button/SecondaryButton";
import UserAvatar from "../components/UserAvatar";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const CommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const MetaDetails = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`;

const clickedHandler = () => alert("reply clicked");

storiesOf("Comments", module)
  .add("Single", () => (
    <Section>
      <Label>General Comments</Label>
      <CommentContainer>
        <UserAvatar avatar={null} username={null} userId="0xabcd...hi" />
        <BodyCard>
          Nullam consectetur aliquam nunc et vehicula. Phasellus porta est id
          vehicula ullamcorper. Quisque efficitur lacus ac faucibus luctus.
          Donec non erat varius, suscipit nisl et, semper arcu. Nunc non ante at
          neque imperdiet sollicitudin. Duis tincidunt turpis ac urna
          consectetur eleifend. Curabitur tempor sagittis efficitur.
        </BodyCard>
        <MetaDetails>
          <Label>1 day ago</Label>
          <CTA onClick={clickedHandler}>Reply</CTA>
        </MetaDetails>
      </CommentContainer>
      <SecondaryButton
        width="100%"
        handleClick={clickedHandler}
        color="textPrimary"
        border={"primary"}
        borderHover={"hoverTextColor"}
      >
        Leave a comment
      </SecondaryButton>
    </Section>
  ))

  .add("List", () => (
    <Section>
      <Label>General Comments</Label>

      <CommentContainer>
        <UserAvatar avatar={null} username={null} userId="0xabcd...hi" />
        <BodyCard>
          Nullam consectetur aliquam nunc et vehicula. Phasellus porta est id
          vehicula ullamcorper. Quisque efficitur lacus ac faucibus luctus.
          Donec non erat varius, suscipit nisl et, semper arcu. Nunc non ante at
          neque imperdiet sollicitudin. Duis tincidunt turpis ac urna
          consectetur eleifend. Curabitur tempor sagittis efficitur.
        </BodyCard>
        <MetaDetails>
          <Label>1 day ago</Label>
          <CTA>Reply</CTA>
        </MetaDetails>
      </CommentContainer>
      <CommentContainer>
        <UserAvatar avatar={null} username={null} userId="0xabcd...hi" />
        <BodyCard>
          Duis tincidunt turpis ac urna consectetur eleifend. Curabitur tempor
          sagittis efficitur.
        </BodyCard>
        <MetaDetails>
          <Label>1 day ago</Label>
          <CTA>Reply</CTA>
        </MetaDetails>
      </CommentContainer>

      <SecondaryButton
        width="100%"
        handleClick={clickedHandler}
        color="textPrimary"
        border={"primary"}
        borderHover={"hoverTextColor"}
      >
        Leave a comment
      </SecondaryButton>
    </Section>
  ));
