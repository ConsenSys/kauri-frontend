import React from "react";
import styled from "styled-components";
import { Icon, Input } from "antd";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import { InputProps } from "antd/lib/input/input";
import ApolloClient from "apollo-client";
import { Subscription } from "rxjs/Subscription";

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

interface IArticleType {
  id: string;
  title: string;
}

interface IDataSource extends Array<IArticleType> {}

interface IState {
  dataSource: IDataSource;
  sub?: Subscription;
  q: string;
}

interface IProps {
  client: ApolloClient<{}>;
  routeChangeAction: (route: string) => void;
  category: string | null;
}

class Complete extends React.Component<IProps & ISearchWrapperProps, IState> {
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

  render() {
    console.log(this.props);
    return (
      <SearchWrapper
        collapsible={this.props.collapsible}
        className="global-search-wrapper"
      >
        <SearchInput
          suffix={
            <Icon
              onClick={() =>
                this.props.routeChangeAction(
                  `/search-results?q=${this.state.q}${
                    typeof this.props.category === "string"
                      ? `&default_category=${this.props.category}`
                      : ""
                  }`
                )
              }
              type="search"
              className="certain-category-icon"
            />
          }
          onChange={({ target: { value } }) => this.setState({ q: value })}
          onKeyDown={this.handleChange}
        />
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
