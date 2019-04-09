import React, { Component } from "react";
import styled from "styled-components";
import CuratedList from "../../../../kauri-components/components/CuratedLists";
import DiscoverSearch from "../Discover/Articles/DiscoverSearch";
import { Helmet } from "react-helmet";
import { Link } from "../../../routes";

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

const HomePageSection = styled.section`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  data: {
    searchArticles?: {
      content: Array<[]>;
    };
    getAllCuratedList: Array<[]>;
  };
  hostName: string;
  routeChangeAction: (route: string) => void;
}

const HomePageV2: React.FunctionComponent<IProps> = () => (
  <HomePageSection>
    <p>helo world</p>
  </HomePageSection>
);

export default HomePageV2;
