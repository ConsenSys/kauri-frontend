import React from "react";
import styled from "styled-components";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import ApolloClient from "apollo-client";
import { Subscription } from "rxjs/Subscription";

const SearchSVG = () => (
  <div className="certain-category-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
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
    return (
      <SearchWrapper
        collapsible={this.props.collapsible}
        className="global-search-wrapper"
      >
        <SearchInput
          onChange={({ target: { value } }) => this.setState({ q: value })}
          onKeyDown={this.handleChange}
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
