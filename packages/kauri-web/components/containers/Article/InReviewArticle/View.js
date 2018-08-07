// @flow
import React from 'react'
import { EditorState, ContentState, convertFromRaw } from 'draft-js'
import Actions from './InReviewArticleActions'
import Header from './InReviewArticleHeader'
import Content from './InReviewArticleContent'
import Footer from '../ApprovedArticle/ApprovedArticleFooter'
import NetworkBanner from '../../StyledFooter/NetworkBanner'

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
    if (props.data && props.data.getArticle && props.data.getArticle.text) {
      const newEditorUsed = JSON.parse(props.data.getArticle.text).markdown
      if (newEditorUsed) {
        const rawData = ContentState.createFromText(JSON.parse(props.data.getArticle.text).markdown)
        const newEditorState = EditorState.createWithContent(rawData)
        this.state = {
          editorState: { draftEditorState: newEditorState, markdown: JSON.parse(props.data.getArticle.text).markdown },
          loaded: false,
        }
      } else {
        this.state = {
          loaded: false,
        }
      }
    }
  }

  onEditorChange = (editorState: any) => {
    if (!this.state.loaded) return
    this.setState({ editorState })
  }

  render () {
    const props = this.props
    return (
      <section>
        <NetworkBanner type='withActionsHeader' />
        <InReviewArticle.Actions
          {...props.data.getArticle}
          routeChangeAction={props.routeChangeAction}
          ethUsdPrice={props.ethUsdPrice}
          isTopicOwner={
            props.topics &&
            props.topics.find(
              category => props.data && props.data.getArticle && props.data.getArticle.category === category
            )
          }
          isContributor={props.address === props.data.getArticle.user_id}
          updateUnsubmittedArticle={props.updateUnsubmittedArticle}
          approveArticle={props.approveArticle}
          rejectArticle={props.rejectArticle}
          preApproveArticle={props.preApproveArticle}
          publishArticle={props.publishArticle}
        />
        <InReviewArticle.Header {...props.data.getArticle} />
        <InReviewArticle.Content
          loaded={() => this.setState({ ...this.state.editorState, loaded: true })}
          category={props.data.getArticle.category}
          text={props.data.getArticle.text}
          comments={props.data.getArticle.comments}
          onEditorChange={this.onEditorChange}
          editorState={this.state.editorState}
          toggleModalAction={this.props.toggleModalAction}
          article_id={props.data.getArticle.article_id}
          addCommentAction={props.addCommentAction}
          deleteArticleComment={props.deleteArticleComment}
          personalUsername={props.personalUsername}
        />
        <InReviewArticle.Footer
          type='in review article'
          date_updated={props.data.getArticle.date_updated}
          username={props.data.getArticle.user && props.data.getArticle.user.username}
          metadata={props.data.getArticle && props.data.getArticle.metadata}
          content_hash={props.data.getArticle && props.data.getArticle && props.data.getArticle.content_hash}
        />
      </section>
    )
  }
}

export default InReviewArticle
