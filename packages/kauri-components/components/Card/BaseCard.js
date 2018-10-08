// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

const withoutImageURLPaddingCss = css`padding: ${props => props.theme.space[2]}px;`

const BaseCard = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.cardHeight}px;
  width: ${props => props.cardWidth}px;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.11);
  position: relative;
  transition-property: all;
  transition-duration: 300;
  :hover {
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.22);
    transform: translateY(-6px);
  }
  ${props => typeof props.imageURL !== 'string' && withoutImageURLPaddingCss};
`

type Props = {
  children: React.Node,
  cardWidth: number,
  cardHeight: number,
  imageURL?: string
}

export default ({ cardWidth, cardHeight, imageURL, children }: Props) =>
  <BaseCard cardWidth={cardWidth} imageURL={imageURL} cardHeight={cardHeight}>{children}</BaseCard>
