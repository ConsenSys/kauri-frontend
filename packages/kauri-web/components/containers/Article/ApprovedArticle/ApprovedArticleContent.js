// @flow
import React from 'react'
import styled from 'styled-components'
import { EditorState, convertFromRaw } from 'draft-js'
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
  CreateRequestDetails,
} from '../../CreateRequestForm/CreateRequestContent'
import DescriptionRow from '../../Requests/DescriptionRow'
import { contentStateFromHTML, getHTMLFromMarkdown } from '../../../../lib/markdown-converter-helper'
import ShareArticle from '../../../../../kauri-components/components/Tooltip/ShareArticle.bs'
import Outline from '../../../../../kauri-components/components/Typography/Outline.bs'
import ArticleAction from '../../../../../kauri-components/components/Articles/ArticleAction.bs'

export const ApprovedArticleDetails = CreateRequestDetails.extend`
  align-items: inherit;
  > :last-child {
    margin-top: 0px;
  }
`

const UpdateArticleSvgIcon = () => (
  <svg aria-hidden='true' data-prefix='fas' data-icon='file' role='img' viewBox='0 0 384 512'>
    <path
      fill='#0BA986'
      d='M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z'
    />
  </svg>
)

export default ({
  text,
  username,
  userId,
  routeChangeAction,
  article_id,
  article_version,
  subject,
}: {
  text?: string,
  username?: ?string,
  userId?: ?string,
  routeChangeAction: string => void,
  article_id: string,
  subject?: string,
  article_version: number,
}) => {
  let editorState = typeof text === 'string' && JSON.parse(text)
  editorState =
    editorState && typeof editorState.markdown === 'string'
      ? editorState
      : EditorState.createWithContent(convertFromRaw(JSON.parse(text)))

  const outlineHeadings =
    typeof editorState === 'object' &&
    (editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type.includes('header'))
        .map(header => header.text)
      : editorState.blocks && editorState.blocks.filter(block => block.type.includes('header'))
    ).map(header => header.text)

  return (
    <SubmitArticleFormContent>
      <SubmitArticleFormContainer type='approved article'>
        <DescriptionRow fullText record={{ text }} />
      </SubmitArticleFormContainer>
      <ApprovedArticleDetails type='outline'>
        <Outline
          headings={outlineHeadings || []}
          username={username || userId}
          userId={userId}
          routeChangeAction={routeChangeAction}
        />
        <ArticleAction
          svgIcon={<UpdateArticleSvgIcon />}
          text={'Update Article'}
          handleClick={() =>
            routeChangeAction(`/article/${article_id}/article-version/${article_version}/update-article`)
          }
        >
          Update article
        </ArticleAction>
        <ShareArticle
          url={`https://${
            process.env.monolithExternalApi.includes('rinkeby') ? 'rinkeby.kauri.io/' : 'dev.kauri.io/'
          }/article/${article_id}/article-version/${article_version}`}
          title={subject}
        />
      </ApprovedArticleDetails>
    </SubmitArticleFormContent>
  )
}
