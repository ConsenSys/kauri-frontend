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
import { Link } from "../../../routes";

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
        // if (error) {
        //   return (
        //     <ErrorMessage
        //       data={{ error: { message: error.message } }}
        //       setNavcolorOverrideAction={props.setNavcolorOverrideAction}
        //     />
        //   );
        // }
        if (
          data &&
          data.getLatestHomepageDescriptor &&
          data.getLatestHomepageDescriptor.rows
        ) {
          return data.getLatestHomepageDescriptor.rows.map(
            row =>
              row && (
                <HomePageSection>
                  <p>helo world</p>
                </HomePageSection>
              )
          );
        }
        return (
          <HomePageSection>
            <SignupBanner
              linkComponent={(children, route) => (
                <Link href={route}>{children}</Link>
              )}
            />
          </HomePageSection>
        );
      }}
    </Query>
  );
};

export default HomePageV2Component;
