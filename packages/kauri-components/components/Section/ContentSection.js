// @flow
import * as React from 'react'
import styled from "../../lib/styled-components"
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const ContentSectionStack = styled(Stack)`
  ${bgColor};
  min-height: calc(100vh - 220px);
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`;

type ContentSectionType = {
  bg: string,
  alignItems: [string, string],
  justifyContent: [string, string],
  children: React.Node,
}

const ContentSection = ({ bg = 'tertiaryBackgroundColor', alignItems = ['', 'start'], justifyContent = ['', 'start'], children }: ContentSectionType) =>
  <ContentSectionStack bg={bg} alignItems={alignItems} justifyContent={justifyContent} gridAutoFlow={['', 'row']}>
    {children}
  </ContentSectionStack>

export default ContentSection
