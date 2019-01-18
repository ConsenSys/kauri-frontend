import React from "react";
import QuickSearch, {
  IResult,
  IElementsBreakdown,
} from "../../../../kauri-components/components/Search/QuickSearch";
import QuickSearchInput from "../../../../kauri-components/components/Search/QuickSearchInput";
import styled from "styled-components";
import { searchAutocomplete } from "../../../queries/Search";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import ApolloClient from "apollo-client";

const EmptyData = {
  results: [],
  totalElementsBreakdown: {
    ARTICLE: 0,
    COLLECTION: 0,
    COMMENT: 0,
    COMMUNITY: 0,
    CURATED_LIST: 0,
    REQUEST: 0,
    USER: 0,
  },
};

const NavBarAdjusted = styled.div`
  margin-top: 20px;

  & .icon {
    top: -10px;
  }
`;

interface IProps {
  client: ApolloClient<{}>;
  routeChangeAction: (route: string) => void;
}

interface IDataSource {
  results: IResult[];
  totalElementsBreakdown: IElementsBreakdown;
}

interface IState {
  dataSource: IDataSource;
  sub?: Subscription;
  open: boolean;
  value: string;
  type: string | null;
}

interface ISearch {
  value: string;
  type?: string;
}

const handleSearch$: Subject<ISearch> = new Subject();

class NavSearch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dataSource: EmptyData,
      open: false,
      type: null,
      value: "",
    };

    this.collapseSearch = this.collapseSearch.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(200)
      .filter((search: ISearch) => search.value !== "")
      .flatMap(() =>
        this.props.client.query<{
          searchAutocomplete: {
            content: IResult[];
            totalElementsBreakdown: IElementsBreakdown;
          };
        }>({
          fetchPolicy: "no-cache",
          query: searchAutocomplete,
          variables: {
            filter: {
              type: this.state.type,
            },
            page: 0,
            query: this.state.value,
            size: 10,
          },
        })
      )
      .map(({ data: { searchAutocomplete: queryResult } }) => ({
        results: queryResult.content,
        totalElementsBreakdown: queryResult.totalElementsBreakdown,
      }))
      .subscribe(
        (dataSource: IDataSource) => {
          if (dataSource.results.length === 0) {
            dataSource = EmptyData;
          }
          if (this.state.type) {
            dataSource.totalElementsBreakdown = this.state.dataSource.totalElementsBreakdown; // do not reset tabs if the query did not change
          }
          this.setState({ ...this.state, dataSource });
        },
        (err: string) => console.log(err)
      );
    this.setState({ ...this.state, sub });
  }

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  expandSearch() {
    this.setState({ open: true });
  }

  collapseSearch() {
    this.setState({ open: false, dataSource: EmptyData });
  }

  fetchResults(value: string, type?: string) {
    console.log(value);
    this.setState({ value, type: type ? type : null });
    handleSearch$.next({ value });
  }

  render() {
    return (
      <NavBarAdjusted
        onMouseEnter={this.expandSearch}
        onMouseLeave={this.collapseSearch}
      >
        <QuickSearchInput
          open={this.state.open}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.fetchResults(e.target.value)
          }
        />
        <QuickSearch
          fetchByType={(type: string) =>
            this.fetchResults(this.state.value, type)
          }
          routeChangeAction={this.props.routeChangeAction}
          maxResults={3}
          breakDown={this.state.dataSource.totalElementsBreakdown}
          results={this.state.dataSource.results}
        />
      </NavBarAdjusted>
    );
  }
}

export default NavSearch;
