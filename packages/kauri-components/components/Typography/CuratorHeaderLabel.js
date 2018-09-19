import React from 'react'
import styled from 'styled-components'
import { fontSize } from 'styled-system'

const CuratorHeaderLabel = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  ${fontSize}
`

export default ({ children, fontSize = 0 }) => <CuratorHeaderLabel fontSize={fontSize}>{children}</CuratorHeaderLabel>
