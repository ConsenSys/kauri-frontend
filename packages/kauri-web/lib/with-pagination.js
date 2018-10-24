import React, { Component } from 'react';
import Loading from '../components/common/Loading';

const withPagination = (Paginated, key) => {
    class WithPagination extends Component {
        constructor(props) {
            super(props);
            this.state = {
                page: 0,
                showLoading: false,
            }
        }

        componentDidMount() {
            window.addEventListener("scroll", this.handleOnScroll);
          }
        
          componentWillUnmount() {
            window.removeEventListener("scroll", this.handleOnScroll);
        }

        handleOnScroll = () => {
            var scrollTop =
              (document.documentElement && document.documentElement.scrollTop) ||
              document.body.scrollTop;
            var scrollHeight =
              (document.documentElement && document.documentElement.scrollHeight) ||
              document.body.scrollHeight;
            var clientHeight =
              document.documentElement.clientHeight || window.innerHeight;
            var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
            if (scrolledToBottom && this.props.data[key].isLast !== true) {
                this.setState({ showLoading: true });
              this.props.data.fetchMore({
                  variables: {
                      page: this.state.page += 1,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    this.setState({ showLoading: false, page: this.state.page += 1 });
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                        [key]: {
                            __typename: prev[key].__typename,
                            content: [...prev[key].content, ...fetchMoreResult[key].content],
                            isLast: fetchMoreResult[key].isLast,
                        }
                      });
                  }
              });
            }
        };

        render() {
            return <>
                <Paginated {...this.props} />
                {this.state.showLoading && <Loading />}
            </>;
        }
    };
    return WithPagination;
}

export default withPagination;