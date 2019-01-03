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
  search: string;
  sub?: Subscription;
  open: boolean;
}

const handleSearch$: Subject<string> = new Subject();

class NavSearch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dataSource: {
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
      },
      open: false,
      search: "",
    };

    this.collapseSearch = this.collapseSearch.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(300)
      .filter((text: string) => text !== "")
      .flatMap((text: string) =>
        this.props.client.query<{
          searchAutocomplete: {
            content: IResult[];
            totalElementsBreakdown: IElementsBreakdown;
          };
        }>({
          fetchPolicy: "no-cache",
          query: searchAutocomplete,
          variables: {
            page: 0,
            query: text,
            size: 20,
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
            dataSource = {
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
          }
          this.setState({ ...this.state, dataSource });
        },
        (err: string) => console.log(err)
      );
    this.setState({ ...this.state, sub });
  }

  expandSearch() {
    this.setState({ open: true });
  }

  collapseSearch() {
    // this.setState({ open: false, dataSource: [] });
  }

  fetchResults(e: React.ChangeEvent<HTMLInputElement>) {
    handleSearch$.next(e.target.value);
  }

  render() {
    return (
      <NavBarAdjusted
        onMouseEnter={this.expandSearch}
        onMouseLeave={this.collapseSearch}
      >
        <QuickSearchInput open={this.state.open} onChange={this.fetchResults} />
        <QuickSearch
          breakDown={this.state.dataSource.totalElementsBreakdown}
          results={this.state.dataSource.results}
        />
      </NavBarAdjusted>
    );
  }
}

export default NavSearch;
