import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import Select from "../components/Select";
import AlertView from "../components/Modal/AlertView";
import styled from "../lib/styled-components";
import theme from "../lib/theme-config";

const TooltipContainer = styled.div`
  display: flex;
  width: 300px;
  padding: ${theme.space[2]}px;
  flex-direction: column;
  position: relative;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[2]}px;
  }
  > * {
    cursor: pointer;
  }
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  :hover {
    color: ${theme.colors.hoverTextColor};
  }
`;

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors.divider};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
`;

const CollectionsContent = () => {
  return (
    <TooltipContainer>
      <Label>Collection 1</Label>
      <Divider />
      <Label>Collection 2</Label>
    </TooltipContainer>
  );
};

const SectionsContent = () => {
  return (
    <TooltipContainer>
      <Label>Section 1</Label>
      <Divider />
      <Label>Section 2</Label>
    </TooltipContainer>
  );
};

const AddToCollectionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.space[2]}px;
  > * {
    margin-bottom: ${theme.space[3]}px;
  }
`;

const mockStore = configureStore();

const ModalChildren = () => (
  <AddToCollectionSection>
    <Select placeHolder="Collection name">
      <CollectionsContent />
    </Select>
    <Select placeHolder="Section name">
      <SectionsContent />
    </Select>
  </AddToCollectionSection>
);

const handleConfirmAction = (action: any) => () => action();

storiesOf("AddToCollection ModalAlert - Full Collection", module)
  .addDecorator(getStory => (
    <Provider
      store={mockStore({
        modal: {
          children: (
            <AlertView
              // closeModalAction must be the redux connected dispatch action
              closeModalAction={handleConfirmAction(() => alert("cancel"))}
              confirmButtonAction={handleConfirmAction(() => alert("confirm"))}
              content={<ModalChildren />}
              title={"Add to collection"}
            />
          ),
          isModalOpen: true,
        },
      })}
    >
      {getStory()}
    </Provider>
  ))
  .add("opened", () => <Modal />);
