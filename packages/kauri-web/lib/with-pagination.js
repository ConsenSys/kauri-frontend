import React, { Component } from "react";
import ReactDOM from "react-dom";
import Loading from "../components/common/Loading";

const withPagination = (Paginated, key, queryName) => {
  const query = queryName || "data";
  class WithPagination extends Component {
    constructor(props) {
      super(props);
      this.state = {
        page: 0,
        showLoading: false,
      };
    }

    componentDidMount() {
      if (this.childRef) {
        const childRefElement = ReactDOM.findDOMNode(this.childRef);
        this.childRefElement = childRefElement;
        childRefElement.addEventListener("scroll", this.handleOnScroll);
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
        document.documentElement.clientHeight ||
        window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight + 50) >= scrollHeight;
      if (scrolledToBottom && this.props[query][key].isLast !== true) {
        const nextPage = (this.state.page += 1);
        this.setState({ showLoading: true });
        this.props.data.fetchMore({
          variables: {
            page: nextPage,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            this.setState({ showLoading: false, page: nextPage });
            if (!fetchMoreResult) return prev;
            const result = Object.assign({}, prev, {
              [key]: {
                __typename: prev[key].__typename,
                content: [
                  ...prev[key].content,
                  ...fetchMoreResult[key].content,
                ],
                isLast: fetchMoreResult[key].isLast,
                totalElements: prev[key].totalElements,
                totalPages: prev[key].totalPages,
              },
            });
            return result;
          },
        });
      }
    };

    render() {
      return (
        <>
          <Paginated
            setRef={childRef => (this.childRef = childRef)}
            {...this.props}
          />
          {this.state.showLoading && <Loading />}
        </>
      );
    }
  }
  return WithPagination;
};

export default withPagination;
