import React from "react";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../lib/Module";
import HomePageBanner from "../../../../kauri-components/components/WelcomeBanner/Homepage";

class WelcomeBanner extends React.Component<{}, { shown: boolean | null }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shown: false,
    };
  }

  render() {
    if (this.state.shown) {
      return null;
    } else {
      return <HomePageBanner />;
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
