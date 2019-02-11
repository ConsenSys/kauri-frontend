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
}

class ArticleReviewView extends React.Component<IProps, {}> {
  render() {
    const current = {
      attributes: this.props.CurrentArticle.getArticle.attributes,
      content: JSON.parse(this.props.CurrentArticle.getArticle.content)
        .markdown,
      tags: this.props.CurrentArticle.getArticle.tags,
      title: this.props.CurrentArticle.getArticle.title,
    };
    const proposed = {
      attributes: this.props.CurrentArticle.getArticle.attributes,
      content: JSON.parse(this.props.ProposedUpdate.getArticle.content)
        .markdown,
      date: this.props.ProposedUpdate.getArticle.dateCreated,
      tags: this.props.ProposedUpdate.getArticle.tags,
      title: this.props.ProposedUpdate.getArticle.title,
    };

    return (
      <Container>
        <ScrollIndicator />
        <Header
          routeChangeAction={this.props.routeChangeAction}
          bgUpdated={
            current.attributes.background !== proposed.attributes.background
          }
          date={proposed.date}
          tags={proposed.tags}
          attributes={proposed.attributes}
          title={proposed.title}
          openModalAction={this.props.openModalAction}
          closeModalAction={this.props.closeModalAction}
          rejectArticleAction={this.props.rejectArticleAction}
          id={this.props.id}
          version={this.props.version}
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
