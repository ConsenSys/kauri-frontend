// @flow
import React from 'react'
import {
  CreateRequestContent as InReviewArticleFormContent,
  CreateRequestContainer as InReviewArticleFormContainer,
} from '../../CreateRequestForm/CreateRequestContent'
import { ApprovedArticleDetails as InReviewArticleDetails } from '../ApprovedArticle/ApprovedArticleContent'
import InReviewArticleGeneralCommentForm from './InReviewArticleGeneralCommentForm'
import InReviewArticleGeneralComments from './InReviewArticleGeneralComments'
import { contentStateFromHTML, getHTMLFromMarkdown } from '../../../../lib/markdown-converter-helper'
import userIdTrim from '../../../../lib/userid-trim'
import Outline from '../../../../../kauri-components/components/Typography/Outline.bs'
import { Link } from '../../../../routes'
import DescriptionRow from '../../../common/DescriptionRow'

type Comments = Array<?CommentDTO>

export default ({
  editorState,
  onEditorChange,
  comments,
  category,
  toggleModalAction,
  loaded,
  article_id,
  article_version,
  addCommentAction,
  personalUsername,
  deleteArticleComment,
  routeChangeAction,
  text,
  status,
  username,
  userId,
}: {
  editorState: any,
  onEditorChange: any => void,
  category: string,
  comments: Comments,
  routeChangeAction: string => void,
  toggleModalAction: any,
  loaded: () => void,
  article_id: string,
  article_version: string,
  addCommentAction: any,
  personalUsername: ?string,
  deleteArticleComment: any,
  text: string,
  status: string,
  username?: ?string,
  userId?: ?string,
}) => {
  editorState = editorState && typeof editorState === 'string' ? JSON.parse(editorState) : editorState

  const outlineHeadings =
    typeof editorState === 'object' &&
    (editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type.includes('header'))
        .map(header => header.text)
      : editorState.blocks &&
        editorState.blocks.filter(block => block.type.includes('header')).map(header => header.text))

  return (
    <InReviewArticleFormContent>
      <InReviewArticleFormContainer type='in review article'>
        <DescriptionRow fullText record={{ text }} />
        {comments &&
          comments.length > 0 &&
          comments.filter(comment => typeof comment.anchor_key !== 'string') && (
          <InReviewArticleGeneralComments
            comments={
              comments && comments.length > 0 && comments.filter(comment => typeof comment.anchor_key !== 'string')
            }
          />
        )}
        <InReviewArticleGeneralCommentForm
          addCommentAction={addCommentAction}
          article_id={article_id}
          article_version={article_version}
          status={status}
        />
      </InReviewArticleFormContainer>
      <InReviewArticleDetails type='outline'>
        <Outline
          routeChangeAction={routeChangeAction}
          linkComponent={children => (
            <Link useAnchorTag route={`/public-profile/${userId}`}>
              {children}
            </Link>
          )}
          userId={userId}
          headings={outlineHeadings || []}
          username={username || userIdTrim(userId)}
        />
      </InReviewArticleDetails>
    </InReviewArticleFormContent>
  )
}
