import React, { Component } from 'react'
import { MegadraftIcons, MegadraftPlugin } from 'megadraft'
import Highlight from './hljs'

const { BlockContent, BlockData, CommonBlock } = MegadraftPlugin

export default class CodeBlock extends Component {
  componentDidMount() {
    setTimeout(() => {
      const codeBlockNodes = document.querySelectorAll('textarea')
      codeBlockNodes[codeBlockNodes.length - 1].focus()
    }, 250)
  }
  handleChange = event => {
    const {
      target: { value: code }
    } = event
    this.props.container.updateData({ code })
  }

  handleTab = e => {
    let {
      keyCode,
      target: { value }
    } = e
    if (keyCode === 9) {
      var target = e.target
      var start = target.selectionStart
      var end = target.selectionEnd

      // set textarea value to: text before caret + tab + text after caret
      target.value = value.substring(0, start) + '\t' + value.substring(end)

      // put caret at right position again (add one for the tab)
      target.selectionStart = target.selectionEnd = start + 1
      // prevent the focus lose
      e.preventDefault()
      this.props.container.updateData({ code: target.value })
    }
  }

  render() {
    const blockActions = [
      {
        key: 'delete',
        icon: MegadraftIcons.DeleteIcon,
        action: this.props.container.remove
      }
    ]

    return (
      <CommonBlock className="CodeBlock-Common" actions={blockActions} {...this.props}>
        <BlockContent className="CodeBlock-Content">
          <Highlight>{this.props.data.code || 'Copy and paste code below'}</Highlight>
        </BlockContent>

        <BlockData>
          <textarea
            id="textarea"
            style={{ width: '100%' }}
            rows={8}
            onKeyDown={this.handleTab}
            onChange={this.handleChange}
            placeholder="Enter your code here"
          />
        </BlockData>
      </CommonBlock>
    )
  }
}
