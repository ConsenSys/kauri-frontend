import React from 'react'
import { storiesOf } from '@storybook/react'
import { TagSelector } from '../components/Tags'
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
`;

storiesOf('Tags', module)
  .add('TagSelector', () => (
      <Container>
        <TagSelector
          tags={[{name: 'Ethereum', count: 3000, id: '0'}, {name: 'Metamask', count: 450, id: '1'}, {name: 'MakerDao', count: 2500, id: '2'}, {name: 'Kauri', count: 7842, id: '3'}]}
        />
    </Container>
  ))
