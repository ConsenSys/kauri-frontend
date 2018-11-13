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

const Image = styled.div`
  height: ${props => props.cardHeight < 420 ? '116px' : '170px'};
  background: url(${props => typeof props.imageURL === 'string' && props.imageURL}) center center / cover;
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
  > a {
    height: ${props => (props.imageURL ? 'calc(100% - 85px)' : '100%')};
  }
`

const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  > span:first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  ${props => typeof props.imageURL === 'string' && withImageURLPaddingCss};
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${props => typeof props.imageURL === 'string' && withImageURLPaddingCss};
  padding-top: ${props => typeof props.imageURL === 'string' && '0px'};
`

const withImageURLDividerCss = css`
  width: calc(100% - ${props => props.theme.space[3]}px);
  margin-left: ${props => props.theme.space[2]}px;
`

const Divider = styled.div`
  width: 100%;
  margin: ${props => props.theme.space[2]}px 0px;
  margin-top: auto;
  background-color: ${props => props.theme.colors['divider']};
  height: 1px;
  ${props => typeof props.imageURL === 'string' && withImageURLDividerCss};
`

const renderDescriptionRowContent = (content, cardHeight, imageURL) => {
  if (process.env.STORYBOOK !== 'true') {
    const DescriptionRow = require('../../../kauri-web/components/common/DescriptionRow.js').default
    return React.createElement(
      DescriptionRow,
      { record: { text: content }, type: 'article card', cardHeight, imageURL },
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
  [({ cardHeight, imageURL }) => cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== 'string', R.always(8)],
  [({ imageURL }) => typeof imageURL === 'string', R.always(3)],
])

let renderCardContent = ({ title, content, cardHeight, cardWidth, imageURL, date }) => (
  <React.Fragment>
    {typeof imageURL === 'string' && <Image cardHeight={cardHeight} imageURL={imageURL} />}
    <Content imageURL={imageURL}>
      <Label>{'Posted ' + date}</Label>
      <H1>
        <TextTruncate line={titleLineHeight({ cardHeight, imageURL })} truncateText='…' text={title} />
      </H1>
      { cardHeight >= 420 && content.substring(0, 2).includes('{') ? (
        renderDescriptionRowContent(content, cardHeight, imageURL)
      ) : (
        cardHeight >= 420 && <BodyCard>
          <TextTruncate line={contentLineHeight({ cardHeight, cardWidth, imageURL })} truncateText='…' text={content} />
        </BodyCard>
      )}
    </Content>
  </React.Fragment>
)

let renderPublicProfile = (pageType, username, userId, cardWidth, userAvatar, imageURL) => (
  <UserAvatar fullWidth={cardWidth > DEFAULT_CARD_WIDTH} username={username} userId={userId} avatar={userAvatar} />
)

const calculateCardHeight = R.cond([
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== 'string' && cardHeight > DEFAULT_CARD_HEIGHT && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardHeight }) => cardHeight - DEFAULT_CARD_PADDING * 2,
  ],
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== 'string' && cardHeight === DEFAULT_CARD_HEIGHT && cardWidth > DEFAULT_CARD_WIDTH,
    R.always(290 - DEFAULT_CARD_PADDING * 2),
  ],
  [
    ({ cardHeight, imageURL }) => typeof imageURL === 'string' && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [({ cardHeight, imageURL }) => typeof imageURL === 'string' && cardHeight === DEFAULT_CARD_HEIGHT, R.always(290)],
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

const Hover = ({ hasImageURL, hoverAction, viewAction, id, version, isChosenArticle }) => (
  <HoverContainer hasImageURL={hasImageURL}>
    <PrimaryButton onClick={() => hoverAction({ id, version })}>{`${
      isChosenArticle === true ? 'Remove' : 'Choose'
    } Article`}</PrimaryButton>
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
  userAvatar: string,
  imageURL?: string,
  cardHeight?: number,
  cardWidth?: number,
  linkComponent?: (React.Node, string) => React.Node,
  pageType?: PageType,
  hoverAction?: ({ id: string, version: string }) => void,
  viewAction?: ({ id: string, version: string }) => void,
  isChosenArticle?: boolean,
  resourceType: 'article' | 'community',
}

const ArticleCard = ({
  id,
  version,
  content,
  date,
  title,
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
  isChosenArticle,
  resourceType = 'article',
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
      <Hover
        isChosenArticle={isChosenArticle}
        hasImageURL={imageURL}
        viewAction={viewAction}
        hoverAction={hoverAction}
        id={id}
        version={version}
      />
    )}
    <Container imageURL={imageURL}>
      {typeof linkComponent === 'function'
        ? linkComponent(
          renderCardContent({ title, content, cardHeight, cardWidth, imageURL, date }),
          `/article/${id}/v${version}`
        )
        : renderCardContent({ title, content, cardHeight, cardWidth, imageURL, date })}
      <Divider imageURL={imageURL} />
      <Footer imageURL={imageURL}>
        {typeof linkComponent === 'function'
          ? linkComponent(
            renderPublicProfile(
              pageType,
              username,
              userId,
              calculateCardWidth({ cardWidth, imageURL }),
              userAvatar,
              imageURL
            ),
            resourceType === 'community' ? `/community/${userId}` : `/public-profile/${userId}`
          )
          : renderPublicProfile(
            pageType,
            username,
            userId,
            calculateCardWidth({ cardWidth, imageURL }),
            userAvatar,
            imageURL
          )}
      </Footer>
    </Container>
  </BaseCard>
)

export default withToggle(ArticleCard)
