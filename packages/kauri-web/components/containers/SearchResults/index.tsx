import React from "react";
import styled from "styled-components";
import ResourceSearch from "./ResourceSearch";
import {
  Title1,
  BodyCard,
} from "../../../../kauri-components/components/Typography";
import { IResult } from "../../../../kauri-components/components/Search/QuickSearch";
import ResourceResults from "./ResourceResults";

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

interface IState {
  results: IResult[];
}

interface IProps {
  query: {
    q?: string;
    type?: "community" | "article" | "collection";
  };
}

class SearchResults extends React.Component<IProps, IState> {
  setSearchResults = (results: IResult[]) => this.setState({ results });

  render() {
    // console.log(this.state);
    return (
      <ArticlesHeader>
        <Title1 color="white">Search</Title1>
        <BodyCard>24 Results</BodyCard>
        <ResourceSearch setSearchResults={this.setSearchResults} />
        <ResourceResults />
      </ArticlesHeader>
    );
  }
}

export default SearchResults;
