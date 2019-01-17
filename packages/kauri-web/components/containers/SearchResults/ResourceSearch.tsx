import React from "react";
import styled from "styled-components";
import { Icon, Input } from "antd";
import { InputProps } from "antd/lib/input/input";
import ApolloClient from "apollo-client";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { searchAutocomplete } from "../../../queries/Search";
import {
  IResult,
  IElementsBreakdown,
} from "../../../../kauri-components/components/Search/QuickSearch";
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
  results: IResult[];
  totalElementsBreakdown: IElementsBreakdown;
}

interface IProps {
  client: ApolloClient<{}>;
  routeChangeAction: (route: string) => void;
  setSearchResults: (dataSource: IDataSource, loading: boolean) => void;
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

export const emptyData = {
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
      value: "",
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
      .subscribe(dataSource => {
        if (
          Array.isArray(dataSource.results) &&
          dataSource.results.length === 0
        ) {
          dataSource = emptyData;
        }
        if (this.state.type) {
          dataSource.totalElementsBreakdown = this.state.dataSource.totalElementsBreakdown; // do not reset tabs if the query did not change
        }

        this.props.setSearchResults(dataSource, false);
        this.setState({ dataSource });
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
          value={this.state.value || this.props.query.q}
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
