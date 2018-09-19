// @flow
import React from 'react'
import R from 'ramda'
import { EditorState, ContentState } from 'draft-js'
import Actions from './InReviewArticleActions'
import Header from './InReviewArticleHeader'
import Content from './InReviewArticleContent'
import Footer from '../ApprovedArticle/ApprovedArticleFooter'
import NetworkBanner from '../../StyledFooter/NetworkBanner'
import { hljs } from '../../../../lib/hljs'
import ScrollToTopOnMount from '../../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import ScrollToTopButton from '../../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton'

type Props =
  | {
      routeChangeAction: string => void,
      ethUsdPrice: number,
      data: { getArticle?: ArticleDTO },
      topics?: Array<?string>,
      updateUnsubmittedArticle: () => void,
      approveArticle: () => void,
      toggleModalAction: any,
      rejectArticle: () => void,
      preApproveArticle: () => void,
      addCommentAction: any,
      deleteArticleComment: any,
      personalUsername: ?string,
      publishArticle: () => void,
      userId?: string
    }
  | any

type State = { editorState: any, loaded: boolean }

class InReviewArticle extends React.Component<Props, State> {
  static Header = Header
  static Actions = Actions
  static Content = Content
  static Footer = Footer

  constructor (props: Props) {
    super(props)
    if (props.data && props.data.getArticle && props.data.getArticle.content) {
      const newEditorUsed = JSON.parse(props.data.getArticle.content).markdown
      if (newEditorUsed) {
        const rawData = ContentState.createFromText(JSON.parse(props.data.getArticle.content).markdown)
        const newEditorState = EditorState.createWithContent(rawData)
        this.state = {
          editorState: { draftEditorState: newEditorState, markdown: JSON.parse(props.data.getArticle.content).markdown },
          loaded: false,
        }
        return
      } else {
        this.state = {
          loaded: false,
        }
        return
      }
    }
    this.state = {
      loaded: false,
    }
  }

  componentDidUpdate () {
    R.map((block) => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  componentDidMount () {
    R.map((block) => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  onEditorChange = (editorState: any) => {
    if (!this.state.loaded) return
    this.setState({ editorState })
  }

  render () {
    const props = this.props
    if (!this.props.data && !this.props.data.getArticle) return

    return (
      <section>
        <ScrollToTopOnMount />
        <ScrollToTopButton />
        <NetworkBanner type='withActionsHeader' />
        <InReviewArticle.Actions
          {...props.data.getArticle}
          routeChangeAction={props.routeChangeAction}
          ethUsdPrice={props.ethUsdPrice}
          isTopicOwner={
            props.topics &&
            props.topics.find(
              category => props.data && props.data.getArticle && props.data.getArticle.owner && props.data.getArticle.owner.id === category
            )
          }
          isContributor={props.userId === (props.data && props.data.getArticle && props.data.getArticle.authorId)}
          updateUnsubmittedArticle={props.updateUnsubmittedArticle}
          approveArticle={props.approveArticle}
          rejectArticle={props.rejectArticle}
          preApproveArticle={props.preApproveArticle}
          publishArticle={props.publishArticle}
        />
        <InReviewArticle.Header {...props.data.getArticle} />
        <InReviewArticle.Content
          loaded={() => this.setState({ ...this.state.editorState, loaded: true })}
          category={props.data && props.data.getArticle && props.data.getArticle.owner && props.data.getArticle.owner.id}
          text={props.data && props.data.getArticle && props.data.getArticle && props.data.getArticle.content}
          status={props.data && props.data.getArticle && props.data.getArticle && props.data.getArticle.status}
          comments={props.data && props.data.getArticle && props.data.getArticle && props.data.getArticle.comments}
          routeChangeAction={props.routeChangeAction}
          onEditorChange={this.onEditorChange}
          editorState={this.state.editorState}
          toggleModalAction={this.props.toggleModalAction}
          article_id={props.data && props.data.getArticle && props.data.getArticle && props.data.getArticle.id}
          article_version={props.data.getArticle && props.data.getArticle && props.data.getArticle.version}
          addCommentAction={props.addCommentAction}
          deleteArticleComment={props.deleteArticleComment}
          personalUsername={props.personalUsername}
          username={props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author.name}
          userId={props.data.getArticle && props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author.id}
        />
        <InReviewArticle.Footer
          type='in review article'
          date_updated={props.data && props.data.getArticle && props.data.getArticle.datePublished}
          username={props.data.getArticle && props.data.getArticle.author && props.data.getArticle.author && props.data.getArticle.author.name}
          metadata={props.data.getArticle && props.data.getArticle.attributes}
          content_hash={props.data.getArticle && props.data.getArticle && props.data.getArticle.contentHash}
        />
      </section>
    )
  }
}

export default InReviewArticle
