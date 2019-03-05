import React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-client";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { searchResultsAutocompleteTotalElementsBreakdown } from "../../../queries/Search";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import { searchResultsAutocomplete_searchAutocomplete_content } from "../../../queries/__generated__/searchResultsAutocomplete";
import { IProps as IQueryProps } from "./index";
import { routeChangeAction } from "../../../lib/Module";

const SearchSVG = () => (
  <div className="certain-category-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0977 20.6834 22.0977 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z"
        fill="white"
      />
    </svg>
  </div>
);

const SearchInput = styled.input`
  border: 1px solid white;
  border-radius: 4px;
  background: transparent;
  height: 40px;
  outline: none;
  padding: 0 ${props => props.theme.space[1]}px;
`;

interface ISearchWrapperProps {
  collapsible: boolean;
}

const SearchWrapper = styled<ISearchWrapperProps, "div">("div")`
  width: 300px;
  margin-bottom: 64px;
  margin-top: 19px;
  display: grid;
  position: relative;
  border-radius: 4px;

  &:hover {
    & > input {
      border: 1px solid #209b86;
    }
  }

  & > .certain-category-icon {
    position: absolute;
    top: 11px;
    right: 9px;
  }
`;

export interface IDataSource {
  results: searchResultsAutocomplete_searchAutocomplete_content[];
  totalElementsBreakdown: IElementsBreakdown;
}

interface IProps {
  client: ApolloClient<{}>;
  routeChangeAction: (route: string) => void;
  setSearchResults: (
    dataSource: IDataSource,
    loading: boolean,
    viewedSearchCategory: string
  ) => void;
  router: any;
  viewedSearchCategory: string;
  setSearchCategory: (category: string) => void;
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

export const emptyData: IDataSource = {
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

class Complete extends React.Component<
  IProps & ISearchWrapperProps & IQueryProps,
  IState
> {
  constructor(props: IProps & ISearchWrapperProps & IQueryProps) {
    super(props);
    this.state = {
      dataSource: emptyData,
      open: false,
      type: null,
      value: this.props.query.q || "",
    };
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(300)
      .filter((search: ISearch) => search.value !== "")
      .do(() =>
        this.props.setSearchResults(
          emptyData,
          true,
          this.props.viewedSearchCategory
        )
      )
      .flatMap(() =>
        this.props.client.query<{
          searchAutocomplete: {
            content: searchResultsAutocomplete_searchAutocomplete_content[];
            totalElementsBreakdown: IElementsBreakdown;
          };
        }>({
          fetchPolicy: "no-cache",
          query: searchResultsAutocompleteTotalElementsBreakdown,
          variables: {
            filter: {},
            page: 0,
            query: this.state.value,
            size: 100,
          },
        })
      )
      .map(({ data: { searchAutocomplete } }) => ({
        results: searchAutocomplete.content,
        totalElementsBreakdown: searchAutocomplete.totalElementsBreakdown,
      }))
      .subscribe(dataSource => {
        const newViewedSearchCategory =
          this.props.query.default_category ||
          Object.keys(dataSource.totalElementsBreakdown).filter(
            category =>
              dataSource.totalElementsBreakdown[category] > 0 &&
              category === this.props.viewedSearchCategory
          )[0] ||
          Object.keys(dataSource.totalElementsBreakdown)
            .filter(category => dataSource.totalElementsBreakdown[category] > 0)
            .sort()[0];

        this.props.setSearchResults(
          Array.isArray(dataSource.results) && dataSource.results.length === 0
            ? emptyData
            : dataSource,
          false,
          newViewedSearchCategory
        );

        this.setState({
          ...this.state,
          dataSource,
        });

        const newRoute = `/search-results?q=${this.state.value}`;
        this.props.router.push(newRoute, newRoute, { shallow: true });
      });
    this.setState({ ...this.state, sub });

    if (this.props.query.q) {
      handleSearch$.next({ value: this.props.query.q });
      this.setState({ ...this.state, value: this.props.query.q });
    }
  }

  componentDidUpdate(prevProps: IProps & ISearchWrapperProps & IQueryProps) {
    if (
      typeof this.props.query.q === "string" &&
      typeof this.props.query.default_category === "string"
    ) {
      if (
        prevProps.query.q !== this.props.query.q ||
        prevProps.query.default_category !== this.props.query.default_category
      ) {
        this.fetchResults(
          this.props.query.q,
          this.props.query.default_category
        );
        this.props.setSearchCategory(this.props.query.default_category);
      }
    }
  }

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  fetchResults(value: string, type?: string) {
    this.setState({ ...this.state, value, type: type ? type : null });
    handleSearch$.next({ value });
  }

  render() {
    return (
      <SearchWrapper
        collapsible={this.props.collapsible}
        className="global-search-wrapper"
      >
        <SearchInput
          value={this.state.value}
          onChange={e => this.fetchResults(e.target.value)}
        />
        <SearchSVG />
      </SearchWrapper>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default compose(
  withApollo,
  connect(
    mapStateToProps,
    { routeChangeAction }
  )
)(Complete);
