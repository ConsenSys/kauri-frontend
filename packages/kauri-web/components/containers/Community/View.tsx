import React from "react";
import { getCommunity_getCommunity } from '../../../queries/__generated__/getCommunity';
import CommunityHeader from '../../../../kauri-components/components/Community/CommunityHeader';
import Tabs from '../../../../kauri-components/components/Tabs';
import DisplayResources from './DisplayResources';
import Manage from './Manage';
import R from 'ramda';

interface IProps {
  currentUser: string;
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
    const articles = getCommunity.approved && getCommunity.approved.filter( i => i && i.__typename === 'ArticleDTO');
    const collections = getCommunity.approved && getCommunity.approved.filter( i => i && i.__typename === 'CollectionDTO');
    const isMember = R.any(R.propEq('id', this.props.currentUser), getCommunity.members || [])
      return <>
          <CommunityHeader
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
        <Tabs
          dark={true}
          tabs={[
            {name: `Home`},
            {name: `Articles (${articles && articles.length})`},
            {name: `Collections (${collections && collections.length})`},
            !isMember ? {name: 'Manage Community'} : null,
          ]}
          panels={[
          <DisplayResources key="home" resources={getCommunity.approved} />,
          <DisplayResources key="articles" resources={articles} />,
          <DisplayResources key="collections" resources={collections} />,
          <Manage key="manage" members={getCommunity.members} pending={getCommunity.pending} />
        ]}
      />
      </>
  }
}

export default CommunityConnection;
