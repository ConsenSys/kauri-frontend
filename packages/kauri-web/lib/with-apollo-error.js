import React from 'react'
import styled from 'styled-components'
import { branch, renderComponent } from 'recompose'

const Message = styled.h4`
  display: block;
  text-align: center;
  width: 100%;
  color: red;
`

const ErrorMessage = ({ data: { error: { message } } }) =>
  process.env.NODE_ENV === 'production'
    ? <Message>Something went wrong.</Message>
    : <Message>{message}</Message>

export default (component = ErrorMessage, propName = 'data') =>
  branch(props => props[propName] && props[propName].error, renderComponent(component))
