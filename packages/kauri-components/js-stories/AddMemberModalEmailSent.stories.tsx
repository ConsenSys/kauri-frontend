import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import AlertView from "../components/Modal/AlertView";
import AddMemberModalContent from "../components/CreateCommunityForm/AddMemberModalContent";

const mockStore = configureStore();

const handleConfirmAction = (action: any) => () => action();

const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => any = () => {
  return;
};

const currentStep = 2;

storiesOf("AddMember ModalAlert - Email Sent", module)
  .addDecorator(getStory => (
    <Provider
      store={mockStore({
        modal: {
          children: (
            <AlertView
              // closeModalAction must be the redux connected dispatch action
              closeModalAction={handleConfirmAction(() => alert("cancel"))}
              confirmButtonAction={handleConfirmAction(() => alert("confirm"))}
              content={
                <AddMemberModalContent
                  currentStep={currentStep}
                  emailAddress=""
                  handleChange={handleChange}
                />
              }
              title={
                currentStep === 2 ? "Email Sent" : "Add Member to Community"
              }
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
