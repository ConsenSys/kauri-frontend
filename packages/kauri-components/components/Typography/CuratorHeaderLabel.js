//@flow
import * as React from 'react'
import styled from 'styled-components'
import { fontSize } from 'styled-system'

const CuratorHeaderLabel = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  ${fontSize}
`

type Props = {
  children: React.Node,
  fontSize?: number,
};

export default ({ children, fontSize = 0 }: Props) => <CuratorHeaderLabel fontSize={fontSize}>{children}</CuratorHeaderLabel>
