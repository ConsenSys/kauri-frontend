import * as React from 'react'
import styled from 'styled-components'
import { fontSize } from 'styled-system'

const CuratorHeaderLabel = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  ${fontSize}
`

interface IProps {
  children: Element,
  fontSize?: number,
};

export default ({ children }: IProps) => <CuratorHeaderLabel>{children}</CuratorHeaderLabel>
