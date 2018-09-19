// @flow
import React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor, height } from 'styled-system'

const ActionsSectionStack = styled(Stack)`
  ${bgColor};
  ${height};
`

const ActionsSection = ({ height = '50px', bg = 'bgPrimary', children }) =>
  <ActionsSectionStack height={height} bg={bg} justifyContent={['', 'start']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </ActionsSectionStack>

export default ActionsSection
