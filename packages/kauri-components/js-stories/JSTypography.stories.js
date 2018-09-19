// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import CuratorHeaderLabel from '../components/Typography/CuratorHeaderLabel'

storiesOf('Typography', module)
  .add('Curator', () => (
    <CuratorHeaderLabel>
      Curator
    </CuratorHeaderLabel>
  ))
