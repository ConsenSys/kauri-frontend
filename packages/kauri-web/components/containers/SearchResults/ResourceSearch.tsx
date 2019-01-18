import React from "react";
import styled from "styled-components";
import { Icon, Input } from "antd";
import { InputProps } from "antd/lib/input/input";
import ApolloClient from "apollo-client";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { searchResultsAutocomplete } from "../../../queries/Search";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import { searchResultsAutocomplete_searchAutocomplete_content } from "../../../queries/__generated__/searchResultsAutocomplete";
import { IProps as IQueryProps } from "./index";
import { routeChangeAction } from "../../../lib/Module";

const SearchInput = styled<InputProps>(props => (
  <Input autosize={{ minRows: 1, maxRows: 1 }} {...props} />
))`
  background-color: #262c35 !important;
  .ant-select-selection {
    background-color: transparent;
  }
  * {
    color: white !important;
    background-color: transparent;
  }
  .ant-select-selection__rendered,
  .ant-select-selection,
  > * {
    background-color: #262c35 !important;
  }
  .ant-input {
    border: 1px solid #ebebeb;
    :hover {
      border: 2px solid #209b86 !important;
    }
  }
  .ant-input-affix-wrapper:hover {
    border: 2px solid #209b86 !important;
  }
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
  > *:not(.certain-category-icon) {
    opacity: ${props => (props.collapsible ? "0" : "1")};
    transition: all 0.3s;
  }
  &:hover {
    > * {
      opacity: 1;
    }
  }
`;

const IconOverlay = styled(Icon)`
  position: absolute;
  top: 12.5px;
  right: 12px;
  height: 17px;
  width: 17px;
  font-size: 17px;
`;

export interface IDataSource {
  results: searchResultsAutocomplete_searchAutocomplete_content[];
  totalElementsBreakdown: IElementsBreakdown;
}

interface IProps {
  client: ApolloClient<{}>;
  routeChangeAction: (route: string) => void;
  setSearchResults: (dataSource: IDataSource, loading: boolean) => void;
  router: any;
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
      .do(() => this.props.setSearchResults(this.state.dataSource, true))
      .flatMap(() =>
        this.props.client.query<{
          searchAutocomplete: {
            content: searchResultsAutocomplete_searchAutocomplete_content[];
            totalElementsBreakdown: IElementsBreakdown;
          };
        }>({
          fetchPolicy: "no-cache",
          query: searchResultsAutocomplete,
          variables: {
            filter: {
              type: this.state.type,
            },
            page: 0,
            query: this.state.value,
            size: 50,
          },
        })
      )
      .map(({ data: { searchAutocomplete: queryResult } }) => ({
        results: queryResult.content,
        totalElementsBreakdown: queryResult.totalElementsBreakdown,
      }))
      .subscribe(dataSource => {
        if (this.state.type) {
          dataSource.totalElementsBreakdown = this.state.dataSource.totalElementsBreakdown; // do not reset tabs if the query did not change
        }

        this.props.setSearchResults(
          Array.isArray(dataSource.results) && dataSource.results.length === 0
            ? emptyData
            : dataSource,
          false
        );
        this.setState({ ...this.state, dataSource });
        const newRoute = `/search-results?q=${this.state.value}`;
        this.props.router.push(newRoute, newRoute, { shallow: true });
      });
    this.setState({ ...this.state, sub });

    if (this.props.query.q) {
      handleSearch$.next({ value: this.props.query.q });
      this.setState({ ...this.state, value: this.props.query.q });
    }
  }

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  fetchResults(value: string, type?: string) {
    this.setState({ value, type: type ? type : null });
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
          suffix={<Icon type="search" className="certain-category-icon" />}
          onChange={e => this.fetchResults(e.target.value)}
        />
        <IconOverlay type="search" className="certain-category-icon" />
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
