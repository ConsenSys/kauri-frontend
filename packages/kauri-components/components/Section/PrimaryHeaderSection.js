// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const withBackgroundURLCss = css`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 140px 120px inset;
  margin-top: -76px;
  padding-top: 106px;
  padding-bottom: 50px;
  background: ${props => props.backgroundURL && `url(${props.backgroundURL}) center center`};
`

const PrimaryHeaderSectionStack = styled(Stack)`
  ${bgColor};
  height: 100%;
  padding: 0px ${props => props.theme.padding};
  ${props => props.backgroundURL && withBackgroundURLCss};
`

const PrimaryHeaderSection = ({ bg = 'bgPrimary', backgroundURL, children }) =>
  <PrimaryHeaderSectionStack backgroundURL={backgroundURL} bg={bg} alignItems={['', 'center']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </PrimaryHeaderSectionStack>

export default PrimaryHeaderSection
