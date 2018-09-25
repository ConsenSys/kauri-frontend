// @flow
import React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const ContentSectionStack = styled(Stack)`
  ${bgColor};
  min-height: calc(100vh - 220px);
  > * {
    padding: 0px ${props => props.theme.padding}
  }
`

const ContentSection = ({ bg = 'tertiaryBackgroundColor', children }) =>
  <ContentSectionStack bg={bg} alignItems={['', 'start']} gridAutoFlow={['', 'column']}>
    {children}
  </ContentSectionStack>

export default ContentSection
