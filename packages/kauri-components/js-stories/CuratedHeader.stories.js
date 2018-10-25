
import React from 'react';
import { storiesOf } from '@storybook/react';
import CuratedHeader from '../components/CuratedHeader/CuratedHeader';

storiesOf('CuratedHeader', module)
  .add('metamask', () => (
    <CuratedHeader header={{ id: 'metamask', type: 'metamask', name: 'metamask', type: 'TOPIC' }} name={'metamask'} />
  ))
