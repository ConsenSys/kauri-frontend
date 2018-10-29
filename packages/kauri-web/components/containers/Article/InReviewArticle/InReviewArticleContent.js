// @flow
import React from 'react'
import {
  CreateRequestContent as InReviewArticleFormContent,
  CreateRequestContainer as InReviewArticleFormContainer,
} from '../../CreateRequestForm/CreateRequestContent'
import { ApprovedArticleDetails as InReviewArticleDetails } from '../ApprovedArticle/ApprovedArticleContent'
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
  userAvatar,
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
  username: ?string,
  userId: string,
  userAvatar: ?string,
}) => {
  editorState = editorState && typeof editorState === 'string' ? JSON.parse(editorState) : editorState

  const outlineHeadings =
    typeof editorState === 'object' &&
    (editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type.includes('header-one'))
        .map(header => header.text)
      : editorState.blocks &&
        editorState.blocks.filter(block => block.type.includes('header-one')).map(header => header.text))

  return (
    <InReviewArticleFormContent>
      <InReviewArticleFormContainer type='in review article'>
        <DescriptionRow fullText record={{ text }} />
      </InReviewArticleFormContainer>
      <InReviewArticleDetails type='outline'>
        <Outline
          routeChangeAction={routeChangeAction}
          linkComponent={children => (
            <Link useAnchorTag route={`/public-profile/${userId}`}>
              {children}
            </Link>
          )}
          headings={outlineHeadings || []}
          username={username}
          userId={userIdTrim(userId)}
          userAvatar={userAvatar}
          text={'AUTHOR'}
        />
      </InReviewArticleDetails>
    </InReviewArticleFormContent>
  )
}
