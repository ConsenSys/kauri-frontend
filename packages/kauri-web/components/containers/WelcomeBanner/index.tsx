import React from "react";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../lib/Module";
import MainBanner from "../../../../kauri-components/components/WelcomeBanner/MainBanner";

interface IProps {
  routeChangeAction: (route: string) => void;
}
class WelcomeBanner extends React.Component<IProps, { shown: boolean | null }> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      shown: false,
    };
  }

  render() {
    if (this.state.shown) {
      return null;
    } else {
      return <MainBanner routeChangeAction={this.props.routeChangeAction} />;
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
