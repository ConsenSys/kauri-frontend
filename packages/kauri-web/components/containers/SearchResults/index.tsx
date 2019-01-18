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
  viewedSearchCategory: string;
}

export interface IProps {
  query: {
    q?: string;
    type?: "COMMUNITY" | "ARTICLE" | "COLLECTION";
  };
  router: any;
}

class SearchResults extends React.Component<IProps, IState> {
  state = {
    dataSource: emptyData,
    loading: true,
    viewedSearchCategory:
      (this.props.query && this.props.query.type) || "ARTICLE",
  };

  setSearchResults = (
    dataSource: IDataSource,
    loading: boolean,
    viewedSearchCategory: string
  ) =>
    this.setState({ ...this.state, dataSource, loading, viewedSearchCategory });

  setSearchCategory = (viewedSearchCategory: string) =>
    this.setState({ ...this.state, viewedSearchCategory });

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
          setSearchCategory={this.setSearchCategory}
          viewedSearchCategory={this.state.viewedSearchCategory}
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
