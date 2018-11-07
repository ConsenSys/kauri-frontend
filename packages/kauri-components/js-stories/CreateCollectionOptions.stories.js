// @flow
import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import CreateCollectionOptions from '../components/CreateCollectionOptions'

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

storiesOf('CreateCollectionOptions', module).add('Add Button', () => (
  <Container>
    <CreateCollectionOptions />
  </Container>
))
