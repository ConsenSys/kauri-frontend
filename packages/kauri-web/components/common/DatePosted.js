// @flow
import React from 'react'
import styled, { css } from 'styled-components'

const recentRequestCss = css`
  margin-top: 20px;
`

const DatePosted = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
  > :last-child {
    margin-left: 5px;
    font-weight: bold;
    text-transform: uppercase !important;
  }
  ${props => props.recentRequest && recentRequestCss};
  cursor: ${props => props.type === 'written by' && 'pointer'};
`

export default DatePosted
export { DatePosted }
