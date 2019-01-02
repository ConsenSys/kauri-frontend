import React from "react";
import QuickSearch, {
  IResult,
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

interface IDataSource extends Array<IResult> {}

interface IState {
  dataSource: IDataSource;
  results: IResult[];
  search: string;
  sub?: Subscription;
  open: boolean;
}

const handleSearch$: Subject<string> = new Subject();

class NavSearch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dataSource: [],
      open: false,
      results: [],
      search: "",
    };

    this.collapseSearch = this.collapseSearch.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(300)
      .flatMap((text: string) =>
        this.props.client.query<{
          searchAutocomplete: { content: IResult[] };
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
      .map(
        ({
          data: {
            searchAutocomplete: { content },
          },
        }) => content
      )
      .subscribe((dataSource: IDataSource) => {
        if (dataSource.length === 0) {
          dataSource = [];
        }
        this.setState({ ...this.state, dataSource });
      });
    this.setState({ ...this.state, sub });
  }

  expandSearch() {
    this.setState({ open: true });
  }

  collapseSearch() {
    this.setState({ open: false, dataSource: [] });
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
        <QuickSearch results={this.state.dataSource} />
      </NavBarAdjusted>
    );
  }
}

export default NavSearch;
