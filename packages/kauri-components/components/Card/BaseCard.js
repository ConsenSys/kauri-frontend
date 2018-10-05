// @flow
import * as React from 'react'
import styled from 'styled-components'

const BaseCard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 270px;
  width: 290px;
  border-radius: 4px;
  margin: 15px;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.11);
  transition-property: all;
  transition-duration: 300;
  :hover {
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.22);
    transform: translateY(-6px);
  }
  padding: ${props => props.theme.space[2]}
`

export default ({ children }: { children: React.Node }) =>
  <BaseCard>{children}</BaseCard>
