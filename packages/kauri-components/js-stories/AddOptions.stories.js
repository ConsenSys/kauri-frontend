// @flow
import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import AddOptions from '../components/AddOptions'
import theme from '../lib/theme-config'

const TooltipContainer = styled.div`
  display: flex;
  width: 250px;
  padding: ${theme.space[2]}px;
  margin-top: ${theme.space[2]}px;
  flex-direction: column;
  position: relative;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[2]}px;
  }
  > * {
    cursor: pointer;
  }
`

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  top: -3%;
  width: 15px;
  height: 15px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
`

const Label = styled.span`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors['primary']};
`

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors['divider']};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
`

const Content = () => (
  <TooltipContainer>
    <TooltipArrow />
    <Label>Add Article To Section</Label>
    <Divider />
    <Label>Add New Section</Label>
    <Divider />
    <Label>Remove Section</Label>
  </TooltipContainer>
)

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

storiesOf('AddOptions', module).add('Create Collection Options', () => (
  <Container>
    <AddOptions>
      <Content />
    </AddOptions>
  </Container>
))
