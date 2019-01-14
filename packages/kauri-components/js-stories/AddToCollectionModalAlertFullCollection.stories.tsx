import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import AlertView from "../components/Modal/AlertView";
import AddToCollectionModalContent from "../components/AddToCollection/AddToCollectionModalContent";

const mockStore = configureStore();

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
              content={
                <AddToCollectionModalContent
                  setCollection={() => alert("chose collection")}
                  setSection={() => alert("chose section")}
                  parentState={{
                    chosenCollection: {
                      id: "1234567890",
                      name: "Collection 1",
                      sections: [
                        { name: "Section 1", id: "1234567890", resources: [] },
                      ],
                    },
                    chosenSection: null,
                  }}
                  collections={[
                    {
                      id: "1234567890",
                      name: "Collection 1",
                      sections: [
                        { name: "Section 1", id: "1234567890", resources: [] },
                      ],
                    },
                  ]}
                />
              }
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
