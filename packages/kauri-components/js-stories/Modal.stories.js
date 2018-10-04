// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import Modal from '../components/Modal'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore();

const ModalChildren = () => <marquee>Because Nelson!</marquee>

storiesOf('Modal', module)
  .addDecorator(getStory => <Provider store={mockStore({
    app: {
      modal: {
        isModalOpen: true,
        children: <ModalChildren />,
      },
    },
  })}>{getStory()}</Provider>)
  .add('opened', () => (
    <Modal />
  ))
