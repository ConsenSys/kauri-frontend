import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from '../components/Input/Input'

const mockState = {
    value: 'test'
};

const handleChange = (value) => {
    console.log(value);
    mockState.value = value;
}

storiesOf('Input', module)
  .add('Input', () => (
      <>
        <Input
            fontWeight="normal"
            fontSize={6}
            placeHolder="Add your name"
        />
        <br />
        <Input
            onChange={(e) => handleChange(e.target.value)}
            value={mockState.value}
            fontWeight="normal"
            fontSize={6}
            placeHolder="Add your username"
        />
        <br />
        <Input
            handleChange={(e) => handleChange(e.target.value)}
            fontWeight="normal"
            fontSize={6}
            placeHolder="handleChange"
        />
    </>
  ))
