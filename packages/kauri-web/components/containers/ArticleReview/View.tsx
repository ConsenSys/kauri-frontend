import React from "react";
import styled from "../../../lib/styled-components";
// import HeaderDiff from "./Diffs/Header";
import Diffs from "../../../../kauri-components/components/DiffViewer";

const Container = styled.div``;

interface IProps {
  CurrentArticle: any;
  ProposedUpdate: any;
}

class ArticleReviewView extends React.Component<IProps, {}> {
  render() {
    const current = {
      content: JSON.parse(this.props.CurrentArticle.getArticle.content)
        .markdown,
      tags: this.props.CurrentArticle.getArticle.tags,
      title: this.props.CurrentArticle.getArticle.title,
    };
    const proposed = {
      content: JSON.parse(this.props.ProposedUpdate.getArticle.content)
        .markdown,
      tags: this.props.ProposedUpdate.getArticle.tags,
      title: this.props.ProposedUpdate.getArticle.title,
    };
    return (
      <Container>
        {/* <HeaderDiff titleDiff={titleDiff} tagsDiff={tagsDiff} /> */}
        <Diffs current={current.content} proposed={proposed.content} />
      </Container>
    );
  }
}

export default ArticleReviewView;
