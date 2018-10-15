// @flow

import React from 'react'
import styled, { css } from 'styled-components'
import { compose } from 'recompose'
import withErrorCatch from '../../../lib/with-error-catch'
import TextTruncate from 'react-text-truncate'
import { getHTMLFromMarkdown } from '../../../lib/markdown-converter-helper'
import stripHTML from '../../../lib/html-to-plain-text'

type Props = {
  record: RequestDTO,
  inReviewArticleComment?: boolean,
  fullText?: boolean,
  requestPage?: boolean,
  recentRequest?: boolean,
  openRequest?: boolean,
  type?: 'article card',
  cardHeight?: number,
}

const hideAtomicBlock = css`
  figure,
  iframe {
    display: none;
  }
`

const maxThreeLinesCss = css`
  height: 4em;
  line-height: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
`

const openRequestCss = css`
  height: 1.5em;
`

const articleCardCss = css`
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  > :not(div) {
    display: none;
  }
  > div {
    font-size: 14px;
    :nth-child(1n + ${props => (props.cardHeight > 290 ? '4' : '3')}) {
      display: none;
    }
    :nth-child(${props => (props.cardHeight > 290 ? '3' : '2')}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`

const MaxThreeLines = styled.div`
  ${props => !props.fullText && hideAtomicBlock};
  ${props => !props.fullText && props.type !== 'article card' && maxThreeLinesCss};
  margin-top: 2px;
  font-size: 14px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-height: ${props => props.requestPage && '30vh'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  ${props => props.openRequest && openRequestCss};
  ${props => props.type === 'article card' && articleCardCss};
`

export default compose(withErrorCatch())(
  ({
    record: { text },
    fullText,
    requestPage,
    recentRequest,
    openRequest,
    inReviewArticleComment,
    type,
    cardHeight,
  }): Props => (
    <MaxThreeLines
      cardHeight={cardHeight}
      type={type}
      requestPage={requestPage}
      fullText={fullText}
      key={text}
      openRequest={openRequest}
    >
      {/* {console.log(EditorState.createWithContent(convertFromRaw(JSON.parse(text))))} */}
      {/* {console.log(type)} */}
      {typeof text === 'string' && text.charAt(0) === '{' ? (
        fullText && JSON.parse(text).markdown ? (
          <div
            className={`DescriptionRow-markdown ${fullText &&
              !inReviewArticleComment &&
              'DescriptionRow-markdown--fullText'}`}
            dangerouslySetInnerHTML={{ __html: getHTMLFromMarkdown(JSON.parse(text).markdown) }}
          />
        ) : (
          JSON.parse(text).markdown
            ? <TextTruncate
              line={cardHeight > 290 ? 8 : 3} truncateText='…' text={stripHTML(getHTMLFromMarkdown(JSON.parse(text).markdown))} />
            : 'Old Content, please migrate to new Markdown'
        )
      ) : inReviewArticleComment && typeof text === 'string' && text.length > 5 ? (
        text
      ) : (
        <span>Something went wrong.</span>
      )}
    </MaxThreeLines>
  )
)
