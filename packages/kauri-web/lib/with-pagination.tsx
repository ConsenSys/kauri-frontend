/* tslint:disable */

import * as React from "react";
import ReactDOM from "react-dom";
import Loading from "../components/common/Loading";
import { DataValue } from "react-apollo";
import styled from "../../kauri-components/lib/styled-components";

interface IState {
  showLoading: boolean;
  page: number;
}

type PaginationDataQuery =
  | "searchCommunities"
  | "searchCollections"
  | "searchArticles"
  | "searchAutocomplete";

interface IProps {
  [queryName: string]: { [key in PaginationDataQuery]: { isLast: boolean } } &
    DataValue<{}>;
}

const withPagination = (
  Paginated: React.ComponentClass<any>,
  key: PaginationDataQuery,
  queryName: string = "data"
) => {
  class WithPagination extends React.Component<IProps, IState> {
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
      const triggerTouchStartEvent = (childRefElement?: Element) => () => {
        if (childRefElement) {
          childRefElement.addEventListener(
            "touchend",
            this.handleOnScroll,
            false
          );
          childRefElement.removeEventListener(
            "touchstart",
            triggerTouchStartEvent()
          );
          return;
        }
        window.addEventListener("touchend", this.handleOnScroll, false);
        window.removeEventListener("touchstart", triggerTouchStartEvent());
        window.removeEventListener("scroll", triggerScrollEvent());
      };
      const triggerScrollEvent = (childRefElement?: Element) => () => {
        if (childRefElement) {
          childRefElement.addEventListener(
            "scroll",
            this.handleOnScroll,
            false
          );
          childRefElement.removeEventListener("scroll", triggerScrollEvent());
          return;
        }
        window.addEventListener("scroll", this.handleOnScroll, false);
        window.removeEventListener("scroll", triggerScrollEvent());
      };

      if (this.childRef) {
        const childRefElement = ReactDOM.findDOMNode(this.childRef);
        this.childRefElement = childRefElement as Element;
        (childRefElement as Element).addEventListener(
          "touchstart",
          triggerTouchStartEvent(childRefElement as Element)
        );
        (childRefElement as Element).addEventListener(
          "scroll",
          triggerScrollEvent(childRefElement as Element)
        );
        return;
      }

      window.addEventListener("touchstart", triggerTouchStartEvent());
      window.addEventListener("scroll", triggerScrollEvent());
    }

    componentWillUnmount() {
      window.removeEventListener("touchend", this.handleOnScroll, false);
    }

    handleOnScroll = () => {
      const scrollTop =
        (this.childRefElement && this.childRefElement.scrollTop) ||
        (document.scrollingElement && document.scrollingElement.scrollTop) ||
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
          ((document.documentElement && document.documentElement.scrollTop) ||
            0);
      const scrollHeight =
        (this.childRefElement && this.childRefElement.scrollHeight) ||
        (document.scrollingElement && document.scrollingElement.scrollHeight) ||
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        (this.childRefElement && this.childRefElement.clientHeight) ||
        (document.scrollingElement && document.scrollingElement.clientHeight) ||
        document.body.getBoundingClientRect().height ||
        (document &&
          document.documentElement &&
          document.documentElement.clientHeight) ||
        window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight + 150) >= scrollHeight;

      // alert(`${scrollTop}, ${scrollHeight}, ${clientHeight}`);

      if (
        scrolledToBottom &&
        this.props[queryName] &&
        this.props[queryName][key] &&
        this.props[queryName][key].isLast !== true &&
        this.state.showLoading === false
      ) {
        const nextPage = this.state.page + 1;
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
                totalElementsBreakdown: prev[key].totalElementsBreakdown,
              },
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
      const setChildRef = (childRef: HTMLElement) => (this.childRef = childRef);

      return (
        <React.Fragment>
          <Paginated setRef={setChildRef} {...this.props} />
          {this.state.showLoading && <Loading />}
        </React.Fragment>
      );
    }
  }
  return WithPagination;
};

export default withPagination;
