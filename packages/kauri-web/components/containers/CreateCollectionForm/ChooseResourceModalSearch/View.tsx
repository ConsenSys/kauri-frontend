import React from "react";
import QuickSearch, {
  IResult,
  IElementsBreakdown,
} from "../../../../../kauri-components/components/Search/QuickSearch";
import QuickSearchInput from "../../../../../kauri-components/components/Search/QuickSearchInput";
import styled from "styled-components";
import { searchAutocomplete } from "../../../../queries/Search";
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
  z-index: 100;
`;

const Overlay = styled.div<{ open: boolean }>`
  height: ${props => (props.open ? "100%" : 0)};
  width: ${props => (props.open ? "100%" : 0)};
  opacity: ${props => (props.open ? 1 : 0)};
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  transition: opacity 0.3s;
`;

interface IProps {
  userId: string;
  query: any;
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
  hovered: boolean;
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
      hovered: false,
      open: false,
      type: null,
      value: "",
    };

    this.collapseSearch = this.collapseSearch.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
    this.goToAdvancedSearch = this.goToAdvancedSearch.bind(this);
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(200)
      .filter((search: ISearch) => search.value !== "")
      .flatMap(() =>
        this.props.query.refetch({
          category: this.props.userId,
          page: 0,
          size: 8,
          text: this.state.value,
        })
      )
      .map(({ data: { searchArticles: queryResult } }) => ({
        results: queryResult.content,
        totalElementsBreakdown: queryResult.totalElementsBreakdown,
      }))
      .subscribe(
        (dataSource: IDataSource) => {
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
    this.setState({ open: true, hovered: true });
  }

  collapseSearch() {
    this.setState({ hovered: false });
    setTimeout(() => {
      if (this.state.hovered) {
        return null;
      } else {
        return this.setState({ open: false, value: "", dataSource: EmptyData });
      }
    }, 1000);
  }

  fetchResults(value: string, type?: string) {
    this.setState({ value, type: type ? type : null });
    handleSearch$.next({ value });
  }

  goToAdvancedSearch(search: string) {
    this.props.routeChangeAction(`/search-results?q=${search}`);
  }

  render() {
    return (
      <>
        <NavBarAdjusted
          onMouseEnter={this.expandSearch}
          onMouseLeave={this.collapseSearch}
        >
          <QuickSearchInput
            open={this.state.open}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.fetchResults(e.target.value)
            }
            goToSearch={this.goToAdvancedSearch}
            value={this.state.value}
          />
          {/* {JSON.stringify(this.state.dataSource.results, 2)} */}
          {/* <QuickSearch
            value={this.state.value}
            fetchByType={(type: string) =>
              this.fetchResults(this.state.value, type)
            }
            routeChangeAction={this.props.routeChangeAction}
            maxResults={3}
            breakDown={this.state.dataSource.totalElementsBreakdown}
            results={this.state.dataSource.results}
          /> */}
        </NavBarAdjusted>
        <Overlay open={this.state.open} onClick={this.collapseSearch} />
      </>
    );
  }
}

export default NavSearch;
