import React from 'react'
import styled from 'styled-components'
import { compose, lifecycle, branch, renderComponent } from 'recompose'

const ErrorMessageHeader = styled.h4`
  color: red;
`

const ErrorMessage = () => <ErrorMessageHeader>Something went wrong.</ErrorMessageHeader>

const withErrorCatch = (ErrorComponent = ErrorMessage) =>
  compose(
    lifecycle({
      componentDidCatch (error, errorInfo) {
        this.setState({ error, errorInfo })
      },
    }),
    branch(props => props.error, renderComponent(ErrorComponent))
  )

export default withErrorCatch
