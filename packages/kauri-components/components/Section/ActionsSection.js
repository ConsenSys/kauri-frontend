// @flow
import * as React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor, height } from 'styled-system'

const ActionsSectionStack = styled(Stack)`
  ${bgColor};
  ${height};
  padding: 0px ${props => props.theme.padding};
`;

type ActionSectionType = {
  height?: string,
  bg?: string,
  children?: React.Node,
}

const ActionsSection = ({ height = '50px', bg = 'bgPrimary', children }: ActionSectionType) =>
  <ActionsSectionStack height={height} bg={bg} justifyContent={['', 'start']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </ActionsSectionStack>

export default ActionsSection
