// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Modal from '../components/Modal'

const mockStore = configureStore();

const ModalChildren = () => <marquee>Because Nelson!</marquee>

storiesOf('Modal', module)
  .addDecorator(getStory => <Provider store={mockStore({
    modal: {
      isModalOpen: true,
      children: <ModalChildren />,
    },
  })}>{getStory()}</Provider>)
  .add('opened', () => (
    <Modal />
  ))
