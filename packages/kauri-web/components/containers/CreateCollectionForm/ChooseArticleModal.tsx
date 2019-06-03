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
import { IReduxState } from "../../../lib/Module";

const articleSize = 12;

export interface IArticle {
  id: string;
  version: string;
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const Title: React.FunctionComponent<{
  chosenArticles: IArticle[];
  limit: number | undefined;
}> = ({ chosenArticles, limit }) => (
  <TitleContainer>
    <BodyCard>{`${
      Array.isArray(chosenArticles) ? chosenArticles.length : 0
    } Selected ${
      typeof limit === "number" ? `: Max (${limit})` : ""
    }`}</BodyCard>
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
  chosenArticles,
  searchPublishedArticles,
  changeTab,
  userId,
}) => (
  <ActionsContainer>
    <ChooseResourceModalSearch
      type="article"
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

interface IProps {
  limit?: number;
  userId: string;
  closeModalAction: () => void;
  confirmModal: (articles: IArticle[]) => void;
  chosenArticles: IArticle[];
  allOtherChosenArticles: Array<{ id: string; version: string }>;
  searchPublishedArticles: any;
  searchPersonalPublishedArticles: any;
}

interface IState {
  chosenArticles: IArticle[];
  currentTab: string;
  changeTab: (index: number) => void;
}

class ChooseArticleModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      changeTab: () => {
        return;
      },
      chosenArticles: this.props.chosenArticles || [],
      currentTab: "My articles",
    };
  }

  chooseArticle = (chosenArticle: { id: string; version: string }) => {
    if (
      this.props.limit &&
      this.state.chosenArticles.length >= this.props.limit
    ) {
      if (
        R.find(
          ({ id, version }) =>
            chosenArticle.id === id && chosenArticle.version === version
        )(this.state.chosenArticles)
      ) {
        return this.setState({
          chosenArticles: R.filter<IArticle>(
            ({ id, version }) =>
              id !== chosenArticle.id && version !== chosenArticle.version
          )(this.state.chosenArticles),
        });
      }
      return;
    }
    this.setState({
      chosenArticles: R.find(
        ({ id, version }) =>
          chosenArticle.id === id && chosenArticle.version === version
      )(this.state.chosenArticles)
        ? R.reduce((current: any, next: IArticle) => {
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
  };

  render() {
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
              handleConfirm={confirmModal}
              handleClose={() => closeModalAction()}
              changeTab={this.state.changeTab}
              currentTab={this.state.currentTab}
            />
          }
          title={
            <Title
              limit={this.props.limit}
              chosenArticles={this.state.chosenArticles}
            />
          }
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
  graphql(searchApprovedArticles, {
    name: "searchPublishedArticles",
    options: () => ({
      variables: {
        size: articleSize, // Because lag and no searchbar
      },
    }),
  }),
  graphql(searchApprovedArticles, {
    name: "searchPersonalPublishedArticles",
    options: ({ userId }: { userId: string }) => ({
      variables: {
        category: userId,
        size: articleSize, // Because lag and no searchbar
      },
    }),
  }),
  withApolloError()
)(ChooseArticleModal);
