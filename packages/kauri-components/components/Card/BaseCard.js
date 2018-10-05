// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

const withoutImageURLPaddingCss = css`padding: ${props => props.theme.space[2]}px;`

const BaseCard = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.cardHeight}px;
  width: 290px;
  max-width: 290px;
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
  ${props => typeof props.imageURL !== 'string' && withoutImageURLPaddingCss};
`

export default ({ cardHeight = 290, imageURL, children }: { children: React.Node, cardHeight: number, imageURL?: string }) =>
  <BaseCard imageURL={imageURL} cardHeight={cardHeight}>{children}</BaseCard>
