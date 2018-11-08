// @flow
import React from 'react'
import moment from 'moment'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard'
import Empty from './Empty'
import { Link } from '../../../routes'
import styled from 'styled-components'
import ContentContainer from './PublicProfileContentContainer'
import { PrimaryButton } from '../../../../kauri-components/components/Button'
import withPagination from '../../../lib/with-pagination'

import type { CollectionsProps } from './types'

export const CollectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-top: 1em;
  padding-bottom: 0px;
  max-width: 1280px;
  > div {
    margin: 15px;
  }
`

const Collections = ({ collections, routeChangeAction }: CollectionsProps) =>
  collections.content.length > 0 ? (
    <ContentContainer>
      <CollectionsContainer>
        {collections.content.map(collection => {
          const articleCount =
            collection.sections &&
            collection.sections.reduce((current, next) => {
              current += next.resources && next.resources.length
              return current
            }, 0)
          return (
            <CollectionCard
              changeRoute={routeChangeAction}
              key={collection.id}
              id={collection.id}
              name={collection.name}
              date={moment(collection.dateUpdated).format('D MMM YYYY')}
              description={collection.description}
              username={collection.owner && collection.owner.username}
              userId={collection.owner && collection.owner.id}
              userAvatar={collection.owner && collection.owner.avatar}
              articleCount={articleCount}
              imageURL={collection.background}
              cardHeight={290}
              linkComponent={(childrenProps, route) => (
                <Link toSlug={route.includes('collection') && collection.name} useAnchorTag href={route}>
                  {childrenProps}
                </Link>
              )}
            />
          )
        })}
      </CollectionsContainer>
    </ContentContainer>
  ) : (
    <Empty>
      <PrimaryButton onClick={() => routeChangeAction(`/create-collection`)}>CREATE COLLECTION</PrimaryButton>
    </Empty>
  )

export default withPagination(Collections, 'searchCollections')
