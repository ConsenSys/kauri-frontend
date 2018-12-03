import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import { Label } from "../components/Typography";
import AlertView from "../components/Modal/AlertView";

const mockStore = configureStore();

const ModalChildren = () => (
  <section>
    <Label>You don't have any collections.</Label>
  </section>
);

const handleConfirmAction = (action: any) => () => action();

storiesOf("AddToCollection ModalAlert - No Collections", module)
  .addDecorator(getStory => (
    <Provider
      store={mockStore({
        modal: {
          children: (
            <AlertView
              // closeModalAction must be the redux connected dispatch action
              closeModalAction={handleConfirmAction(() => alert("cancel"))}
              confirmButtonAction={handleConfirmAction(() => alert("confirm"))}
              confirmButtonText={"Create collection"}
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
