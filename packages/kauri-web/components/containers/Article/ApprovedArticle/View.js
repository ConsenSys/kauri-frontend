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
import { hljs } from '../../../../lib/hljs'
import ScrollToTopOnMount from '../../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import ScrollToTopButton from '../../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton'

import type { TipArticlePayload } from '../Module'

const ArticleContent = styled.section`
background: white;
height: 100%;
`;

type Props =
  | {
    routeChangeAction: string => void,
    tipArticleAction: TipArticlePayload => void,
    ethUsdPrice: number,
    address?: string,
    data: { getArticle?: ArticleDTO },
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

  state = {
    showBanner: false,
  }

  componentDidUpdate () {
    R.map((block) => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  componentDidMount () {
    R.map((block) => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  toggleBanner = (status?: boolean) =>
    typeof status === 'boolean'
      ? this.setState({ showBanner: status })
      : this.setState({ showBanner: !this.state.showBanner })

  render () {
    const props = this.props
    if (!props.data.getArticle) return
    const { title, id, content } = props.data.getArticle
    const articleContent = content[0] === '{' && JSON.parse(content).markdown ? JSON.parse(content).markdown : content
    const articleKeywords = rake(articleContent, {
      language: 'english',
      delimiters: ['#', '##', '###', '####', '\n', '\n\n'],
    })
    const hostName = `https://${props.hostName}`

    return (
      <ArticleContent>
        <Helmet>
          <title>{title} - Kauri</title>
          <meta name='keywords' content={articleKeywords.map(i => i)} />
          <link rel='canonical' href={`https://${hostName}/article/${id}/${slugify(title, { lower: true })}`} />
        </Helmet>
        <ScrollToTopOnMount />
        <ScrollToTopButton />
        <ApprovedArticle.Actions
          routeChangeAction={props.routeChangeAction}
          tipArticleAction={props.tipArticleAction}
          toggleBanner={this.toggleBanner}
          ethUsdPrice={props.ethUsdPrice}
          {...props.data.getArticle}
        />
        {/* <ApprovedArticle.Banner
          type='article'
          showBanner={this.state.showBanner}
          ethUsdPrice={props.ethUsdPrice}
          tipArticleAction={props.tipArticleAction}
          toggleBanner={this.toggleBanner}
          request_id={props.data.getArticle && props.data.getArticle.request_id}
          article_id={props.data.getArticle && props.data.getArticle.id}
          article_version={props.data.getArticle && props.data.getArticle.version}
          user_id={props.data.getArticle && props.data.getArticle.authorId}
          hostName={hostName}
        /> */}
        <ApprovedArticle.Header {...props.data.getArticle} />
        <ApprovedArticle.Content
          text={props.data.getArticle && props.data.getArticle.content}
          subject={props.data.getArticle && props.data.getArticle.title}
          article_id={props.data.getArticle && props.data.getArticle.id}
          article_version={props.data.getArticle && props.data.getArticle.version}
          username={props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author.username}
          userId={props.data.getArticle && props.data.getArticle.authorId}
          routeChangeAction={props.routeChangeAction}
          address={props.userId}
          hostName={hostName}
        />
        <ApprovedArticle.Footer
          metadata={props.data.getArticle && props.data.getArticle.attributes}
          username={props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author.name}
          date_updated={props.data.getArticle && props.data.getArticle && props.data.getArticle.datePublished}
          content_hash={props.data.getArticle && props.data.getArticle && props.data.getArticle.contentHash}
          hostName={hostName}
        />
      </ArticleContent>
    )
  }
}

export default ApprovedArticle
