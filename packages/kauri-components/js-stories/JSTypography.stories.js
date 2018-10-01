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
  Caption,
  Username,
  CTA,
  StandardContent,
} from '../components/Typography'

const HeadingsSection = styled.section`
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
    <HeadingsSection>
      All Headings
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

      <Username>
      Username
      </Username>

      <CTA>
      CTA
      </CTA>

      <StandardContent>
      StandardContent
      </StandardContent>

      <Caption>
      Caption
      </Caption>

      <Label>
      Label
      </Label>

    </HeadingsSection>
  ))
