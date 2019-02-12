import React from "react";
import styled from "../../../lib/styled-components";
import Header from "./Header";
import Diffs from "../../../../kauri-components/components/DiffViewer";
import { Label } from "../../../../kauri-components/components/Typography";
import ScrollIndicator from "../../../../kauri-components/components/ScrollIndicator";

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
    const current = {
      attributes: this.props.CurrentArticle.getArticle.attributes,
      author: this.props.CurrentArticle.getArticle.author,
      content: JSON.parse(this.props.CurrentArticle.getArticle.content)
        .markdown,
      contentHash: this.props.CurrentArticle.getArticle.contentHash,
      dateCreated: this.props.CurrentArticle.getArticle.dateCreated,
      owner: this.props.CurrentArticle.getArticle.owner.id,
      tags: this.props.CurrentArticle.getArticle.tags,
      title: this.props.CurrentArticle.getArticle.title,
      version: this.props.CurrentArticle.getArticle.version,
    };
    const proposed = {
      attributes: this.props.ProposedUpdate.getArticle.attributes,
      author: this.props.ProposedUpdate.getArticle.author,
      content: JSON.parse(this.props.ProposedUpdate.getArticle.content)
        .markdown,
      contentHash: this.props.ProposedUpdate.getArticle.contentHash,
      dateCreated: this.props.ProposedUpdate.getArticle.dateCreated,
      status: this.props.ProposedUpdate.getArticle.status,
      tags: this.props.ProposedUpdate.getArticle.tags,
      title: this.props.ProposedUpdate.getArticle.title,
      version: this.props.ProposedUpdate.getArticle.version,
    };

    return (
      <Container>
        <ScrollIndicator />
        <Header
          routeChangeAction={this.props.routeChangeAction}
          bgUpdated={
            current.attributes.background !== proposed.attributes.background
          }
          date={proposed.dateCreated}
          oldTags={current.tags}
          newTags={proposed.tags}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              imperdiet venenatis pretium. Pellentesque at consequat arcu. Nulla
              nec diam quis orci dapibus accumsan in a nisi. Curabitur sed
              tempor tortor. Nunc fermentum massa sed odio volutpat volutpat.
              Vivamus pulvinar ante sit amet augue tincidunt pretium. Praesent
              lobortis mollis posuere. Nulla vestibulum tortor sed arcu
              pellentesque maximus. Nulla non bibendum nulla. Maecenas mollis
              purus at eros tristique euismod et in sapien.
            </p>
          </Details>
        </Content>
      </Container>
    );
  }
}

export default ArticleReviewView;
