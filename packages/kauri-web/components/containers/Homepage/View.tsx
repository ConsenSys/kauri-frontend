import React from "react";
import styled from "styled-components";
import { HomePageV2Query as query } from "../../../queries/Homepage";
import {
  HomePageV2,
  HomePageV2Variables,
  HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content,
} from "../../../queries/__generated__/HomePageV2";
import { Query } from "react-apollo";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import SignupBanner from "../../../../kauri-components/components/SignupBanner";
import PublishYourOwnContentCTA from "../../../../kauri-components/components/PublishYourOwnContentCTA";
import TopTags from "../../../../kauri-components/components/TopTags";
import TopContributors from "../../../../kauri-components/components/TopContributors";
import FeaturedContent from "../../../../kauri-components/components/FeaturedContent";
import LatestContent from "../../../../kauri-components/components/LatestContent";
import FeaturedResource, {
  FeaturedResourceContainer,
} from "../../../../kauri-components/components/FeaturedResource";
import CuratedCategory, {
  CuratedCategoriesSection,
} from "../../../../kauri-components/components/CuratedCategory";
import { Link } from "../../../routes";
// import mockData from "./mock";

const SideRow = styled.section`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const HomePageSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const HomePageRow = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.theme.space[3]}px;
  > :not(:only-child) {
    margin-right: ${props => props.theme.space[3]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    flex-direction: column;
  }
`;

interface IProps {
  setNavcolorOverrideAction: any;
  data: {
    searchArticles?: {
      content: Array<[]>;
    };
    getAllCuratedList: Array<[]>;
  };
  hostName: string;
  routeChangeAction: (route: string) => void;
}

const HomePageV2Component: React.FunctionComponent<IProps> = props => {
  return (
    <Query<HomePageV2, HomePageV2Variables>
      query={query}
      variables={{}}
      fetchPolicy={"no-cache"}
    >
      {({ loading, data, error }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return (
            <ErrorMessage
              data={{ error: { message: error.message } }}
              setNavcolorOverrideAction={props.setNavcolorOverrideAction}
            />
          );
        }
        if (
          data &&
          data.getLatestHomepageDescriptor &&
          data.getLatestHomepageDescriptor.rows
        ) {
          return (
            <HomePageSection>
              <SignupBanner
                linkComponent={(children, route) => (
                  <Link href={route}>{children}</Link>
                )}
              />

              {data.getLatestHomepageDescriptor.rows.map((row, index) => {
                return (
                  <HomePageRow key={index}>
                    {row &&
                      row.main &&
                      row.main.map(mainRow => {
                        if (mainRow) {
                          switch (mainRow.__typename) {
                            case "Categories": {
                              if (mainRow.content) {
                                return (
                                  <CuratedCategoriesSection
                                    key={String(mainRow.type)}
                                  >
                                    {mainRow.content.map(
                                      (category, categoryIndex) =>
                                        category && (
                                          <CuratedCategory
                                            key={`${
                                              category.name
                                            }-${categoryIndex}`}
                                            background={category.image}
                                            linkComponent={children => (
                                              <Link
                                                useAnchorTag={true}
                                                href={category.link}
                                              >
                                                {children}
                                              </Link>
                                            )}
                                            category={String(category.name)}
                                            description={String(
                                              category.description
                                            )}
                                          />
                                        )
                                    )}
                                  </CuratedCategoriesSection>
                                );
                              }
                            }

                            case "Featured": {
                              if (mainRow.content) {
                                return (
                                  <FeaturedContent
                                    Link={Link}
                                    content={mainRow.content}
                                  />
                                );
                              }
                            }

                            case "Promo": {
                              if (mainRow.__typename === "Promo") {
                                if (
                                  mainRow.content &&
                                  mainRow.content.length > 0
                                ) {
                                  const resource = mainRow.content.map(
                                    (content: any) => {
                                      if (content !== null) {
                                        return content.resource;
                                      }
                                    }
                                  );

                                  return (
                                    <FeaturedResource
                                      {...resource[0]}
                                      {...resource[0].owner}
                                      resourceType={resource[0].resourceIdentifier.type.toLowerCase()}
                                      ownerResourceType={resource[0].owner.resourceIdentifier.type.toLowerCase()}
                                      linkComponent={(children, route) => (
                                        <Link useAnchorTag={true} route={route}>
                                          {children}
                                        </Link>
                                      )}
                                    />
                                  );
                                }
                              }
                            }

                            case "LatestContent": {
                              if (mainRow.__typename === "LatestContent") {
                                if (
                                  mainRow.content &&
                                  mainRow.content.length > 0
                                ) {
                                  const content = mainRow.content;
                                  return (
                                    <LatestContent
                                      content={content}
                                      Link={Link}
                                    />
                                  );
                                }
                              }
                            }

                            default: {
                              return <p>Main row type needs implementing</p>;
                            }
                          }
                        }
                      })}
                    {row &&
                      row.sidebar &&
                      // Filter out latestcontent sidebar
                      row.sidebar.find(sideBar =>
                        sideBar ? sideBar.__typename !== "LatestContent" : false
                      ) && (
                        <SideRow>
                          {row &&
                            row.sidebar &&
                            row.sidebar.map(sideBar => {
                              if (sideBar) {
                                switch (sideBar.__typename) {
                                  case "Actions": {
                                    return (
                                      <PublishYourOwnContentCTA
                                        key={sideBar.__typename}
                                        linkComponent={(children, route) => (
                                          <Link href={route}>{children}</Link>
                                        )}
                                        content={sideBar.content}
                                      />
                                    );
                                  }

                                  case "TopTags": {
                                    if (sideBar.content) {
                                      const tags = sideBar.content.map(
                                        tag => (tag && tag.name) || ""
                                      );

                                      return (
                                        <TopTags
                                          key={"top tags"}
                                          routeChangeAction={
                                            props.routeChangeAction
                                          }
                                          tags={tags as string[]}
                                        />
                                      );
                                    }
                                  }

                                  case "TopContributors": {
                                    if (
                                      sideBar.content &&
                                      sideBar.__typename === "TopContributors"
                                    ) {
                                      if (sideBar.content) {
                                        const contributors = sideBar.content.map(
                                          contributor =>
                                            (contributor &&
                                              contributor.user && {
                                                avatar: contributor.user.avatar,
                                                userId: String(
                                                  contributor.user.id
                                                ),
                                                username:
                                                  contributor.user.username,
                                              }) || {
                                              avatar: "",
                                              userId: "",
                                              username: "",
                                            }
                                        );

                                        return (
                                          <TopContributors
                                            key={"top contributors"}
                                            linkComponent={(
                                              children,
                                              route
                                            ) => (
                                              <Link
                                                useAnchorTag={true}
                                                href={route}
                                              >
                                                {children}
                                              </Link>
                                            )}
                                            contributors={contributors}
                                          />
                                        );
                                      }
                                    }
                                  }

                                  case "LatestContent": {
                                    return null;
                                  }

                                  default: {
                                    return <p key="side">SIDEBAR ROW</p>;
                                  }
                                }
                              }
                            })}
                        </SideRow>
                      )}
                  </HomePageRow>
                );
              })}
            </HomePageSection>
          );
        }
      }}
    </Query>
  );
};

export default HomePageV2Component;
