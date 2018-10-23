// @flow
import React from 'react'
import { Helmet } from 'react-helmet'
import slugify from 'slugify'
import rake from 'rake-js'
import R from 'ramda'
import styled from 'styled-components'
import Actions from './ApprovedArticleActions'
import Content from './ApprovedArticleContent'
import Header from './ApprovedArticleHeader'
import Banner from './ApprovedArticleBanner'
import Footer from './ApprovedArticleFooter'
import Comments from './ApprovedArticleComments'
import { hljs } from '../../../../lib/hljs'
import ScrollToTopOnMount from '../../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import ScrollToTopButton from '../../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton'

import type { TipArticlePayload } from '../Module'

const ArticleContent = styled.section`
  background: white;
  height: 100%;
`

type Props =
  | {
      userId?: string,
      routeChangeAction: string => void,
      tipArticleAction: TipArticlePayload => void,
      ethUsdPrice: number,
      address?: string,
      data: { getArticle: ArticleDTO },
    }
  | any

type State = {
  showBanner: boolean,
}

class ApprovedArticle extends React.Component<Props, State> {
  static Header = Header
  static Actions = Actions
  static Content = Content
  static Banner = Banner
  static Footer = Footer
  static Comments = Comments

  state = {
    showBanner: false,
  }

  componentDidUpdate () {
    R.map(block => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  componentDidMount () {
    R.map(block => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  toggleBanner = (status?: boolean) =>
    typeof status === 'boolean'
      ? this.setState({ showBanner: status })
      : this.setState({ showBanner: !this.state.showBanner })

  render () {
    const props = this.props
    if (!props.data.getArticle) return
    const { title, id, content, attributes } = props.data.getArticle
    const articleContent = content[0] === '{' && JSON.parse(content).markdown ? JSON.parse(content).markdown : content
    const articleKeywords = rake(articleContent, {
      language: 'english',
      delimiters: ['#', '##', '###', '####', '\n', '\n\n'],
    })
    const hostName = `https://${props.hostName}`

    const isCommunityOwned =
      R.path(['data', 'getArticle', 'owner', 'resourceIdentifier', 'type'])(props) === 'COMMUNITY'

    return (
      <ArticleContent>
        <Helmet>
          <title>{title} - Kauri</title>
          <meta name='keywords' content={articleKeywords.map(i => i)} />
          <link rel='canonical' href={`https://${hostName}/article/${id}/${slugify(title, { lower: true })}`} />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="kauri.io" />
          <meta property="og:url" content={`https://${hostName}/article/${id}/${slugify(title, { lower: true })}`} />
          <meta property="og:description" content={`${articleContent}...`} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={(attributes && attributes.background && attributes.background) || '/static/images/logo.svg'} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" ccontent={`https://${hostName}/article/${id}/${slugify(title, { lower: true })}`} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={`${articleContent}...`} />
          <meta name="twitter:creator" content="@kauri_io" />
          <meta name="twitter:image" content={(attributes && attributes.background && attributes.background) || '/static/images/logo.svg'} />
        </Helmet>
        <ScrollToTopOnMount />
        <ScrollToTopButton />
        <ApprovedArticle.Header {...props.data.getArticle} />
        <ApprovedArticle.Content
          text={props.data.getArticle && props.data.getArticle.content}
          subject={props.data.getArticle && props.data.getArticle.title}
          article_id={props.data.getArticle && props.data.getArticle.id}
          article_version={props.data.getArticle && props.data.getArticle.version}
          ownerId={props.data.getArticle && props.data.getArticle.owner && props.data.getArticle.owner.id}
          username={
            isCommunityOwned
              ? R.path(['data', 'getArticle', 'owner', 'name'])(props)
              : R.path(['data', 'getArticle', 'owner'])(props)
                ? R.path(['data', 'getArticle', 'owner', 'username'])(props)
                : R.path(['data', 'getArticle', 'author', 'username'])(props)
          }
          userAvatar={
            props.data.getArticle && props.data.getArticle.owner
              ? props.data.getArticle.owner.avatar
              : props.data.getArticle.author.avatar
          }
          userId={this.props.userId}
          authorId={props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author.id}
          routeChangeAction={props.routeChangeAction}
          address={props.userId}
          hostName={hostName}
          resourceType={R.pipe(
            R.path(['data', 'getArticle', 'owner', 'resourceIdentifier', 'type']),
            R.toLower
          )(props)}
        />
        <ApprovedArticle.Footer
          metadata={props.data.getArticle && props.data.getArticle.attributes}
          username={
            props.data.getArticle &&
            props.data.getArticle.owner &&
            (props.data.getArticle.owner.username || props.data.getArticle.author.username)
          }
          date_updated={props.data.getArticle && props.data.getArticle && props.data.getArticle.datePublished}
          content_hash={props.data.getArticle && props.data.getArticle && props.data.getArticle.contentHash}
          hostName={hostName}
        />
        <ApprovedArticle.Comments
          id={props.data.getArticle && props.data.getArticle.id}
          version={props.data.getArticle && props.data.getArticle.version}
          comments={props.data.getArticle && props.data.getArticle.comments && props.data.getArticle.comments.content}
          userId={this.props.userId}
          username={props.data.getArticle && props.data.getArticle.owner && props.data.getArticle.owner.username}
          authorId={props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author.id}
        />
      </ArticleContent>
    )
  }
}

export default ApprovedArticle
