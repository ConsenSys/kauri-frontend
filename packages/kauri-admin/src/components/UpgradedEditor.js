import React from 'react'
import { MegadraftEditor } from 'megadraft'
import { EditorState, Modifier } from 'draft-js'
import styled, { css } from 'styled-components'
import DEFAULT_PLUGINS from 'megadraft/lib/plugins/default.js'
import icons from 'megadraft/lib/icons.js'
import { stateFromHTML } from 'draft-js-import-html'
import megadraftYoutubePlugin from '../forked_modules/youtube-plugin/src/plugin'
import megadraftCodeBlockPlugin from '../forked_modules/megadraft-codeblock-plugin/plugin'

export const HeaderTwoCss = css`
  font-style: normal;
  color: ${props => props.theme.primaryTextcolor};
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin: 20px 0px;
  * {
    font-size: 18px;
    font-weight: 700;
    margin: 21px 0px;
    color: ${props => props.theme.primaryTextcolor};
  }
`

export const TruncateWithEllipsisCss = css`
  color: ${props => props.theme.primaryTextcolor};
  white-space: pre-wrap;
  font-size: 16px;
  letter-spacing: -0.1px;
  line-height: 23px;
`

export const ListItemCss = css`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 16px;
  line-height: 21px;
  > * {
    font-size: 16px;
    line-height: 21px;
  }
`

const H2Icon = () => (
  <svg width="24px" height="24px" viewBox="0 0 20 12">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
      <path
        d="M9.50390625,12 L7.23046875,12 L7.23046875,7.2734375 L2.58984375,7.2734375 L2.58984375,12 L0.30859375,12 L0.30859375,0.625 L2.58984375,0.625 L2.58984375,5.515625 L7.23046875,5.515625 L7.23046875,0.625 L9.50390625,0.625 L9.50390625,12 Z M19.1132812,12 L11.3476562,12 L11.3476562,10.5078125 L15.0273437,6.5625 C15.5585964,5.95312195 15.9361968,5.43880418 16.1601562,5.01953125 C16.3841157,4.60025832 16.4960938,4.2109393 16.4960938,3.8515625 C16.4960938,3.37239344 16.3671888,2.98047027 16.109375,2.67578125 C15.8515612,2.37109223 15.4856795,2.21875 15.0117187,2.21875 C14.4856745,2.21875 14.0859389,2.39713363 13.8125,2.75390625 C13.5390611,3.11067887 13.4023437,3.58593453 13.4023437,4.1796875 L11.1835937,4.1796875 L11.1679687,4.1328125 C11.141927,3.1067657 11.4791632,2.2382848 12.1796875,1.52734375 C12.8802118,0.816402695 13.8242128,0.4609375 15.0117187,0.4609375 C16.1835996,0.4609375 17.1041633,0.765621953 17.7734375,1.375 C18.4427117,1.98437805 18.7773438,2.79686992 18.7773438,3.8125 C18.7773438,4.50000344 18.5885436,5.13411168 18.2109375,5.71484375 C17.8333314,6.29557582 17.2096398,7.05728695 16.3398438,8 L14.3164062,10.2109375 L14.3320312,10.25 L19.1132812,10.25 L19.1132812,12 Z"
        id="H2"
        fill="currentColor"
      />
    </g>
  </svg>
)

const actions = [
  { type: 'inline', label: 'B', style: 'BOLD', icon: icons.BoldIcon },
  { type: 'inline', label: 'I', style: 'ITALIC', icon: icons.ItalicIcon },
  { type: 'block', label: 'H2', style: 'header-two', icon: H2Icon },
  { type: 'entity', label: 'Link', style: 'link', entity: 'LINK', icon: icons.LinkIcon },
  { type: 'separator' },
  { type: 'block', label: 'UL', style: 'unordered-list-item', icon: icons.ULIcon },
  { type: 'block', label: 'OL', style: 'ordered-list-item', icon: icons.OLIcon },
  { type: 'block', label: 'QT', style: 'blockquote', icon: icons.BlockQuoteIcon }
]

const requestCommentEditorCss = css`
  border: 1px solid lightgray;
  border-radius: 6px;
`

export const EditorContainer = styled.div`
  border: 1px solid lightgray;
  min-height: 20em;
  cursor: text;
  margin-bottom: 2em;
  div.paragraph:last-child {
    height: 30vh;
  }
  ${props => props.requestCommentEditor && requestCommentEditorCss};

  span {
    ${TruncateWithEllipsisCss};
  }
  h2 {
    ${HeaderTwoCss};
    :first-child {
      margin-top: 0px;
    }
  }
  li {
    ${ListItemCss};
  }
`

class SharedEditor extends React.Component {
  handlePastedText = (text, html) => {
    const { editorState, handleChange } = this.props
    // eslint-disable-next-line
    html = html.replace(/style="[a-zA-Z0-9:;&\."\s\(\)\-\,]*|\\/gi, '')
    const blockMap = stateFromHTML(html).blockMap
    const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap)
    if (!html) return
    handleChange(EditorState.push(editorState, newState, 'insert-fragment'))
    return true
  }

  render() {
    const { editorState, handleChange, readOnly, requestCommentEditor } = this.props

    return (
      <EditorContainer id="editor" requestCommentEditor={requestCommentEditor}>
        <MegadraftEditor
          editorKey="foobaz"
          readOnly={readOnly}
          plugins={[...DEFAULT_PLUGINS, megadraftYoutubePlugin, megadraftCodeBlockPlugin]}
          editorState={editorState}
          handlePastedText={this.handlePastedText}
          onChange={handleChange}
          actions={actions}
        />
      </EditorContainer>
    )
  }
}

export default SharedEditor
