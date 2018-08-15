// @flow
import React from 'react'
import Actions from './ApprovedArticleActions'
import Content from './ApprovedArticleContent'
import Header from './ApprovedArticleHeader'
import Banner from './ApprovedArticleBanner'
import Footer from './ApprovedArticleFooter'
import ScrollToTopOnMount from '../../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'

import type { TipArticlePayload } from '../Module'

type Props =
  | {
      routeChangeAction: string => void,
      tipArticleAction: TipArticlePayload => void,
      ethUsdPrice: number,
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

  toggleBanner = (status?: boolean) =>
    typeof status === 'boolean'
      ? this.setState({ showBanner: status })
      : this.setState({ showBanner: !this.state.showBanner })

  render () {
    const props = this.props
    return (
      <section>
        <ScrollToTopOnMount />
        <ApprovedArticle.Actions
          routeChangeAction={props.routeChangeAction}
          tipArticleAction={props.tipArticleAction}
          toggleBanner={this.toggleBanner}
          ethUsdPrice={props.ethUsdPrice}
          {...props.data.getArticle}
        />
        <ApprovedArticle.Banner
          type='article'
          showBanner={this.state.showBanner}
          ethUsdPrice={props.ethUsdPrice}
          tipArticleAction={props.tipArticleAction}
          toggleBanner={this.toggleBanner}
          request_id={props.data.getArticle && props.data.getArticle.request_id}
          article_id={props.data.getArticle && props.data.getArticle.article_id}
          article_version={props.data.getArticle && props.data.getArticle.article_version}
          user_id={props.data.getArticle && props.data.getArticle.user_id}
        />
        <ApprovedArticle.Header {...props.data.getArticle} />
        <ApprovedArticle.Content
          text={props.data.getArticle && props.data.getArticle.text}
          subject={props.data.getArticle && props.data.getArticle.subject}
          article_id={props.data.getArticle && props.data.getArticle.article_id}
          article_version={props.data.getArticle && props.data.getArticle.article_version}
          username={props.data.getArticle && props.data.getArticle.user && props.data.getArticle.user.username}
          userId={props.data.getArticle && props.data.getArticle.user_id}
          routeChangeAction={props.routeChangeAction}
        />
        <ApprovedArticle.Footer
          metadata={props.data.getArticle && props.data.getArticle.metadata}
          username={props.data.getArticle && props.data.getArticle.user && props.data.getArticle.user.username}
          date_updated={props.data.getArticle && props.data.getArticle && props.data.getArticle.date_updated}
          content_hash={props.data.getArticle && props.data.getArticle && props.data.getArticle.content_hash}
        />
      </section>
    )
  }
}

export default ApprovedArticle
