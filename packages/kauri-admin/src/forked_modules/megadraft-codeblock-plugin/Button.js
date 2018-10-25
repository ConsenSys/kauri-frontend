import React, { Component } from 'react'
import { insertDataBlock } from 'megadraft'
import CodeBlockIcon from './Icon'

export default class BlockButton extends Component {
  onClick = e => {
    e.preventDefault()
    const data = {
      type: 'codeblock',
      code: 'Copy and paste some code'
    }
    // Calls the onChange method with the new state.
    this.props.onChange(insertDataBlock(this.props.editorState, data))
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.onClick}>
        <CodeBlockIcon />
      </button>
    )
  }
}
