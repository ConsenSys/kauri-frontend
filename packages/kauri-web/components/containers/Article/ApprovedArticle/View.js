// @flow
import React from "react";
import R from "ramda";
import styled from "styled-components";
import Actions from "./ApprovedArticleActions";
import Content from "./ApprovedArticleContent";
import Header from "./ApprovedArticleHeader";
import Footer from "./ApprovedArticleFooter";
import Comments from "./ApprovedArticleComments";
import { hljs } from "../../../../lib/hljs";
import ScrollToTopOnMount from "../../../../../kauri-components/components/ScrollToTopOnMount";
import ScrollToTopButton from "../../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton";
import type { TipArticlePayload } from "../Module";
import withSchema from "../../../../lib/with-schema";
import ScrollIndicator from "../../../../../kauri-components/components/ScrollIndicator";
import analytics from "../../../../lib/analytics";

const ArticleContent = styled.section`
  background: white;
  height: 100%;
`;

type Props =
  | {
      userId?: string,
      routeChangeAction: string => void,
      tipArticleAction: TipArticlePayload => void,
      ethUsdPrice: number,
      address?: string,
      data: { getArticle: ArticleDTO },
      openModalAction: ({ children: React.ReactNode }) => void,
      proposedCommunityId?: string,
    }
  | any;

class ApprovedArticle extends React.Component<Props, State> {
  static Header = Header;
  static Actions = Actions;
  static Content = Content;
  static Footer = Footer;
  static Comments = Comments;

  componentDidUpdate () {
    R.map(block => hljs.highlightBlock(block))(
      document.querySelectorAll("pre code")
    );
  }

  componentDidMount () {
    R.map(block => hljs.highlightBlock(block))(
      document.querySelectorAll("pre code")
    );
    analytics.track("Read Article", {
      category: "article_actions",
    });
  }

  render () {
    const props = this.props;
    if (!props.data.getArticle) return;
    const { associatedNfts } = props.data.getArticle;
    const hostName = `https://${props.hostName.replace(/api\./g, "")}`;

    const resourceType = R.path([
      "data",
      "getArticle",
      "owner",
      "resourceIdentifier",
      "type",
    ])(props);

    const isCommunityOwned = resourceType === "COMMUNITY";

    return (
      <ArticleContent>
        <ScrollIndicator />
        <ScrollToTopOnMount />
        <ScrollToTopButton />
        <ApprovedArticle.Header
          {...props.data.getArticle}
          ownerId={
            props.data.getArticle &&
            props.data.getArticle.owner &&
            props.data.getArticle.owner.id
          }
          username={
            R.path(["data", "getArticle", "contributors", "0", "name"])(
              props
            ) || R.path(["data", "getArticle", "author", "name"])(props)
          }
          userAvatar={
            R.path(["data", "getArticle", "contributors", "0", "avatar"])(
              props
            ) || R.path(["data", "getArticle", "author", "avatar"])(props)
          }
          authorId={
            R.path(["data", "getArticle", "contributors", "0", "id"])(props) ||
            R.path(["data", "getArticle", "author", "id"])(props)
          }
          hostName={hostName}
          routeChangeAction={props.routeChangeAction}
        />
        <ApprovedArticle.Content
          text={props.data.getArticle && props.data.getArticle.content}
          subject={props.data.getArticle && props.data.getArticle.title}
          status={props.data.getArticle && props.data.getArticle.status}
          id={props.data.getArticle && props.data.getArticle.id}
          version={props.data.getArticle && props.data.getArticle.version}
          owner={props.data.getArticle.owner}
          ownerId={
            props.data.getArticle &&
            props.data.getArticle.owner &&
            props.data.getArticle.owner.id
          }
          nfts={associatedNfts}
          username={
            R.path(["data", "getArticle", "contributors", "0", "name"])(
              props
            ) || R.path(["data", "getArticle", "author", "name"])(props)
          }
          userAvatar={
            R.path(["data", "getArticle", "contributors", "0", "avatar"])(
              props
            ) || R.path(["data", "getArticle", "author", "avatar"])(props)
          }
          authorId={
            R.path(["data", "getArticle", "contributors", "0", "id"])(props) ||
            R.path(["data", "getArticle", "author", "id"])(props)
          }
          userId={this.props.userId}
          author={
            R.path(["data", "getArticle", "contributors", "0"])(props) ||
            R.path(["data", "getArticle", "author"])(props)
          }
          routeChangeAction={props.routeChangeAction}
          address={props.userId}
          hostName={hostName}
          resourceType={typeof resourceType === "string" && resourceType}
          openModalAction={props.openModalAction}
          closeModalAction={props.closeModalAction}
          deleteDraftArticleAction={props.deleteDraftArticleAction}
          relatedArticles={R.path([
            "RelatedArticles",
            "searchMoreLikeThis",
            "content",
          ])(props)}
        />
        <ApprovedArticle.Footer
          isLoggedIn={!!props.userId}
          metadata={props.data.getArticle && props.data.getArticle.attributes}
          articleCheckpointed={R.path(["data", "getArticle", "checkpoint"])(
            props
          )}
          status={R.path(["data", "getArticle", "status"])(props)}
          ownerId={
            props.data.getArticle &&
            props.data.getArticle.owner &&
            props.data.getArticle.owner.id
          }
          userId={this.props.userId}
          username={
            props.data.getArticle &&
            props.data.getArticle.owner &&
            (props.data.getArticle.owner.username ||
              props.data.getArticle.author.username)
          }
          date_updated={
            props.data.getArticle &&
            props.data.getArticle &&
            props.data.getArticle.datePublished
          }
          content_hash={
            props.data.getArticle &&
            props.data.getArticle &&
            props.data.getArticle.contentHash
          }
          apiURL={`https://${process.env.monolithExternalApi}`}
          loginFirstToVote={() =>
            props.routeChangeAction(
              `/login?r=/article/${props.data.getArticle &&
                props.data.getArticle.id}/v${props.data.getArticle &&
                props.data.getArticle.version}`
            )
          }
          positiveVoteAction={() =>
            props.voteAction({
              resourceId: {
                type: "ARTICLE",
                id: props.data.getArticle && props.data.getArticle.id,
              },
              value: 1,
            })
          }
          negativeVoteAction={() =>
            props.voteAction({
              resourceId: {
                type: "ARTICLE",
                id: props.data.getArticle && props.data.getArticle.id,
              },
              value: -1,
            })
          }
          voteResult={props.data.getArticle && props.data.getArticle.voteResult}
          relatedArticles={R.path([
            "RelatedArticles",
            "searchMoreLikeThis",
            "content",
          ])(props)}
          routeChangeAction={props.routeChangeAction}
          proposedCommunityId={props.proposedCommunityId}
        />
        <ApprovedArticle.Comments
          id={props.data.getArticle && props.data.getArticle.id}
          version={props.data.getArticle && props.data.getArticle.version}
          comments={
            props.data.getArticle &&
            props.data.getArticle.comments &&
            props.data.getArticle.comments.content
          }
          userId={this.props.userId}
          username={
            props.data.getArticle &&
            props.data.getArticle.owner &&
            props.data.getArticle.owner.username
          }
          authorId={
            props.data.getArticle &&
            props.data.getArticle.author &&
            props.data.getArticle.author.id
          }
        />
      </ArticleContent>
    );
  }
}

export default withSchema(ApprovedArticle);
