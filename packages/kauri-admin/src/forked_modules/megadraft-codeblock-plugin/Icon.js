import styled from 'styled-components'
import React from 'react'

const CodeBlockIcon = styled.img`
  position: absolute;
  top: 61%;
  left: 50%;
  margin: -12px 0 0 -12px;
  height: 17px;
  width: 24px;
`

export default class extends React.Component {
  render() {
    return <CodeBlockIcon src={require('./codeblock.png')} />
  }
}
