// @flow
import * as React from 'react'
import styled from 'styled-components'

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

let renderContent = (content: string, cardHeight, title) =>
  <React.Fragment>
    <Heading cardHeight={cardHeight} text={title} />
    {
      content.substring(0, 2).includes('{')
        ? renderDescriptionRowContent(content)
        : <Paragraph text={content} />
    }
  </React.Fragment>

let renderPublicProfile = (pageType, username, userId) =>
  <UserWidgetSmall pageType={pageType} username={username || (userId.substring(0, 11) + '...' + userId.substring(userId.length - 13, 11))} />

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
