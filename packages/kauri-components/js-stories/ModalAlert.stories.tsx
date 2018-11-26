import React from "react";
import { storiesOf } from "@storybook/react";
// import styled from "../lib/styled-components";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";

const mockStore = configureStore();

const ModalChildren = () => <p>Because Nelson!</p>;

storiesOf("ModalAlert", module)
  .addDecorator(getStory => (
    <Provider
      store={mockStore({
        modal: {
          children: <ModalChildren />,
          isModalOpen: true,
        },
      })}
    >
      {getStory()}
    </Provider>
  ))
  .add("opened", () => <Modal />);
