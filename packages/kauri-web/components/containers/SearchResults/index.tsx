import React from "react";
import styled from "styled-components";
import ResourceSearch, { IDataSource, emptyData } from "./ResourceSearch";
import {
  Title1,
  BodyCard,
} from "../../../../kauri-components/components/Typography";
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
  dataSource: IDataSource;
  loading: boolean;
}

export interface IProps {
  query: {
    q?: string;
    type?: "community" | "article" | "collection";
  };
  router: any;
}

class SearchResults extends React.Component<IProps, IState> {
  state = {
    dataSource: emptyData,
    loading: true,
    viewedSearchCategory:
      (this.props.query && this.props.query.type) || "article",
  };

  setSearchResults = (dataSource: IDataSource, loading: boolean) =>
    this.setState({ dataSource, loading });

  render() {
    // console.log(this.state);
    const totalResults = Object.values(
      this.state.dataSource && this.state.dataSource.totalElementsBreakdown
    ).reduce((current, next) => current + next, 0);

    return (
      <section>
        <ArticlesHeader>
          <Title1 color="white">Search</Title1>
          <BodyCard>
            {this.state.loading ? "Loading results" : `${totalResults} Results`}
          </BodyCard>
          <ResourceSearch
            query={this.props.query}
            setSearchResults={this.setSearchResults}
            router={this.props.router}
          />
        </ArticlesHeader>
        <ResourceResults
          loading={this.state.loading}
          results={this.state.dataSource && this.state.dataSource.results}
          totalElementsBreakdown={
            this.state.dataSource &&
            this.state.dataSource.totalElementsBreakdown
          }
        />
      </section>
    );
  }
}

export default SearchResults;
