/* tslint:disable */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { TagInput, TagSelector } from '../components/Tags'
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  background: #1E2428;
`;

storiesOf('Tags', module)
  .add('TagInput', () => (
      <Container>
        <TagInput handleEnterKey={(val) => console.log(val)}
          onSelect={e => console.log(e)}
          availableTags={[{tag: 'Ethereum', count: 3000}, {tag: 'Metamask', count: 450}, {tag: 'MakerDao', count: 2500}, {tag: 'Kauri', count: 7842}]}
        />
    </Container>
  ))
  .add('TagSelector', () => (
    <Container>
      <TagSelector
        onChange={(e) => console.log('Searching for', e)}
        updateTags={() => console.log('Updated tags')}
        availableTags={[{tag: 'Ethereum', count: 3000}, {tag: 'Metamask', count: 450}, {tag: 'MakerDao', count: 2500}, {tag: 'Kauri', count: 7842}]} maxTags={5} />
  </Container>
))
