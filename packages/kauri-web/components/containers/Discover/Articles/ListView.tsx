import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
// @ts-ignore
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";
import R from "ramda";
import moment from "moment";
import {
  globalSearchApprovedArticles_searchArticles,
  globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO,
} from "../../../../queries/__generated__/globalSearchApprovedArticles";

interface IProps {
  ArticlesQuery: {
    error: string;
    searchArticles?: globalSearchApprovedArticles_searchArticles;
  };
  hostName: string;
  routeChangeAction(route: string): void;
}

const Article = t.interface({
  attributes: t.union([t.any, t.undefined]),
  content: t.string,
  dateCreated: t.string,
  id: t.string,
  title: t.string,
  version: t.number,
});

class Articles extends Component<IProps> {
  render() {
    if (this.props.ArticlesQuery.error) {
      return null;
    } // TODO replace with an error message if exists

    const { searchArticles } = this.props.ArticlesQuery;

    return (
      <Fragment>
        <Helmet>
          <title>Kauri - Discover Articles</title>
          <meta
            name="description"
            content="Discover the best blockchain related articles, tutorials and how-to guides"
          />
          <meta
            name="keywords"
            content="ethereum, blockchain, learn to code, developer documentation"
          />
          <link
            rel="canonical"
            href={`https://${this.props.hostName}/articles`}
          />
        </Helmet>
        {searchArticles &&
        searchArticles.content &&
        searchArticles.content.length > 0 ? (
          <Masonry minWidth={310} columns={4}>
            {searchArticles.content.map(undecodedArticle => {
              const resourceType = R.path([
                "owner",
                "resourceIdentifier",
                "type",
              ])(undecodedArticle);

              const owner = undecodedArticle && undecodedArticle.owner;

              const article = Article.decode(undecodedArticle).getOrElseL(
                errors => {
                  throw new Error(failure(errors).join("m"));
                }
              );

              return (
                <ArticleCard
                  changeRoute={this.props.routeChangeAction}
                  key={(article && article.id) || undefined}
                  date={moment(article && article.dateCreated).format(
                    "D MMM YYYY"
                  )}
                  title={article && article.title}
                  content={article && article.content}
                  username={
                    owner &&
                    owner.resourceIdentifier &&
                    owner.resourceIdentifier.type &&
                    owner.resourceIdentifier.type.toLowerCase() === "community"
                      ? owner && owner.name
                      : owner &&
                        (owner as globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO)
                          .username
                  }
                  userId={
                    owner
                      ? typeof owner.id === "string"
                        ? owner.id
                        : "Anoymous"
                      : "Anonymous"
                  }
                  userAvatar={owner && owner.avatar}
                  id={article && article.id}
                  version={article && article.version}
                  cardHeight={420}
                  imageURL={
                    article &&
                    article.attributes &&
                    article.attributes.background
                  }
                  linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                  ) => (
                    <Link
                      toSlug={
                        route.includes("article") && article && article.title
                      }
                      useAnchorTag={true}
                      href={route}
                    >
                      {childrenProps}
                    </Link>
                  )}
                  resourceType={
                    typeof resourceType === "string"
                      ? (R.toLower(resourceType) as "community" | "article")
                      : null
                  }
                />
              );
            })}
          </Masonry>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Articles;
