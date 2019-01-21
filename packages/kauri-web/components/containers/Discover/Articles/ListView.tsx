import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";
import PrimaryButton from "../../../../../kauri-components/components/Button/PrimaryButton";
import AddToCollectionConnection from "../../../connections/AddToCollection";
import R from "ramda";
import {
  searchAutocompleteArticles_searchAutocomplete,
  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO,
  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO,
  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO,
} from "../../../../queries/__generated__/searchAutocompleteArticles";
import { INFT } from "../../../../../kauri-components/components/Kudos/NFTList";

interface IProps {
  ArticlesQuery: {
    error: string;
    searchAutocomplete?: searchAutocompleteArticles_searchAutocomplete;
  };
  hostName: string;
  isLoggedIn: boolean;
  openModalAction: (payload: { children: React.ReactElement<any> }) => void;
  routeChangeAction(route: string): void;
}

interface IExtenderArticlesWithKudos
  extends searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO {
  associatedNfts: INFT[];
}

class Articles extends Component<IProps> {
  render() {
    if (this.props.ArticlesQuery.error) {
      return null;
    } // TODO replace with an error message if exists

    const { searchAutocomplete } = this.props.ArticlesQuery;
    const { isLoggedIn, openModalAction } = this.props;

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
        {searchAutocomplete &&
        searchAutocomplete.content &&
        searchAutocomplete.content.length > 0 ? (
          <Masonry minWidth={310} columns={4}>
            {searchAutocomplete.content.map(articleResult => {
              const article =
                articleResult &&
                (articleResult.resource as IExtenderArticlesWithKudos);
              if (!article) {
                return <></>;
              }
              const resourceType = article.resourceIdentifier;
              const owner =
                R.path<
                  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO
                >(["owner"])(article) ||
                R.path<
                  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO
                >(["owner"])(article);

              return (
                <ArticleCard
                  key={article.id || undefined}
                  date={article.dateCreated}
                  tags={article.tags as string[]}
                  title={article.title || ""}
                  content={article.content || ""}
                  username={
                    (owner &&
                    owner.resourceIdentifier &&
                    owner.resourceIdentifier.type &&
                    owner.resourceIdentifier.type.toLowerCase() === "community"
                      ? owner && owner.name
                      : owner &&
                        (owner as searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO)
                          .username) || null
                  }
                  userId={
                    owner
                      ? typeof owner.id === "string"
                        ? owner.id
                        : "Anoymous"
                      : "Anonymous"
                  }
                  userAvatar={(owner && owner.avatar) || null}
                  id={article.id || ""}
                  version={article.version || 1}
                  cardHeight={420}
                  imageURL={
                    article &&
                    article.attributes &&
                    article.attributes.background
                  }
                  nfts={article.associatedNfts}
                  isLoggedIn={isLoggedIn}
                  linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                  ) => (
                    <Link
                      toSlug={route.includes("article") && article.title}
                      useAnchorTag={true}
                      href={route}
                    >
                      {childrenProps}
                    </Link>
                  )}
                  resourceType={
                    (typeof resourceType === "string" &&
                      (resourceType as "USER" | "COMMUNITY")) ||
                    "USER"
                  }
                  hoverChildren={() => (
                    <PrimaryButton
                      handleClick={() =>
                        openModalAction({
                          children: (
                            <AddToCollectionConnection
                              articleId={article.id || ""}
                              version={article.version || 1}
                            />
                          ),
                        })
                      }
                    >
                      Add to collection
                    </PrimaryButton>
                  )}
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
