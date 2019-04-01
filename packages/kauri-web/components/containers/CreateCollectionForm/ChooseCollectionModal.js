// @flow
import React from "react";
import styled from "styled-components";
import R from "ramda";
import { BodyCard } from "../../../../kauri-components/components/Typography";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import ChooseCollectionCard from "../../connections/ChooseCollectionCard/View";
import ModalHeader from "../../../../kauri-components/components/Headers/ModalHeader";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import withApolloError from "../../../lib/with-apollo-error";
import { getCollectionsForUser } from "../../../queries/Collection";

const collectionSize = 12;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;
const Title = ({ chosenCollections }) => (
  <TitleContainer>
    <BodyCard>{`${
      Array.isArray(chosenCollections) ? chosenCollections.length : 0
    } Selected`}</BodyCard>
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

const Actions = ({ handleClose, handleConfirm, chosenCollections }) => (
  <ActionsContainer>
    <TertiaryButton
      icon={<CloseIcon />}
      onClick={() => handleClose()}
      color="textPrimary"
    >
      Close
    </TertiaryButton>
    <PrimaryButton
      onClick={() => {
        handleConfirm(chosenCollections);
        handleClose();
      }}
    >
      Confirm
    </PrimaryButton>
  </ActionsContainer>
);

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 620px;
  width: 980px;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

type Props = {
  userId: string,
  closeModalAction: () => void,
  confirmModal: (Array<{ id: string, version: string }>) => void,
  chosenCollections: Array<{ id: string, version: string }>,
  allOtherChosenCollections: Array<{ id: string, version: string }>,
  currentCollectionIdIfUpdating?: string,
  searchPublishedCollections: any,
  searchPersonalPublishedCollections: any,
};

type State = {
  chosenCollections: Array<{ id: string, version: string }>,
};

class ChooseCollectionModal extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = {
      chosenCollections: this.props.chosenCollections || [],
    };
  }

  chooseCollection = (chosenCollection: { id: string, version: string }) =>
    this.setState({
      chosenCollections: R.find(
        ({ id, version }) =>
          chosenCollection.id === id && chosenCollection.version === version
      )(this.state.chosenCollections)
        ? R.reduce((current, next) => {
          if (
            next.id === chosenCollection.id &&
              next.version === chosenCollection.version
          ) {
            return current;
          } else {
            current.push(next);
            return current;
          }
        }, [])(this.state.chosenCollections)
        : R.union(this.state.chosenCollections, [chosenCollection]),
    });

  render () {
    const {
      closeModalAction,
      confirmModal,
      currentCollectionIdIfUpdating,
    } = this.props;

    return (
      <ContentContainer>
        {/* {JSON.stringify(this.state)} */}
        <ModalHeader
          actions={
            <Actions
              chosenCollections={this.state.chosenCollections}
              handleConfirm={confirmModal}
              handleClose={() => closeModalAction()}
            />
          }
          title={<Title chosenCollections={this.state.chosenCollections} />}
        />
        <ChooseCollectionCard
          userId={this.props.userId}
          searchPublishedCollections={this.props.searchPublishedCollections}
          searchPersonalPublishedCollections={
            this.props.searchPersonalPublishedCollections
          }
          currentCollectionIdIfUpdating={currentCollectionIdIfUpdating}
          allOtherChosenCollections={this.props.allOtherChosenCollections}
          chosenCollections={this.state.chosenCollections}
          chooseCollection={this.chooseCollection}
        />
      </ContentContainer>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getCollectionsForUser, {
    options: ({ userId }) => ({
      variables: {
        size: collectionSize, // Because lag and no searchbar
      },
    }),
    name: "searchPublishedCollections",
  }),
  graphql(getCollectionsForUser, {
    options: ({ userId }) => ({
      variables: {
        size: collectionSize, // Because lag and no searchbar
        filter: {
          ownerIdEquals: userId,
        },
      },
    }),
    name: "searchPersonalPublishedCollections",
  }),
  withApolloError()
)(ChooseCollectionModal);
