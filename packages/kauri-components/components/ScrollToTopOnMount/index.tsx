import * as React from "react";

export default class ScrollToTopOnMount extends React.Component<{}> {
  public componentDidMount() {
    window.scrollTo({ top: 0, left: 0 });
  }

  public render() {
    return null;
  }
}
