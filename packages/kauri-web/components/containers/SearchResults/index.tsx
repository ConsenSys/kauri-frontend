import React from "react";
import styled from "styled-components";
import ResourceSearch from "./ResourceSearch";
import {
  Title1,
  BodyCard,
} from "../../../../kauri-components/components/Typography";

const ArticlesHeader = styled.div`
  background-color: ${props => props.theme.colors.primaryTextColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[3]}px;
  padding-bottom: ${props => props.theme.space[3]}px;
`;

// interface IProps {}

class SearchResults extends React.Component {
  render() {
    return (
      <ArticlesHeader>
        <Title1 color="white">Search</Title1>
        <BodyCard>24 Results</BodyCard>
        <ResourceSearch />
      </ArticlesHeader>
    );
  }
}

export default SearchResults;
