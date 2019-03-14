import React from "react";
import { getCommunity_getCommunity } from '../../../queries/__generated__/getCommunity';
import CommunityHeader from '../../../../kauri-components/components/Community/CommunityHeader';
import Tabs from '../../../../kauri-components/components/Tabs';
import DisplayResources from './DisplayResources';

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
    // TODO Change pending to approved once dev data is approved
    const articles = getCommunity.pending && getCommunity.pending.filter( i => i && i.__typename === 'ArticleDTO');
    const collections = getCommunity.pending && getCommunity.pending.filter( i => i && i.__typename === 'CollectionDTO');
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
          tabs={[{name: `Home`}, {name: `Articles (${articles && articles.length})`}, {name: `Collections (${collections && collections.length})`}]}
          panels={[
          <DisplayResources key="home" resources={getCommunity.pending} />,
          <DisplayResources key="articles" resources={articles} />,
          <DisplayResources key="collections" resources={collections} />,
        ]}
      />
      </>
  }
}

export default CommunityConnection;
