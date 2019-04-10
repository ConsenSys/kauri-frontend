import React from "react";
import styled from "styled-components";
import { HomePageV2Query as query } from "../../../queries/Homepage";
import {
  HomePageV2,
  HomePageV2Variables,
} from "../../../queries/__generated__/HomePageV2";
import { Query } from "react-apollo";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import SignupBanner from "../../../../kauri-components/components/SignupBanner";
import PublishYourOwnContentCTA from "../../../../kauri-components/components/PublishYourOwnContentCTA";
import TopTags from "../../../../kauri-components/components/TopTags";
import FeaturedContent from "../../../../kauri-components/components/FeaturedContent";
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
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
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
                                      (category, index) =>
                                        category && (
                                          <CuratedCategory
                                            key={`${category.name}-${index}`}
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
                          }
                        }
                      })}
                    <SideRow>
                      {row &&
                        row.sidebar &&
                        row.sidebar.map(sideBar => {
                          if (sideBar) {
                            switch (sideBar.__typename) {
                              case "Actions": {
                                return (
                                  <PublishYourOwnContentCTA
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
                                      routeChangeAction={
                                        props.routeChangeAction
                                      }
                                      tags={tags as string[]}
                                    />
                                  );
                                }
                              }

                              default: {
                                return <p key="side">SIDEBAR ROW</p>;
                              }
                            }
                          }
                        })}
                    </SideRow>
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
