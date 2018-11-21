import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
// @ts-ignore
import ArticleCard from '../../../../../kauri-components/components/Card/ArticleCard'
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
// @ts-ignore
import Masonry from '../../../../../kauri-components/components/Layout/Masonry';
import R from 'ramda'
import moment from "moment";
import { globalSearchApprovedArticles_searchArticles, globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO } from '../../../../queries/__generated__/globalSearchApprovedArticles';

interface IProps {
  ArticlesQuery: {
    error: string;
    searchArticles?: globalSearchApprovedArticles_searchArticles,
  },
  hostName: string,
  routeChangeAction(route: string): void;
};

const 

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
        {searchArticles && searchArticles.content && searchArticles.content.length > 0 ? (
          <Masonry minWidth={310} columns={4}>
            {searchArticles.content.map((article) => {
              const resourceType = R.path(['owner', 'resourceIdentifier', 'type'])(article)

              const owner = article && article.owner;

              return (
                <ArticleCard
                  changeRoute={this.props.routeChangeAction}
                  key={article && article.id}
                  date={moment(article && article.dateCreated).format('D MMM YYYY')}
                  title={article && article.title}
                  content={article && article.content}
                  username={
                    owner && owner.resourceIdentifier &&
                    owner.resourceIdentifier.type && owner.resourceIdentifier.type.toLowerCase() === 'community'
                      ? owner && owner.name
                      : owner && (owner as globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO).username
                  }
                  userId={owner ? owner.id : 'Anonymous'}
                  userAvatar={owner && owner.avatar}
                  id={article && article.id}
                  version={article && article.version}
                  cardHeight={420}
                  imageURL={article && article.attributes && article.attributes.background}
                  linkComponent={(childrenProps: Element[], route: string) => (
                    <Link toSlug={route.includes('article') && article && article.title} useAnchorTag={true} href={route}>
                      {childrenProps}
                    </Link>
                  )}
                  resourceType={typeof resourceType === 'string' && R.toLower(resourceType)}
                />
              )
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
