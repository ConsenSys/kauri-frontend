import React from "react";
import styled from "styled-components";
import R from "ramda";
import { BodyCard } from "../../../../../kauri-components/components/Typography";
import PrimaryButton from "../../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButton from "../../../../../kauri-components/components/Button/TertiaryButton";
import ChooseCollectionCard from "../../../connections/ChooseCollectionCard/View";
import ModalHeader from "../../../../../kauri-components/components/Headers/ModalHeader";
import ChooseResourceModalSearch from "../../CreateCollectionForm/ChooseResourceModalSearch";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import withApolloError from "../../../../lib/with-apollo-error";
import { IReduxState } from "../../../../lib/Module";
import { getCollectionsForUser } from "../../../../queries/Collection";

const collectionSize = 12;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const Title = ({ chosenCollections }: any) => (
  <TitleContainer>
    <BodyCard>{`${
      Array.isArray(chosenCollections) ? chosenCollections.length : 0
    } Selected`}</BodyCard>
  </TitleContainer>
);

const ActionsContainer = styled.div`
  display: flex;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const CloseIcon = () => (
  <img
    style={{ rotate: "45deg" }}
    src="https://png.icons8.com/material-two-tone/50/000000/delete-sign.png"
  />
);

const Actions: React.FunctionComponent<any> = ({
  handleClose,
  handleConfirm,
  chosenCollections,
  searchPublishedCollections,
  changeTab,
  userId,
}) => (
  <ActionsContainer>
    <ChooseResourceModalSearch
      type="collection"
      userId={userId}
      query={searchPublishedCollections}
      changeTab={changeTab}
    />
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

interface IProps {
  userId: string;
  closeModalAction: () => void;
  confirmModal: (collections: Array<{ id: string }>) => void;
  chosenCollections: Array<{ id: string }>;
  allOtherChosenCollections: Array<{ id: string }>;
  currentCollectionIdIfUpdating?: string;
  searchPublishedCollections: any;
  searchPersonalPublishedCollections: any;
}

interface IState {
  chosenCollections: Array<{ id: string }>;
  currentTab: string;
  changeTab: (index: number) => void;
}

export interface ICollection {
  id: string;
}

class ChooseCollectionModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      changeTab: () => {
        return;
      },
      chosenCollections: this.props.chosenCollections || [],
      currentTab: "My collections",
    };
  }

  chooseCollection = (chosenCollection: { id: string; version: string }) =>
    this.setState({
      chosenCollections: R.find(({ id }) => chosenCollection.id === id)(
        this.state.chosenCollections
      )
        ? R.reduce((current: any, next: { id: string }) => {
            if (next.id === chosenCollection.id) {
              return current;
            } else {
              current.push(next);
              return current;
            }
          }, [])(this.state.chosenCollections)
        : R.union(this.state.chosenCollections, [chosenCollection]),
    });

  render() {
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
              userId={this.props.userId}
              searchPublishedCollections={this.props.searchPublishedCollections}
              searchPersonalPublishedCollections={
                this.props.searchPersonalPublishedCollections
              }
              chosenCollections={this.state.chosenCollections}
              handleConfirm={confirmModal}
              handleClose={() => closeModalAction()}
              currentTab={this.state.currentTab}
              changeTab={this.state.changeTab}
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
          passChangeTabFunction={(changeTab: any) =>
            this.setState({ ...this.state, changeTab })
          }
        />
      </ContentContainer>
    );
  }
}

const mapStateToProps = (state: IReduxState) => ({
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getCollectionsForUser, {
    name: "searchPublishedCollections",
    options: () => ({
      variables: {
        size: collectionSize, // Because lag and no searchbar
      },
    }),
  }),
  graphql(getCollectionsForUser, {
    name: "searchPersonalPublishedCollections",
    options: ({ userId }: { userId: string }) => ({
      variables: {
        filter: {
          ownerIdEquals: userId,
        },
        size: collectionSize, // Because lag and no searchbar
      },
    }),
  }),
  withApolloError()
)(ChooseCollectionModal);
