// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import CollectionHeader from '../../../../kauri-components/components/Headers/CollectionHeader.bs'
import CollectionSection from '../../../../kauri-components/components/Section/CollectionSection.bs'

type Props = {
  data: {
    collection?: CollectionDTO,
  },
  routeChangeAction: string => void,
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const HeaderContainer = styled(ContentContainer)`
  background: url(${props => props.background}) center center;
  background-size: cover;
  margin-top: -76px;
  padding-top: 106px;
  padding-bottom: 50px;
  box-shadow: inset 0px 0px 140px 120px rgba(0, 0, 0, 0.5);
`

class CollectionPage extends Component<Props> {
  render() {
    if (!this.props.data || !this.props.data.collection) return null;
    const { name, background, description, date_created, date_updated, owner, sections } = this.props.data.collection
    return (
      <div>
        <HeaderContainer background={background}>
          <CollectionHeader
            name={name}
            description={description}
            updated={date_updated || date_created}
            username={owner.username}
            profileImage={owner.profileImage}
          />
        </HeaderContainer>
        <ContentContainer>

          {sections &&
            sections.map(i => (
              <CollectionSection
                name={i.name}
                key={i.name}
                routeChangeAction={this.props.routeChangeAction}
                description={i.description}
                articles={i.articles}
              />
            ))}
        </ContentContainer>
      </div>
    )
  }
}

export default CollectionPage
