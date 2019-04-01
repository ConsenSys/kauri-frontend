// @flow
import React from "react";
import styled from "styled-components";
import R from "ramda";
import { BodyCard } from "../../../../kauri-components/components/Typography";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import ChooseArticleCard from "../../connections/ChooseArticleCard/View";
import ModalHeader from "../../../../kauri-components/components/Headers/ModalHeader";
import ChooseResourceModalSearch from "./ChooseResourceModalSearch";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { searchApprovedArticles } from "../../../queries/Article";
import withApolloError from "../../../lib/with-apollo-error";

const articleSize = 12;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;
const Title = ({ chosenArticles }) => (
  <TitleContainer>
    <BodyCard>{`${
      Array.isArray(chosenArticles) ? chosenArticles.length : 0
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

const Actions = ({
  userId,
  handleClose,
  handleConfirm,
  chosenArticles,
  currentTab,
  searchPersonalPublishedArticles,
  searchPublishedArticles,
  changeTab,
}) => (
  <ActionsContainer>
    <ChooseResourceModalSearch
      userId={userId}
      query={searchPublishedArticles}
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
        handleConfirm(chosenArticles);
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
  chosenArticles: Array<{ id: string, version: string }>,
  allOtherChosenArticles: Array<{ id: string, version: string }>,
  searchPublishedArticles: any,
  searchPersonalPublishedArticles: any,
};

type State = {
  chosenArticles: Array<{ id: string, version: string }>,
  currentTab: string,
  changeTab: (index: number) => void,
};

class ChooseArticleModal extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = {
      chosenArticles: this.props.chosenArticles || [],
      currentTab: "My articles",
      changeTab: () => {},
    };
  }

  chooseArticle = (chosenArticle: { id: string, version: string }) =>
    this.setState({
      chosenArticles: R.find(
        ({ id, version }) =>
          chosenArticle.id === id && chosenArticle.version === version
      )(this.state.chosenArticles)
        ? R.reduce((current, next) => {
          if (
            next.id === chosenArticle.id &&
              next.version === chosenArticle.version
          ) {
            return current;
          } else {
            current.push(next);
            return current;
          }
        }, [])(this.state.chosenArticles)
        : R.union(this.state.chosenArticles, [chosenArticle]),
    });

  render () {
    const { closeModalAction, confirmModal } = this.props;

    return (
      <ContentContainer>
        {/* {JSON.stringify(this.state)} */}
        <ModalHeader
          actions={
            <Actions
              userId={this.props.userId}
              searchPersonalPublishedArticles={
                this.props.searchPersonalPublishedArticles
              }
              searchPublishedArticles={this.props.searchPublishedArticles}
              chosenArticles={this.state.chosenArticles}
              currentTab={this.state.currentTab}
              handleConfirm={confirmModal}
              handleClose={() => closeModalAction()}
              changeTab={this.state.changeTab}
            />
          }
          title={<Title chosenArticles={this.state.chosenArticles} />}
        />
        <ChooseArticleCard
          userId={this.props.userId}
          searchPersonalPublishedArticles={
            this.props.searchPersonalPublishedArticles
          }
          searchPublishedArticles={this.props.searchPublishedArticles}
          allOtherChosenArticles={this.props.allOtherChosenArticles}
          chosenArticles={this.state.chosenArticles}
          chooseArticle={this.chooseArticle}
          passChangeTabFunction={changeTab =>
            this.setState({ ...this.state, changeTab })
          }
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
  graphql(searchApprovedArticles, {
    options: ({ userId }) => ({
      variables: {
        size: articleSize, // Because lag and no searchbar
      },
    }),
    name: "searchPublishedArticles",
  }),
  graphql(searchApprovedArticles, {
    options: ({ userId }) => ({
      variables: {
        size: articleSize, // Because lag and no searchbar
        category: userId,
      },
    }),
    name: "searchPersonalPublishedArticles",
  }),
  withApolloError()
)(ChooseArticleModal);
