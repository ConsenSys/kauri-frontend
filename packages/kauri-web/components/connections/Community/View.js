// @flow
import React from 'react';
import Community from './Community';

type Props = {
  category: string,
  hostName: string,
  data: { getCommunity: CommunityDTO },
};

class CommunityConnection extends React.Component<Props> {
  render () {
    return this.props.data && this.props.data.getCommunity ? (
      <Community
        id={this.props.data.getCommunity.id}
        name={this.props.data.getCommunity.name}
        avatar={this.props.data.getCommunity.avatar}
        website={this.props.data.getCommunity.website}
        category={this.props.category}
        hostName={this.props.hostName}
      />
    ) : null;
  }
}

export default CommunityConnection;
