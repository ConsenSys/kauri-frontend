// @flow
import React from 'react'
import moment from 'moment';
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard';
import Empty from './Empty';
import { Link } from '../../../routes';
import userIdTrim from '../../../lib/userid-trim';
import ContentContainer from './PublicProfileContentContainer';
import type { CollectionsProps } from './types';

const Collections = ({ collections, routeChangeAction }: CollectionsProps) =>
  collections.content.length > 0
    ? <ContentContainer>
      {collections.content.map(collection => {
        const articleCount = collection.sections && collection.sections.reduce(
          (current, next) => {
            current += next.resources && next.resources.length
            return current
          }, 0);
        return <CollectionCard
          changeRoute={routeChangeAction}
          key={collection.id}
          id={collection.id}
          name={collection.name}
          description={collection.description}
          username={collection.owner && (collection.owner.name || collection.owner.username)}
          userId={collection.owner && collection.owner.id}
          userAvatar={collection.owner && collection.owner.avatar}
          articleCount={articleCount}
          date={collection.dateCreated}
          imageURL={collection.background}
          cardHeight={500}
          collectionDescription={collection.description}
          linkComponent={(childrenProps, route) => (
            <Link toSlug={route.includes('collection') && collection.name} useAnchorTag href={route}>
              {childrenProps}
            </Link>
          )} />;
      })}
    </ContentContainer> : <Empty />;

export default Collections;
