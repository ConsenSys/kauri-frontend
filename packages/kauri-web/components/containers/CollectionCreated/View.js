// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard'
import { Link } from '../../../routes'
import { Helmet } from 'react-helmet'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import { Title2, BodyCard } from '../../../../kauri-components/components/Typography'

type Props = {
  data: { getCollection: CollectionDTO },
  routeChangeAction: string => void,
  type: 'created' | 'updated'
}

const Container = styled.section`
  display: flex;
  height: calc(100vh - 76px);
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors['textPrimary']};
  > * {
    color: white;
  }
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > :nth-child(3) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`

class CollectionCreated extends React.Component<Props> {
  render () {
    const { data: { getCollection: { id, description, dateUpdated, owner, background, name } }, routeChangeAction, type } = this.props
    const copy = type === 'updated' ? 'updated' : 'live'

    return (
      <Container>
        <Helmet>
          <title>{`Collection ${copy} - Kauri`}</title>
        </Helmet>
        <Title2>
          Collection
        </Title2>
        <BodyCard>
          {`Your collection is now ${copy}`}
        </BodyCard>
        <CollectionCard
          id={id}
          description={description}
          date={moment(dateUpdated).fromNow()}
          name={name}
          username={owner && owner.name}
          userId={owner && owner.id}
          imageURL={background}
          linkComponent={(childrenProps, route) => (
            <Link toSlug={route.includes('collection') && name} useAnchorTag fullWidth={false} href={route}>
              {childrenProps}
            </Link>
          )}
        />
        <PrimaryButton
          onClick={() => routeChangeAction(`/collection/${String(id)}`)}
        >
          View Collection
        </PrimaryButton>
      </Container>
    )
  }
}

export default CollectionCreated
