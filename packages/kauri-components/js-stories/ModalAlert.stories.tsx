import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import AlertView from "../components/Modal/AlertView";

const mockStore = configureStore();

const ModalChildren = () => (
  <section>
    <p>
      Content goes here. Content goes here. Content goes here. Content goes
      here.{" "}
    </p>
    <p>
      Content goes here. Content goes here. Content goes here. Content goes
      here.{" "}
    </p>
    <p>
      Content goes here. Content goes here. Content goes here. Content goes
      here.{" "}
    </p>
  </section>
);

const handleConfirmAction = (action: any) => () => action();

storiesOf("ModalAlert", module)
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
              title={"Title"}
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
