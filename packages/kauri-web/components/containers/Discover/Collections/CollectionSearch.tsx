import React from "react";
import styled from "styled-components";
import { searchCollections } from "../../../../queries/Collection";
import { Icon, Input, AutoComplete } from "antd";
import { Subject } from "rxjs/Subject";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import { InputProps } from "antd/lib/input/input";
import ApolloClient from "apollo-client";
import { SelectValue } from "antd/lib/select";
import { Subscription } from "rxjs/Subscription";

const Option = AutoComplete.Option;

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

interface ICollectionType {
  id: string;
  name: string;
}

interface IDataSource extends Array<ICollectionType> {}

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
          searchCollections: { content: ICollectionType[] };
        }>({
          fetchPolicy: "no-cache",
          query: searchCollections,
          variables: { filter: { nameContains: text } },
        })
      )
      .map(
        ({
          data: {
            searchCollections: { content },
          },
        }) => content
      )
      .subscribe((dataSource: IDataSource) => {
        if (dataSource.length === 0) {
          dataSource = [
            {
              id: "No collections found",
              name: "No collections found",
            },
          ];
        }
        this.setState({ ...this.state, dataSource });
      });
    this.setState({ ...this.state, sub });
  }

  isSubscription = (v: any): v is Subscription => typeof v === "object";

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  handleSearch = (text: string) => {
    handleSearch$.next(text);
  };

  onSelect = (collectionRoute: SelectValue) => {
    if (typeof collectionRoute === "string") {
      this.props.routeChangeAction(collectionRoute);
    }
  };

  renderOption = (collection: ICollectionType) =>
    collection.name !== "No collections found" ? (
      <Option
        key={`/collection/${collection.id}`}
        value={`/collection/${collection.id}`}
      >
        {typeof collection.name === "string" &&
          collection.name.length &&
          collection.name.substr(0, 50).concat("...")}
      </Option>
    ) : (
      <Option
        disabled={true}
        key={"No collections found"}
        value={"No collections found"}
      >
        No collections found
      </Option>
    );

  render() {
    const { dataSource } = this.state;
    return (
      <SearchWrapper
        collapsible={this.props.collapsible}
        className="global-search-wrapper"
      >
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: "100%", backgroundColor: "transparent" }}
          dataSource={dataSource.map(this.renderOption) as any}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
        >
          <SearchInput
            suffix={<Icon type="search" className="certain-category-icon" />}
          />
        </AutoComplete>
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
