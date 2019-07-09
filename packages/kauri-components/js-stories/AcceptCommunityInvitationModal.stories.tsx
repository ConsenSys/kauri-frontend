import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import AlertView from "../components/Modal/AlertView";
import AcceptCommunityInvitationModalContent from "../components/Community/AcceptCommunityInvitationModalContent";

const mockStore = configureStore();

const handleConfirmAction = (action: any) => () => action();

storiesOf("AcceptCommunityInvitation Modal", module)
  .addDecorator(getStory => (
    <Provider
      store={mockStore({
        modal: {
          children: (
            <AlertView
              // closeModalAction must be the redux connected dispatch action
              closeModalAction={handleConfirmAction(() => alert("cancel"))}
              confirmButtonAction={handleConfirmAction(() => alert("confirm"))}
              confirmButtonText={"Accept"}
              content={<AcceptCommunityInvitationModalContent />}
              title={"Accept Invitation To Join Community"}
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
