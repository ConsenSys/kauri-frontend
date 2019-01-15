import React from "react";
import styled from "styled-components";
import { Icon, Input } from "antd";
import { InputProps } from "antd/lib/input/input";
import ApolloClient from "apollo-client";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { globalSearchApprovedArticles } from "../../../queries/Article";
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

const handleSearch$: Subject<string> = new Subject();

interface IArticleType {
  id: string;
  title: string;
}

interface IDataSource extends Array<IArticleType> {}

interface IState {
  dataSource: IDataSource;
  sub?: Subscription;
}

interface IProps {
  client: ApolloClient<{}>;
  routeChangeAction: (route: string) => void;
}

class Complete extends React.Component<IProps & ISearchWrapperProps, IState> {
  constructor(props: IProps & ISearchWrapperProps) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(300)
      .flatMap((text: string) =>
        this.props.client.query<{
          searchArticles: { content: IArticleType[] };
        }>({
          fetchPolicy: "no-cache",
          query: globalSearchApprovedArticles,
          variables: { filter: { nameContains: text } },
        })
      )
      .map(
        ({
          data: {
            searchArticles: { content },
          },
        }) => content
      )
      .subscribe((dataSource: IDataSource) => {
        if (dataSource.length === 0) {
          dataSource = [
            {
              id: "No articles found",
              title: "No articles found",
            },
          ];
        }
        this.setState({ ...this.state, dataSource });
      });
    this.setState({ ...this.state, sub });
    // console.log(this.state);
  }

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  handleSearch = (text: string) => {
    handleSearch$.next(text);
  };

  render() {
    return (
      <SearchWrapper
        collapsible={this.props.collapsible}
        className="global-search-wrapper"
      >
        <SearchInput
          suffix={<Icon type="search" className="certain-category-icon" />}
          onChange={e => this.handleSearch(e.target.value)}
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
