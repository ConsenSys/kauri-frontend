// @flow
import React from "react";
import Community from "./Community";

type Props = {
  category: string,
  hostName: string,
  isLoggedIn: boolean,
  data: { getCommunity: CommunityDTO },
  openModalAction: any => void,
};

class CommunityConnection extends React.Component<Props> {
  render() {
    console.log(this.props.data);
    return this.props.data && this.props.data.getCommunity ? (
      <Community
        id={this.props.data.getCommunity.id}
        name={this.props.data.getCommunity.name}
        avatar={this.props.data.getCommunity.avatar}
        website={this.props.data.getCommunity.website}
        category={this.props.category}
        hostName={this.props.hostName}
        isLoggedIn={this.props.isLoggedIn}
        data={this.props.data}
        openModalAction={this.props.openModalAction}
      />
    ) : null;
  }
}

export default CommunityConnection;
