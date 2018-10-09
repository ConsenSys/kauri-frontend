// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import BaseCard from './BaseCard'
import { Label, H1, BodyCard } from '../Typography'
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

const Image = styled.img`
  height: 170px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const withImageURLPaddingCss = css`
  padding: ${props => props.theme.space[2]}px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
  ${props => typeof props.imageURL === 'string' && withImageURLPaddingCss};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  > span:first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
  [({ cardWidth, imageURL }) => cardWidth > DEFAULT_CARD_WIDTH && typeof imageURL !== 'string', R.always(12)],
  [({ cardHeight, imageURL }) => cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(5)],
  [({ cardHeight, imageURL }) => cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(10)],
  [({ imageURL }) => typeof imageURL === 'string', R.always(3)],
])

let renderCardContent = (title, content, cardHeight, cardWidth, imageURL) => (
  <React.Fragment>
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
  </React.Fragment>
)

let renderPublicProfile = (pageType, username, userId, cardWidth) => (
  <UserAvatar fullWidth={cardWidth > DEFAULT_CARD_WIDTH} username={username} userId={userId} />
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
  [({ cardHeight, imageURL }) => typeof imageURL === 'string' && cardHeight === DEFAULT_CARD_HEIGHT, R.always(420)],
  [
    ({ cardHeight, imageURL }) => typeof imageURL !== 'string' && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) => typeof imageURL !== 'string' && cardHeight === DEFAULT_CARD_HEIGHT,
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
    ({ cardWidth }) => cardWidth,
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
  imageURL?: string,
  cardHeight?: number,
  cardWidth?: number,
  linkComponent?: (React.Node, string) => React.Node,
  pageType?: PageType,
  hoverAction?: ({ id: string, version: string }) => void,
  viewAction?: ({ id: string, version: string }) => void,
  isChosenArticle?: boolean,
}

const ArticleCard = ({
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
  isChosenArticle,
}: Props & ToggleProps) => (
  <BaseCard
    imageURL={imageURL}
    cardWidth={calculateCardWidth({ cardWidth, imageURL })}
    cardHeight={calculateCardHeight({ cardHeight, cardWidth, imageURL })}
    handleMouseEnter={show}
    handleMouseLeave={hide}
    isChosenArticle={isChosenArticle}
    toggledOn={toggledOn}
    hoverAction={hoverAction}
  >
    {typeof hoverAction === 'function' &&
      typeof viewAction === 'function' &&
      toggledOn === true && (
      <Hover hasImageURL={imageURL} viewAction={viewAction} hoverAction={hoverAction} id={id} version={version} />
    )}
    {typeof imageURL === 'string' && <Image src={imageURL} />}
    <Container imageURL={imageURL}>
      <Content imageURL={imageURL}>
        <Label>{'Posted ' + date}</Label>
        {typeof linkComponent !== 'undefined'
          ? linkComponent(
            renderCardContent(title, content, cardHeight, cardWidth, imageURL),
            `/article/${id}/v${version}`
          )
          : renderCardContent(title, content, cardHeight, cardWidth, imageURL)}
      </Content>
      <Divider />
      <Footer>
        {typeof linkComponent !== 'undefined' && typeof pageType !== 'undefined'
          ? linkComponent(
            renderPublicProfile(pageType, username, userId, calculateCardWidth({ cardWidth, imageURL })),
            `/public-profile/${userId}`
          )
          : renderPublicProfile(pageType, username, userId, calculateCardWidth({ cardWidth, imageURL }))}
      </Footer>
    </Container>
  </BaseCard>
)

export default withToggle(ArticleCard)
