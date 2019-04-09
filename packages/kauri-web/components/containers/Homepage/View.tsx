import React from "react";
import styled from "styled-components";
import { HomePageV2Query as query } from "../../../queries/Homepage";
import {
  HomePageV2,
  HomePageV2Variables,
  HomePageV2_getLatestHomepageDescriptor_rows_main,
} from "../../../queries/__generated__/HomePageV2";
import { Query } from "react-apollo";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import SignupBanner from "../../../../kauri-components/components/SignupBanner";
import FeaturedContent from "../../../../kauri-components/components/FeaturedContent";
import CuratedCategory, {
  CuratedCategoriesSection,
} from "../../../../kauri-components/components/CuratedCategory";
import { Link } from "../../../routes";
import mockData from "./mock";

const HomePageSection = styled.section`
  display: flex;
  flex-direction: column;
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

              {data.getLatestHomepageDescriptor.rows.map(row => {
                if (row && row.main) {
                  return row.main.map(mainRow => {
                    if (mainRow) {
                      switch (mainRow.__typename) {
                        case "Categories": {
                          if (mainRow.content) {
                            return (
                              <CuratedCategoriesSection>
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
                  });
                }
              })}
            </HomePageSection>
          );
        }
      }}
    </Query>
  );
};

export default HomePageV2Component;
