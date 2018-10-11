// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import BaseCard from './BaseCard'
import { Label, H1, H4, BodyCard } from '../Typography'
import theme from '../../lib/theme-config'
import withToggle from '../../../kauri-web/lib/with-toggle'
import R from 'ramda'
import TextTruncate from 'react-text-truncate'
import { PrimaryButton, SecondaryButton } from '../Button'
import UserAvatar from '../UserAvatar'

import type { ToggleProps } from '../../../kauri-web/lib/with-toggle'

const DEFAULT_CARD_HEIGHT = 290
const DEFAULT_CARD_WIDTH = 290
const DEFAULT_CARD_PADDING = theme.space[2]

const withImageURLCss = css`
  padding: ${props => props.theme.space[2]}px;
  background: rgba(30, 36, 40, 0.7);
  > *, a > * {
    color: white;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Mask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  > *:nth-child(3) {
    margin-top: auto;
  }
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  ${withImageURLCss};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  background: url(${props => props.imageURL}) center center / cover;
  > *:nth-child(3) {
    margin-top: auto;
  }
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    text-transform: uppercase;
  }
  padding: ${props => props.imageURL && props.theme.space[2]}px;
`

const Divider = styled.div`
  width: 100%;
  margin: ${props => props.theme.space[2]}px 0px;
  background-color: ${props => props.theme.colors['divider']};
  height: 2px;
`

const nameLineHeight = R.cond([
  [({ cardHeight, imageURL }) => cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(2)],
  [({ cardHeight, imageURL }) => cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(3)],
  [({ imageURL }) => typeof imageURL === 'string', R.always(2)],
])

const contentLineHeight = R.cond([
  [({ cardWidth, imageURL }) => cardWidth > DEFAULT_CARD_WIDTH && typeof imageURL !== 'string', R.always(10)],
  [({ cardHeight, imageURL }) => cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(3)],
  [({ cardHeight, imageURL }) => cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(9)],
  [({ cardHeight, imageURL }) => cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL === 'string', R.always(8)],
  [({ imageURL }) => typeof imageURL === 'string', R.always(2)],
])

let renderPublicProfile = (pageType, username, userId, cardWidth, userAvatar, imageURL) => (
  <UserAvatar
    fullWidth={cardWidth > DEFAULT_CARD_WIDTH}
    username={username}
    userId={userId}
    avatar={userAvatar}
    imageURL={imageURL}
  />
)

const renderBodyContent = ({ name, cardHeight, cardWidth, imageURL, description }) => <React.Fragment>
  <H1>
    <TextTruncate line={nameLineHeight({ cardHeight, imageURL })} truncateText='…' text={name} />
  </H1>
  <BodyCard>
    <TextTruncate line={contentLineHeight({ cardHeight, cardWidth, imageURL })} truncateText='…' text={description} />
  </BodyCard>
</React.Fragment>

let renderActualContent = ({
  imageURL,
  name,
  description,
  cardHeight,
  cardWidth,
  id,
  linkComponent,
  pageType,
  username,
  userId,
  userAvatar,
  date,
}) => (
  <React.Fragment>
    <Label>{'Collection'}</Label>
    {typeof linkComponent !== 'undefined'
      ? linkComponent(renderBodyContent({ name, cardHeight, cardWidth, imageURL, description }), `/collection/${id}`)
      : renderBodyContent({ name, cardHeight, cardWidth, imageURL, description })
    }
    {typeof linkComponent !== 'undefined'
      ? linkComponent(
        renderPublicProfile(pageType, username, userId, calculateCardWidth({ cardWidth, imageURL }), userAvatar, imageURL),
        `/public-profile/${userId}`
      )
      : renderPublicProfile(pageType, username, userId, calculateCardWidth({ cardWidth, imageURL }), userAvatar, imageURL)}
    <Label>{'Updated ' + date}</Label>
  </React.Fragment>
)

let renderCardContent = ({
  imageURL,
  name,
  description,
  cardHeight,
  cardWidth,
  id,
  linkComponent,
  pageType,
  username,
  userId,
  userAvatar,
  date,
}) =>
  typeof imageURL === 'string' ? (
    <Mask>
      {renderActualContent({
        imageURL,
        name,
        description,
        cardHeight,
        cardWidth,
        id,
        linkComponent,
        pageType,
        username,
        userId,
        userAvatar,
        date,
      })}
    </Mask>
  ) : (
    <React.Fragment>
      {renderActualContent({
        imageURL,
        name,
        description,
        cardHeight,
        cardWidth,
        id,
        linkComponent,
        pageType,
        username,
        userId,
        userAvatar,
        date,
      })}
    </React.Fragment>
  )

const calculateCardHeight = R.cond([
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== 'string' && cardHeight > DEFAULT_CARD_HEIGHT && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== 'string' && cardHeight === DEFAULT_CARD_HEIGHT && cardWidth > DEFAULT_CARD_WIDTH,
    R.always(420),
  ],
  [
    ({ cardHeight, imageURL }) => typeof imageURL === 'string' && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) => typeof imageURL !== 'string' && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) => typeof imageURL !== 'string' && cardHeight === DEFAULT_CARD_HEIGHT,
    R.always(DEFAULT_CARD_HEIGHT),
  ],
  [
    ({ cardHeight, imageURL }) => typeof imageURL === 'string' && cardHeight === DEFAULT_CARD_HEIGHT,
    R.always(DEFAULT_CARD_HEIGHT),
  ],
])

const calculateCardWidth = R.cond([
  [
    ({ cardWidth, imageURL }) => typeof imageURL === 'string' && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardWidth }) => cardWidth,
  ],
  [
    ({ cardWidth, imageURL }) => typeof imageURL === 'string' && cardWidth === DEFAULT_CARD_WIDTH,
    R.always(DEFAULT_CARD_WIDTH),
  ],
  [
    ({ cardWidth, imageURL }) => typeof imageURL !== 'string' && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardWidth }) => cardWidth - DEFAULT_CARD_PADDING * 2,
  ],
  [
    ({ cardWidth, imageURL }) => typeof imageURL !== 'string' && cardWidth === DEFAULT_CARD_WIDTH,
    R.always(DEFAULT_CARD_WIDTH),
  ],
])

const shiftMarginDueToNoImageURLCss = css`
  margin-top: -15px;
  margin-left: -15px;
`

const HoverContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 9001;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${props => props.theme.colors['textPrimary']};
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  ${props => !props.hasImageURL && shiftMarginDueToNoImageURLCss};
`

const Hover = ({ hasImageURL, hoverAction, viewAction, id }) => (
  <HoverContainer hasImageURL={hasImageURL}>
    <PrimaryButton onClick={() => hoverAction({ id })}>Choose Article</PrimaryButton>
    <SecondaryButton onClick={() => viewAction({ id })}>View Article</SecondaryButton>
  </HoverContainer>
)

type PageType = 'RinkebyPublicProfile' | 'Collection'

type Props = {
  id: string,
  description: string,
  date: string,
  name: string,
  username: ?string,
  userId: string,
  userAvatar: string,
  articleCount: number,
  imageURL?: string,
  cardHeight?: number,
  cardWidth?: number,
  linkComponent?: (React.Node, string) => React.Node,
  pageType?: PageType,
  hoverAction?: ({ id: string }) => void,
  viewAction?: ({ id: string }) => void,
  isChosenCollection?: boolean,
}

const renderContent = ({
  imageURL,
  name,
  description,
  cardHeight,
  cardWidth,
  id,
  linkComponent,
  pageType,
  username,
  userId,
  userAvatar,
  date,
}) => (
  <React.Fragment>
    <Content imageURL={imageURL}>
      {renderCardContent({
        imageURL,
        name,
        description,
        cardHeight,
        cardWidth,
        id,
        linkComponent,
        pageType,
        username,
        userId,
        userAvatar,
        date,
      })}
    </Content>
  </React.Fragment>
)

const CollectionCard = ({
  id,
  description,
  date,
  name,
  username,
  userId,
  userAvatar,
  imageURL,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT,
  linkComponent,
  pageType,
  hoverAction,
  viewAction,
  toggledOn,
  show,
  hide,
  isChosenCollection,
  articleCount,
}: Props & ToggleProps) => (
  <BaseCard
    imageURL={imageURL}
    cardWidth={calculateCardWidth({ cardWidth, imageURL })}
    cardHeight={calculateCardHeight({ cardHeight, cardWidth, imageURL })}
    handleMouseEnter={show}
    handleMouseLeave={hide}
    isChosenArticle={isChosenCollection}
    toggledOn={toggledOn}
    hoverAction={hoverAction}
  >
    {typeof hoverAction === 'function' &&
      typeof viewAction === 'function' &&
      toggledOn === true && (
      <Hover hasImageURL={imageURL} viewAction={viewAction} hoverAction={hoverAction} id={id} />
    )}
    <Container imageURL={imageURL}>
      {renderContent({
        imageURL,
        name,
        description,
        cardHeight,
        cardWidth,
        id,
        linkComponent,
        pageType,
        username,
        userId,
        userAvatar,
        date,
      })}
      {typeof imageURL !== 'string' && <Divider />}
      <Footer imageURL={imageURL}>
        <H4>{parseInt(articleCount) || '0'}</H4>
        <Label>Articles</Label>
      </Footer>
    </Container>
  </BaseCard>
)

export default withToggle(CollectionCard)
