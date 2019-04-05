// @flow
import React, { Component } from "react";
import styled from "styled-components";
import CuratedList from "../../../../kauri-components/components/CuratedLists";
import DiscoverSearch from "../Discover/Articles/DiscoverSearch";
import { Helmet } from "react-helmet";
import { Link } from "../../../routes";

type Props = {
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>,
    },
    getAllCuratedList: ?Array<CuratedListDTO>,
  },
  hostName: string,
  routeChangeAction: string => void,
};

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const HomePageHeader = styled.div`
  background-color: #1e2428;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  padding: 20px;
`;
const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: 32px;
  margin-top: 45px;
  margin-bottom: 12px;

  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`;

const KauriDescription = styled.div`
  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`;

class Homepage extends Component<Props> {
  static ContentContainer = ContentContainer;

  render () {
    if (!this.props.data || !this.props.data.getAllCuratedList) {
      return null;
    } // TODO replace with an error message if exists

    const { getAllCuratedList } = this.props.data;

    const pageTitle = "Learn to Build on Ethereum With Kauri";

    return (
      <ContentContainer>
        <Helmet>
          <title>Kauri - {pageTitle}</title>
          <meta name="description" content={pageTitle} />
          <meta
            name="keywords"
            content="ethereum, blockchain, learn to code, developer documentation"
          />
          <link rel="canonical" href={`https://${this.props.hostName}`} />
        </Helmet>
        <HomePageHeader>
          <KauriTitle>{pageTitle}</KauriTitle>
          <KauriDescription>
            Articles, Tutorials, Documentation and Best Practices
          </KauriDescription>
          <DiscoverSearch category={null} />
        </HomePageHeader>
        {getAllCuratedList.map(curatedList => (
          <CuratedList
            Link={Link}
            routeChangeAction={this.props.routeChangeAction}
            key={curatedList.id}
            content={curatedList}
          />
        ))}
      </ContentContainer>
    );
  }
}

export default Homepage;
