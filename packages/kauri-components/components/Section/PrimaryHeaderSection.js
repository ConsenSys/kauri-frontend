// @flow
import * as React from 'react'
import styled, { css } from "../../lib/styled-components"
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const withBackgroundURLCss = css`
  background: ${props => props.backgroundURL && `url(${props.backgroundURL.replace('dev2', 'beta')}) center center`};
  background-size: cover;
  margin-top: -76px;
  padding-top: 106px;
  padding-bottom: 50px;
  box-shadow: inset 0px 0px 140px 120px rgba(0,0,0,0.5);
`

const PrimaryHeaderSectionStack = styled(Stack)`
  ${bgColor};
  min-height: 250px;
  padding: 0px ${props => props.theme.padding};
  ${props => props.backgroundURL && withBackgroundURLCss};
`;

type PrimaryHeaderSectionType = {
  bg?: string,
  backgroundURL?: string,
  children?: React.Node
}

const PrimaryHeaderSection = ({ bg = 'bgPrimary', backgroundURL, children }: PrimaryHeaderSectionType) =>
  <PrimaryHeaderSectionStack backgroundURL={backgroundURL} bg={bg} alignItems={['', 'center']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </PrimaryHeaderSectionStack>

export default PrimaryHeaderSection
