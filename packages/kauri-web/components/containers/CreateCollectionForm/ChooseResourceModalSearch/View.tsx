import React from "react";
import { IResult } from "../../../../../kauri-components/components/Search/QuickSearch";
import styled from "styled-components";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

const SearchSVG = () => (
  <div className="certain-category-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1E2428">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
        fill="#1E2428"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0977 20.6834 22.0977 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z"
        fill="#1E2428"
      />
    </svg>
  </div>
);

const SearchInput = styled.input`
  border: 1px solid ${props => props.theme.colors.bgPrimary};
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
  width: 330px;
  display: grid;
  position: relative;

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

interface ISearch {
  value: string;
  type?: string;
}

const handleSearch$: Subject<ISearch> = new Subject();

interface IDataSource {
  results: IResult[];
}

const EmptyData: IDataSource = {
  results: [],
};

interface IState {
  dataSource: IDataSource;
  sub: Subscription | null;
}

interface IProps {
  query: any;
  routeChangeAction: (route: string) => void;
  category: string | null;
  changeTab: (index: number) => void;
}

class Complete extends React.Component<IProps, IState> {
  state = {
    dataSource: EmptyData,
    sub: null,
    value: "",
  };

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(200)
      .flatMap(
        (): Promise<{
          data: { searchArticles: { content: IResult[] } };
        }> =>
          this.props.query.refetch({
            page: 0,
            size: 8,
            text: this.state.value,
          })
      )
      .do(() => this.props.changeTab(1))
      .map(({ data: { searchArticles: queryResult } }) => ({
        results: queryResult.content,
      }))
      .subscribe(
        dataSource => {
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

  handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.props.routeChangeAction(
        `/search-results?q=${this.state.q}${
          typeof this.props.category === "string"
            ? `&default_category=${this.props.category}`
            : ""
        }`
      );
    }
  };

  fetchResults = (value: string, type?: string) => {
    this.setState({ value, type: type ? type : null });
    handleSearch$.next({ value });
  };

  render() {
    return (
      <SearchWrapper
        collapsible={this.props.collapsible}
        className="global-search-wrapper"
      >
        <SearchInput
          onChange={({ target: { value } }) => this.fetchResults(value)}
        />
        <SearchSVG />
      </SearchWrapper>
    );
  }
}

export default Complete;
