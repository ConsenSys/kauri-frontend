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
  > * {
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

const renderDescriptionRowContent = (content, cardHeight) => {
  if (process.env.STORYBOOK !== 'true') {
    const DescriptionRow = require('../../../kauri-web/components/common/DescriptionRow.js').default
    return React.createElement(
      DescriptionRow,
      { record: { text: content }, type: 'article card', cardHeight: cardHeight },
      null
    )
  }
}

const titleLineHeight = R.cond([
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

let renderActualContent = (
  title,
  content,
  cardHeight,
  cardWidth,
  imageURL,
  pageType,
  username,
  userId,
  date,
  linkComponent
) => (
  <React.Fragment>
    <Label>{'Collection'}</Label>
    <H1>
      <TextTruncate line={titleLineHeight({ cardHeight, imageURL })} truncateText='…' text={title} />
    </H1>
    {content.substring(0, 2).includes('{') ? (
      renderDescriptionRowContent(content)
    ) : (
      <BodyCard>
        <TextTruncate line={contentLineHeight({ cardHeight, cardWidth, imageURL })} truncateText='…' text={content} />
      </BodyCard>
    )}
    {typeof linkComponent !== 'undefined' && typeof pageType !== 'undefined'
      ? linkComponent(
        renderPublicProfile(pageType, username, userId, calculateCardWidth({ cardWidth, imageURL }), imageURL),
        `/public-profile/${userId}`
      )
      : renderPublicProfile(pageType, username, userId, calculateCardWidth({ cardWidth, imageURL }), imageURL)}
    <Label>{'Updated ' + date}</Label>
  </React.Fragment>
)

let renderCardContent = (
  title,
  content,
  cardHeight,
  cardWidth,
  imageURL,
  pageType,
  username,
  userId,
  date,
  linkComponent
) =>
  typeof imageURL === 'string' ? (
    <Mask>
      {renderActualContent(
        title,
        content,
        cardHeight,
        cardWidth,
        imageURL,
        pageType,
        username,
        userId,
        date,
        linkComponent
      )}
    </Mask>
  ) : (
    <React.Fragment>
      {renderActualContent(
        title,
        content,
        cardHeight,
        cardWidth,
        imageURL,
        pageType,
        username,
        userId,
        date,
        linkComponent
      )}
    </React.Fragment>
  )

let renderPublicProfile = (pageType, username, userId, cardWidth, imageURL) => (
  <UserAvatar
    color={typeof imageURL === 'string' ? 'white' : 'textPrimary'}
    fullWidth={cardWidth > DEFAULT_CARD_WIDTH}
    username={username}
    userId={userId}
  />
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

const Hover = ({ hasImageURL, hoverAction, viewAction, id, version }) => (
  <HoverContainer hasImageURL={hasImageURL}>
    <PrimaryButton onClick={() => hoverAction({ id, version })}>Choose Article</PrimaryButton>
    <SecondaryButton onClick={() => viewAction({ id, version })}>View Article</SecondaryButton>
  </HoverContainer>
)

type PageType = 'RinkebyPublicProfile' | 'Collection'

type Props = {
  id: string,
  version: string,
  content: string,
  date: string,
  title: string,
  username: ?string,
  userId: string,
  articleCount: number,
  imageURL?: string,
  cardHeight?: number,
  cardWidth?: number,
  linkComponent?: (React.Node, string) => React.Node,
  pageType?: PageType,
  hoverAction?: ({ id: string, version: string }) => void,
  viewAction?: ({ id: string, version: string }) => void,
  isChosenCollection?: boolean,
}

const renderContent = ({
  imageURL,
  title,
  content,
  cardHeight,
  cardWidth,
  id,
  version,
  linkComponent,
  pageType,
  username,
  userId,
  date,
}) => (
  <React.Fragment>
    <Content imageURL={imageURL}>
      {typeof linkComponent !== 'undefined'
        ? linkComponent(
          renderCardContent(title, content, cardHeight, cardWidth, imageURL, pageType, username, userId, date),
          `/article/${id}/v${version}`
        )
        : renderCardContent(
          title,
          content,
          cardHeight,
          cardWidth,
          imageURL,
          pageType,
          username,
          userId,
          date,
          linkComponent
        )}
    </Content>
  </React.Fragment>
)

const CollectionCard = ({
  id,
  version,
  content,
  date,
  title,
  username,
  userId,
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
      <Hover hasImageURL={imageURL} viewAction={viewAction} hoverAction={hoverAction} id={id} version={version} />
    )}
    <Container imageURL={imageURL}>
      {renderContent({
        imageURL,
        title,
        content,
        cardHeight,
        cardWidth,
        id,
        version,
        linkComponent,
        pageType,
        username,
        userId,
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
