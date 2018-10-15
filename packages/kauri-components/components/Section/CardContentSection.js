// @flow
import React from 'react'
import styled from 'styled-components'

const CardContentSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: 1280px;
  > * {
    margin: ${props => props.theme.space[2]}px;
  } 
`

export default CardContentSection
