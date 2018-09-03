import React from 'react'
import { storiesOf } from '@storybook/react'
import CuratedHeader from '../components/CuratedHeader'

storiesOf('CuratedHeader', module).add('with text', () => (
  <CuratedHeader header={{ id: 'metamask', type: 'TOPIC' }} name="MetaMask" />
))
