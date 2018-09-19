// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import TertiaryButton from '../components/Button/TertiaryButton'
import PrimaryButton from '../components/Button/PrimaryButton'
import SecondaryButton from '../components/Button/SecondaryButton'
import AddTagButton from '../components/Button/AddTagButton'
import AddMemberButton from '../components/Button/AddMemberButton'
import UploadLogoButton from '../components/Button/UploadLogoButton'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

storiesOf('Button', module)
  .add('PrimaryButton', () => (
    <PrimaryButton handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('PrimaryButton with icon', () => (
    <PrimaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('PrimaryButton Disabled', () => (
    <PrimaryButton disabled handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('SecondaryButton', () => (
    <SecondaryButton handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
  .add('SecondaryButton with icon', () => (
    <SecondaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
  .add('SecondaryButton Disabled', () => (
    <SecondaryButton disabled icon={<UploadIcon />}handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
  .add('TertiaryButton', () => (
    <TertiaryButton handleClick={() => alert('clicked')} icon={<UploadIcon />}>Background Image</TertiaryButton>
  ))
  .add('TertiaryButton Disabled', () => (
    <TertiaryButton disabled handleClick={() => alert('clicked')} icon={<UploadIcon />}>Background Image</TertiaryButton>
  ))
  .add('AddTagButton', () => (
    <AddTagButton handleClick={() => alert('clicked')} />
  ))
  .add('AddMemberButton', () => (
    <AddMemberButton handleClick={() => alert('clicked')} />
  ))
  .add('UploadLogoButton', () => (
    <UploadLogoButton handleClick={() => alert('clicked')} />
  ))
