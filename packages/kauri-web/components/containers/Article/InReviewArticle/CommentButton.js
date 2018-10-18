import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { RichUtils } from 'draft-js'
import { Button } from 'antd'
import AddCommentForm from '../../AddCommentForm'
import { toggleModalAction } from '../../../../lib/Module'

const CommentingButton = styled(Button)`
  transition: none !important;
  :hover {
    border: none !important;
    box-shadow: 0 0 0 2px ${props => props.theme.hoverTextColor} !important;
  }
  * {
    transition: none !important;
  }
`

class CommentButton extends React.Component {
  createComment = () => {
    let selection = this.props.getEditorState().getSelection()
    const anchor_key = selection.getAnchorKey()
    const focus_key = selection.getFocusKey()
    const highlight_to = selection.getFocusOffset()
    const highlight_from = selection.getAnchorOffset()
    const currentPathLength = window.location.pathname.split('/').length
    const article_id = window.location.pathname.split('/')[currentPathLength - 1]

    this.props.toggleModalAction({
      modalTitle: 'Add new comment!',
      modalChildren: (
        <AddCommentForm
          article_id={article_id}
          highlight_from={highlight_from}
          highlight_href={highlight_to}
          anchor_key={anchor_key}
          focus_key={focus_key}
        />
      ),
      onOk: () => {},
      onCancel: this.props.toggleModalAction.bind(this, {}),
      footer: null,
    })
  }

  render () {
    return (
      <div className={this.props.className} onMouseDown={e => e.preventDefault()}>
        <CommentingButton onClick={this.createComment}>Comment</CommentingButton>
      </div>
    )
  }
}

export default connect(() => ({}), { toggleModalAction })(CommentButton)
