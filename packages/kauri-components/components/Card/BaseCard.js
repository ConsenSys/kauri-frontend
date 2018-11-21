// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

const withoutImageURLPaddingCss = css`
  padding: ${props => props.theme.space[2]}px;
`
const chosenArticleCss = css`
  border: 2px solid ${props => props.theme.colors['primary']};
`
const hoverBoxShadowCss = css`
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.22);
  transform: translateY(-6px);
`

const BaseCard = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.cardHeight}px;
  width: ${props => props.cardWidth}px;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.11);
  position: relative;
  transition-property: all;
  transition-duration: 300ms;
  :hover {
    ${props => !props.toggledOn && hoverBoxShadowCss};
  }
  ${props => typeof props.imageURL !== 'string' && withoutImageURLPaddingCss};
  ${props => Boolean(props.isChosenArticle) && chosenArticleCss};
`

type Props = {
  children: React.Node,
  cardWidth: number,
  cardHeight: number,
  imageURL?: string,
  isChosenArticle?: boolean,
  handleMouseEnter?: () => void,
  handleMouseLeave?: () => void,
  hoverAction?: ({ id: string, version: string }) => void,
  toggledOn?: boolean,
}

export default ({
  cardWidth,
  cardHeight,
  imageURL,
  handleMouseEnter,
  handleMouseLeave,
  isChosenArticle,
  toggledOn,
  hoverAction,
  children,
}: Props) => (
  <BaseCard
    onMouseEnter={hoverAction && handleMouseEnter}
    onMouseLeave={hoverAction && handleMouseLeave}
    cardWidth={cardWidth}
    imageURL={imageURL}
    cardHeight={cardHeight}
    isChosenArticle={isChosenArticle}
    toggledOn={toggledOn}
  >
    {children}
  </BaseCard>
)