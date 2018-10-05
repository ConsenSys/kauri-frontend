// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import BaseCard from './BaseCard'
import { Label, H1, BodyCard } from '../Typography'
import R from 'ramda'
import TextTruncate from 'react-text-truncate'

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
  min-width: 262px;
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
  [({ cardHeight, imageURL }) => cardHeight <= 290 && typeof imageURL !== 'string', R.always(2)],
  [({ cardHeight, imageURL }) => cardHeight > 290 && typeof imageURL !== 'string', R.always(3)],
  [({ imageURL }) => typeof imageURL === 'string', R.always(2)],
])

const contentLineHeight = R.cond([
  [({ cardHeight, imageURL }) => cardHeight <= 290 && typeof imageURL !== 'string', R.always(8)],
  [({ cardHeight, imageURL }) => cardHeight > 290 && typeof imageURL !== 'string', R.always(12)],
  [({ imageURL }) => typeof imageURL === 'string', R.always(3)],
])

let renderCardContent = (title, content, cardHeight, imageURL) =>
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
            line={contentLineHeight({ cardHeight, imageURL })}
            truncateText='…'
            text={content}
          />
        </BodyCard>
    }
  </React.Fragment>

let renderPublicProfile = (pageType, username, userId) =>
  <UserWidgetSmall pageType={pageType} username={username || (userId.substring(0, 11) + '...' + userId.substring(userId.length - 13, 11))} />

type PageType = 'RinkebyPublicProfile' | 'Collection'

type Props = {
  date: string,
  title: string,
  articleId: string,
  articleVersion: string,
  content: string,
  username: ?string,
  userId: string,
  cardHeight?: number,
  imageURL?: string,
  linkComponent?: (React.Node, string) => React.Node,
  pageType?: PageType
}

const ArticleCard = (
  {
    date,
    title,
    content,
    articleId,
    articleVersion,
    imageURL,
    pageType,
    linkComponent,
    username,
    userId,
    cardHeight = 290,
    children,
  }: Props
) =>
  <BaseCard imageURL={imageURL} cardHeight={(typeof imageURL === 'string' && cardHeight === 290) ? 420 : cardHeight}>
    {typeof imageURL === 'string' && <Image src={imageURL} />}
    <Container imageURL={imageURL}>
      <Content imageURL={imageURL}>
        <Label>{'Posted ' + date}</Label>
        {
          typeof linkComponent !== 'undefined'
            ? linkComponent(renderCardContent(title, content, cardHeight, imageURL), `/article/${articleId}/v${articleVersion}`)
            : renderCardContent(title, content, cardHeight, imageURL)
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
