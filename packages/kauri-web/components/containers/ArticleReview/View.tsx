import React from "react";
import styled from "../../../lib/styled-components";
import Header from "./Header";
import Diffs from "../../../../kauri-components/components/DiffViewer";
import { Label } from "../../../../kauri-components/components/Typography";
import ScrollIndicator from "../../../../kauri-components/components/ScrollIndicator";
import Loading from "../../common/Loading";

const Container = styled.div`
  background: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 290px;
  margin-left: ${props => props.theme.space[3]}px;
`;

interface IProps {
  userId: string;
  id: string;
  version: string;
  CurrentArticle: any;
  ProposedUpdate: any;
  routeChangeAction: (route: string) => void;
  openModalAction: (children: any) => void;
  closeModalAction: () => void;
  rejectArticleAction: (
    { cause, id, version }: { cause: string; id: string; version: number }
  ) => void;
  approveArticleAction: (
    {
      id,
      version,
      contentHash,
      author,
      dateCreated,
    }: {
      id: string;
      version: number;
      contentHash: string;
      author: string;
      dateCreated: string;
    }
  ) => void;
}

class ArticleReviewView extends React.Component<IProps, {}> {
  render() {
    const { CurrentArticle, ProposedUpdate } = this.props;
    if (!CurrentArticle.getArticle || !ProposedUpdate.getArticle) {
      return <Loading />;
    }

    const current = {
      attributes: CurrentArticle.getArticle.attributes,
      author: CurrentArticle.getArticle.author,
      content: JSON.parse(CurrentArticle.getArticle.content).markdown,
      contentHash: CurrentArticle.getArticle.contentHash,
      dateCreated: CurrentArticle.getArticle.dateCreated,
      owner: CurrentArticle.getArticle.owner.id,
      tags: CurrentArticle.getArticle.tags,
      title: CurrentArticle.getArticle.title,
      version: CurrentArticle.getArticle.version,
    };
    const proposed = {
      attributes: ProposedUpdate.getArticle.attributes,
      author: ProposedUpdate.getArticle.author,
      content: JSON.parse(ProposedUpdate.getArticle.content).markdown,
      contentHash: ProposedUpdate.getArticle.contentHash,
      dateCreated: ProposedUpdate.getArticle.dateCreated,
      status: ProposedUpdate.getArticle.status,
      tags: ProposedUpdate.getArticle.tags,
      title: ProposedUpdate.getArticle.title,
      updateComment: ProposedUpdate.getArticle.updateComment,
      version: ProposedUpdate.getArticle.version,
    };

    return (
      <Container>
        <ScrollIndicator />
        <Header
          routeChangeAction={this.props.routeChangeAction}
          bgUpdated={
            (!current.attributes && proposed.attributes) ||
            (current.attributes &&
              proposed.attributes &&
              current.attributes.background !== proposed.attributes.background)
          }
          date={proposed.dateCreated}
          oldTags={current.tags || []}
          newTags={proposed.tags || []}
          attributes={proposed.attributes}
          title={proposed.title}
          openModalAction={this.props.openModalAction}
          closeModalAction={this.props.closeModalAction}
          rejectArticleAction={this.props.rejectArticleAction}
          approveArticleAction={this.props.approveArticleAction}
          id={this.props.id}
          currentVersion={current.version}
          proposedVersion={proposed.version}
          contentHash={proposed.contentHash}
          author={proposed.author}
          owner={current.owner}
          currentUser={this.props.userId}
          status={proposed.status}
        />
        <Content>
          <Diffs current={current.content} proposed={proposed.content} />
          <Details>
            <Label>Update comment</Label>
            <p>
              {proposed.updateComment
                ? proposed.updateComment
                : "No update comment provided by the contributor"}
            </p>
          </Details>
        </Content>
      </Container>
    );
  }
}

export default ArticleReviewView;
