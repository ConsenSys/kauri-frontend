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
  closeModalAction: () => void;
  openModalAction: () => void;
}

class CommunityConnection extends React.Component<IProps> {
  render() {
    if (!this.props.data || !this.props.data.getCommunity) {
      return null;
    }

    const {data: {getCommunity}, currentUser, closeModalAction, openModalAction} = this.props;
    const articles = getCommunity.approved && getCommunity.approved.filter( i => i && i.__typename === 'ArticleDTO');
    const collections = getCommunity.approved && getCommunity.approved.filter( i => i && i.__typename === 'CollectionDTO');
    const isCreator = getCommunity.creatorId === currentUser
    const isMember = isCreator || R.any(R.propEq('id', currentUser), getCommunity.members || [])
      return <>
          <CommunityHeader
          avatar={getCommunity.avatar}
          name={getCommunity.name}
          website={getCommunity.website}
          description={getCommunity.description}
          id={String(getCommunity.id)}
          social={getCommunity.social}
          articles={articles && articles.length || 0}
          collections={collections && collections.length || 0}
          tags={getCommunity.tags}
          members={getCommunity.members}
          isMember={isMember}
          openModalAction={openModalAction}
          closeModalAction={closeModalAction}
        />
        <Tabs
          dark={true}
          tabs={[
            {name: `Home`},
            {name: `Articles (${articles && articles.length})`},
            {name: `Collections (${collections && collections.length})`},
            isCreator || isMember ? {name: 'Manage Community'} : null,
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
