// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import BaseCard from './BaseCard'
import { Label, H1, BodyCard } from '../Typography'
import theme from '../../lib/theme-config'
import R from 'ramda'
import TextTruncate from 'react-text-truncate'

const DEFAULT_CARD_HEIGHT = 290
const DEFAULT_CARD_WIDTH = 290
const DEFAULT_CARD_PADDING = theme.space[2]

const Image = styled.img`
  height: 170px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const withImageURLPaddingCss = css`
  padding: ${props => props.theme.space[2]}px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  flex: 1;
  text-align: left;
  ${props => typeof props.imageURL === 'string' && withImageURLPaddingCss};
`;

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
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Divider = styled.div`
  width: 100%;
  margin: ${props => props.theme.space[2]}px 0px;
  background-color: ${props => props.theme.colors['divider']};
  height: 2px;
`;

const UserWidgetSmall = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  background: black;
  border-radius: 50%;
`;

const renderDescriptionRowContent = (content, cardHeight) => {
  if (process.env.STORYBOOK !== 'true') {
    const DescriptionRow = require('../../../kauri-web/components/common/DescriptionRow.js').default;
    return React.createElement(DescriptionRow, { record: { text: content }, type: 'article card', cardHeight: cardHeight }, null);
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

let renderCardContent = (title, content, cardHeight, cardWidth, imageURL) =>
  <React.Fragment>
    <H1>
      <TextTruncate
        line={titleLineHeight({ cardHeight, imageURL })}
        truncateText='…'
        text={title}
      />
    </H1>
    {
      content.substring(0, 2).includes('{')
        ? renderDescriptionRowContent(content)
        : <BodyCard>
          <TextTruncate
            line={contentLineHeight({ cardHeight, cardWidth, imageURL })}
            truncateText='…'
            text={content}
          />
        </BodyCard>
    }
  </React.Fragment>

let renderPublicProfile = (pageType, username, userId) =>
  <UserWidgetSmall pageType={pageType} username={username || (userId.substring(0, 11) + '...' + userId.substring(userId.length - 13, 11))} />

const calculateCardHeight = R.cond([
  [({ cardHeight, cardWidth, imageURL }) => (typeof imageURL !== 'string' && cardHeight > DEFAULT_CARD_HEIGHT && cardWidth > DEFAULT_CARD_WIDTH), ({ cardHeight }) => R.always(cardHeight)],
  [({ cardHeight, cardWidth, imageURL }) => (typeof imageURL !== 'string' && cardHeight === DEFAULT_CARD_HEIGHT && cardWidth > DEFAULT_CARD_WIDTH), R.always(420 - (DEFAULT_CARD_PADDING * 2))],
  [({ cardHeight, imageURL }) => (typeof imageURL === 'string' && cardHeight > DEFAULT_CARD_HEIGHT), ({ cardHeight }) => R.always(cardHeight)],
  [({ cardHeight, imageURL }) => (typeof imageURL === 'string' && cardHeight === DEFAULT_CARD_HEIGHT), R.always(420)],
  [({ cardHeight, imageURL }) => (typeof imageURL !== 'string' && cardHeight > DEFAULT_CARD_HEIGHT), ({ cardHeight }) => R.always(cardHeight - (DEFAULT_CARD_PADDING * 2))],
  [({ cardHeight, imageURL }) => (typeof imageURL !== 'string' && cardHeight === DEFAULT_CARD_HEIGHT), R.always(DEFAULT_CARD_HEIGHT - (DEFAULT_CARD_PADDING * 2))],
])

const calculateCardWidth = R.cond([
  [({ cardWidth, imageURL }) => (typeof imageURL === 'string' && cardWidth > DEFAULT_CARD_WIDTH), ({ cardWidth }) => R.always(cardWidth)],
  [({ cardWidth, imageURL }) => (typeof imageURL === 'string' && cardWidth === DEFAULT_CARD_WIDTH), R.always(DEFAULT_CARD_WIDTH)],
  [({ cardWidth, imageURL }) => (typeof imageURL !== 'string' && cardWidth > DEFAULT_CARD_WIDTH), ({ cardWidth }) => R.always(cardWidth - (DEFAULT_CARD_PADDING * 2))],
  [({ cardWidth, imageURL }) => (typeof imageURL !== 'string' && cardWidth === DEFAULT_CARD_WIDTH), R.always(DEFAULT_CARD_WIDTH - (DEFAULT_CARD_PADDING * 2))],
])

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
}

const ArticleCard = (
  {
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
  }: Props
) =>
  <BaseCard
    imageURL={imageURL}
    cardWidth={calculateCardWidth({ cardWidth, imageURL })}
    cardHeight={calculateCardHeight({ cardHeight, cardWidth, imageURL })}
  >
    {typeof imageURL === 'string' && <Image src={imageURL} />}
    <Container imageURL={imageURL}>
      <Content imageURL={imageURL}>
        <Label>{'Posted ' + date}</Label>
        {
          typeof linkComponent !== 'undefined'
            ? linkComponent(renderCardContent(title, content, cardHeight, cardWidth, imageURL), `/article/${id}/v${version}`)
            : renderCardContent(title, content, cardHeight, cardWidth, imageURL)
        }
      </Content>
      <Divider />
      <Footer>
        {
          (typeof linkComponent !== 'undefined' && typeof pageType !== 'undefined')
            ? linkComponent(
              renderPublicProfile(pageType, username, userId),
              `/public-profile/${userId}`
            )
            : renderPublicProfile(pageType, username, userId)
        }
      </Footer>
    </Container>
  </BaseCard>

export default ArticleCard
