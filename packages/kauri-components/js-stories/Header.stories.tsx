import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import ModalHeader from "../components/Headers/ModalHeader";
import PrimaryButton from "../components/Button/PrimaryButton";
import TertiaryButton from "../components/Button/TertiaryButton";
import { NavigationText, BodyCard } from "../components/Typography";
import CollectionHeader from "../components/Headers/CollectionHeader";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;
const Title = () => (
  <TitleContainer>
    <NavigationText>Your recent articles</NavigationText>
    <BodyCard>0 Selected</BodyCard>
  </TitleContainer>
);

const ActionsContainer = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const CloseIcon = () => (
  <img
    style={{ rotate: "45deg" }}
    src="https://png.icons8.com/material-two-tone/50/000000/delete-sign.png"
  />
);

const handleAlert = (message: string) => () => alert(message);

const Actions = () => (
  <ActionsContainer>
    <TertiaryButton
      icon={<CloseIcon />}
      onClick={handleAlert("close")}
      color="textPrimary"
    >
      Close
    </TertiaryButton>
    <PrimaryButton onClick={handleAlert("confirm")}>Confirm</PrimaryButton>
  </ActionsContainer>
);

storiesOf("Headers", module)
  .add("Collection Header", () => (
    <CollectionHeader
      isMemberOfCommunityOwner={true}
      articleCount={4}
      collectionCount={0}
      tags={["lol", "lol2", "hey"]}
      imageURL={null}
      id={"1234567890"}
      ownerId={"1234567890"}
      name={"Test collection"}
      description={"Test description for a fake collection"}
      userId={"0x32048jdwk298he"}
      username={"0x32048jdwk298he"}
      userAvatar=""
      updated={"2018-07-25T14:28:36.532Z"}
      url={"test.com"}
      routeChangeAction={undefined}
      linkComponent={undefined}
    />
  ))
  .add("Modal", () => <ModalHeader actions={<Actions />} title={<Title />} />);
