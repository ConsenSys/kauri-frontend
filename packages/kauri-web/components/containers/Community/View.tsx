import React from "react";
import { getCommunity_getCommunity } from '../../../queries/__generated__/getCommunity';
import CommunityHeader from '../../../../kauri-components/components/Community/CommunityHeader';

interface IProps {
  data: {
    getCommunity: getCommunity_getCommunity;
  }
}

class CommunityConnection extends React.Component<IProps> {
  render() {
    if (!this.props.data || !this.props.data.getCommunity) {
      return null;
    }

    const {data: {getCommunity}} = this.props;
      return <CommunityHeader
        avatar={String(getCommunity.avatar)}
        name={String(getCommunity.name)}
        website={String(getCommunity.website)}
        description={String(getCommunity.description)}
        id={String(getCommunity.id)}
        social={getCommunity.social}
        articles={5}
        collections={5}
        tags={getCommunity.tags}
        members={getCommunity.members}
      />
  }
}

export default CommunityConnection;
