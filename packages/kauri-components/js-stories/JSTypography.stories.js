// @flow
import React from 'react'
import styled from 'styled-components';
import { storiesOf } from '@storybook/react'
import CuratorHeaderLabel from '../components/Typography/CuratorHeaderLabel'
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label,
  CTA,
  ListBulletPoint,
  ListDashPoint,
  NavigationText,
  PageDescription,
  Title1,
  Title2,
  BodyCard,
  BodyArticle,
} from '../components/Typography'

const Section = styled.section`
  display: flex;
  flex-direction: column;
`

storiesOf('Typography', module)
  .add('Curator', () => (
    <CuratorHeaderLabel>
      Curator
    </CuratorHeaderLabel>
  ))
  .add('Headings', () => (
    <Section>
      <Title1>Title1</Title1>

      <Title2>Title2</Title2>

      <H1>
      H1
      </H1>

      <H2>
      H2
      </H2>

      <H3>
      H3
      </H3>

      <H4>
      H4
      </H4>

      <H5>
      H5
      </H5>

      <H6>
      H6
      </H6>

    </Section>
  ))
  .add('Content', () => (
    <Section>
      <Label>Label</Label>
      <CTA>CTA</CTA>

      <NavigationText>
        Navigation Text
      </NavigationText>

      <PageDescription>
        Page Description
      </PageDescription>
      <BodyCard>Body Card</BodyCard>
      <BodyArticle>Body Article</BodyArticle>

      <ul>
        <ListBulletPoint>circle</ListBulletPoint>
      </ul>

      <ul>
        <ListDashPoint> dash </ListDashPoint>
      </ul>
    </Section>
  ))
