import React from "react";
import styled from "../../../lib/styled-components";
import ContentDiff from "./Diffs/ContentDiff";
import HeaderDiff from "./Diffs/Header";
// import Actions from "./Diffs/Actions";
const JsDiff = require("diff");

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

    const contentDiff = JsDiff.diffLines(current.content, proposed.content, {
      newlineIsToken: true,
    });
    const titleDiff = JsDiff.diffChars(current.title, proposed.title);
    const tagsDiff = JsDiff.diffArrays(current.tags, proposed.tags);
    return (
      <Container>
        <HeaderDiff titleDiff={titleDiff} tagsDiff={tagsDiff} />
        {/* <Actions /> */}
        <ContentDiff contentDiff={contentDiff} />
      </Container>
    );
  }
}

export default ArticleReviewView;
