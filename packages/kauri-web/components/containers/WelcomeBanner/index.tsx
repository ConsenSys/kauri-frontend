import React from "react";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../lib/Module";
import MainBanner from "../../../../kauri-components/components/WelcomeBanner/MainBanner";
import MobileBanner from "../../../../kauri-components/components/WelcomeBanner/MobileBanner";

interface IProps {
  routeChangeAction: (route: string) => void;
}

interface IState {
  shown: string | null;
}

class WelcomeBanner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleLearnMore = this.handleLearnMore.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.setState({ shown: window.localStorage.getItem("shownWelcomeBanner") });
  }

  handleClose() {
    const date = String(new Date());
    window.localStorage.setItem("shownWelcomeBanner", date);
    this.setState({ shown: date });
  }

  handleLearnMore() {
    this.props.routeChangeAction("/help");
    this.handleClose();
  }

  render() {
    if (!this.state || this.state.shown) {
      return null;
    } else {
      return (
        <>
          <MainBanner
            handleClose={this.handleClose}
            handleLearnMore={this.handleLearnMore}
          />
          <MobileBanner
            handleClose={this.handleClose}
            handleLearnMore={this.handleLearnMore}
          />
        </>
      );
    }
  }
}

const mapStateToProps = ({}, {}) => {
  return {};
};

export default connect(
  mapStateToProps,
  { routeChangeAction }
)(WelcomeBanner);
