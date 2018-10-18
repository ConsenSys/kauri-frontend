// @flow
import React from 'react'
import styled from 'styled-components'
import { ContentState, convertToRaw } from 'draft-js'
import SharedEditor from '../../../common/SharedEditor'
import redraft from 'redraft'
import { blocks, inline, entities, options } from '../../Requests/DescriptionRow'

type Props = {
  editorState: any,
  onEditorChange: any => void,
  loaded: () => void,
}

type State = {
  editorState: any,
}

const BlockWrapper = (props: any) => {
  const contentBlocks = [props.block]
  const contentState = ContentState.createFromBlockArray(contentBlocks)
  const raw = convertToRaw(contentState)

  return redraft(raw, { inline: inline, blocks: blocks(true, false, false, true), entities }, options)
}

const Container = styled.section`
  min-height: 60vh;
`

export default class InReviewArticleCommentingEditor extends React.Component<Props, State> {
  componentDidMount () {
    this.props.loaded()
  }

  myBlockRenderer = () => ({
    component: BlockWrapper,
  })

  render () {
    return (
      <Container>
        <SharedEditor
          editorKey='foobar'
          editorState={this.props.editorState}
          handleChange={this.props.onEditorChange}
        />
      </Container>
    )
  }
}
