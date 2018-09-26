// @flow
import React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const ContentSectionStack = styled(Stack)`
  ${bgColor};
  min-height: calc(100vh - 220px);
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const ContentSection = ({ bg = 'tertiaryBackgroundColor', alignItems = ['', 'start'], justifyContent = ['', 'start'], children }) =>
  <ContentSectionStack bg={bg} alignItems={alignItems} justifyContent={justifyContent} gridAutoFlow={['', 'row']}>
    {children}
  </ContentSectionStack>

export default ContentSection
