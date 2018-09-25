// @flow
import React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor, height } from 'styled-system'

const ActionsSectionStack = styled(Stack)`
  ${bgColor};
  ${height};
  padding: 0px ${props => props.theme.padding};
`

const ActionsSection = ({ height = '50px', bg = 'bgPrimary', backgroundURL, children }) =>
  <ActionsSectionStack height={height} bg={backgroundURL ? 'transparent' : bg} justifyContent={['', 'start']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </ActionsSectionStack>

export default ActionsSection
