import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Loading from "../components/common/Loading";
import { DataValue } from "react-apollo";

interface IState {
  showLoading: boolean;
  page: number;
};


type PaginationDataQuery = 'searchCommunities' | 'searchCollections' | 'searchArticles'

interface IProps {
  [queryName: string]: {
    [key in PaginationDataQuery]: { isLast: boolean }
  } & DataValue<{}>;
};


const withPagination = (Paginated: React.SFC<any>, key: PaginationDataQuery, queryName: string = 'data') => {
  class WithPagination extends Component<IProps, IState> {

    childRef: HTMLElement | null;
    childRefElement: Element | null;

    constructor(props: IProps) {
      super(props);
      this.state = {
        page: 0,
        showLoading: false,
      };
      this.childRef = null;
      this.childRefElement = null;
    }

    componentDidMount() {
      if (this.childRef) {
        const childRefElement = ReactDOM.findDOMNode(this.childRef);
        this.childRefElement = childRefElement as Element;
        (childRefElement as Element).addEventListener("scroll", this.handleOnScroll);
      }
      window.addEventListener("scroll", this.handleOnScroll);
      window.addEventListener("touchend", this.handleOnScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleOnScroll);
      window.removeEventListener("touchend", this.handleOnScroll);
    }

    handleOnScroll = () => {
      const scrollTop =
        (this.childRefElement && this.childRefElement.scrollTop) ||
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (this.childRefElement && this.childRefElement.scrollHeight) ||
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        (this.childRefElement && this.childRefElement.clientHeight) ||
        document && document.documentElement && document.documentElement.clientHeight ||
        window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight + 50) >= scrollHeight;
      if (scrolledToBottom && this.props[queryName][key].isLast !== true) {
        const nextPage = (this.state.page + 1);
        this.setState({ showLoading: true });
        this.props[queryName].fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            this.setState({ showLoading: false, page: nextPage });
            if (!fetchMoreResult) {
              return prev;
            }
            const result = {
              [key]: {
                __typename: prev[key].__typename,
                content: [
                  ...prev[key].content,
                  ...fetchMoreResult[key].content,
                ],
                isLast: fetchMoreResult[key].isLast,
                totalElements: prev[key].totalElements,
                totalPages: prev[key].totalPages,
              }
            };
            return result;
          },
          variables: {
            page: nextPage,
          },
        });
      }
    };

    render() {
      return (
        <Fragment>
          <Paginated
            setRef={(childRef: HTMLElement) => (this.childRef = childRef)}
            {...this.props}
          />
          {this.state.showLoading && <Loading />}
        </Fragment>
      );
    }
  }
  return WithPagination;
};

export default withPagination;
