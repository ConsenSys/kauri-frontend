// @flow
import * as React from 'react'
import styled from 'styled-components'
import BaseCard from './BaseCard'
import { Label, H1, BodyCard } from '../Typography'

type PageType = 'RinkebyPublicProfile' | 'Collection'

type Props = {
  article: ArticleDTO,
  date: string,
  title: string,
  articleId: string,
  articleVersion: string,
  content: string,
  linkComponent: (React.Node, string) => React.Node,
  username: ?string,
  userId: string,
  cardHeight: number,
  imageURL: ?string,
  pageType: PageType
}

const Image = styled.image`
  height: 170px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  flex: 1;
  max-height: ${props => props.cardHeight || '400'}px;
  min-width: 262px;
  text-align: left;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 50px;
  padding-left: 14px;
  padding-right: 14px;
`;

const Content = styled.div`
  padding: 11px 14px;
  flex: 1;
  overflow: hidden;
`;

const renderDescriptionRowContent = (content, cardHeight) => {
  if (process.env.STORYBOOK !== 'true') {
    const DescriptionRow = require('../../../kauri-web/components/common/DescriptionRow.js').default;
    return React.createElement(DescriptionRow, { record: { text: content }, type: 'article card', cardHeight: cardHeight }, null);
  }
}

let getLineClamp = (title, cardHeight) => (title.length > 65 && cardHeight <= 290) ? title.substring(0, 65) + '...' : title

let renderCardContent = (title, content, cardHeight) =>
  <React.Fragment>
    <H1>
      {getLineClamp(title, cardHeight)}
    </H1>
    {
      content.substring(0, 2).includes('{') ? renderDescriptionRowContent(content)
        : <BodyCard>
          {content}
        </BodyCard>
    }
  </React.Fragment>

const UserWidgetSmall = styled.div`
  display: flex;
  height: 10px;
  width: 10px;
  background: black;
`;

let renderPublicProfile = (pageType, username, userId) =>
  <UserWidgetSmall pageType={pageType} username={username || (userId.substring(0, 11) + '...' + userId.substring(userId.length - 13, 11))} />

const Divider = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors['divider']};
  height: 2px;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

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
  <BaseCard>
    <Container>
      {typeof imageURL === 'string' && <Image src={imageURL} />}
      <Content>
        <Label text={'Posted ' + date} />
        {
          typeof linkComponent !== 'undefined'
            ? linkComponent(renderCardContent(title, content, cardHeight), `/article/${articleId}/v${articleVersion}`)
            : renderCardContent(title, content, cardHeight)
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
          }
      </Footer>
    </Container>
  </BaseCard>

export default ArticleCard
