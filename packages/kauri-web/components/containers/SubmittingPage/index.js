// @flow
import React from 'react'
import styled from 'styled-components'
import Loading from '../../common/Loading';

const Container = styled.section`
  display: flex;
  height: calc(100vh - 66px);
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.primaryTextColor};
`

const SubmittingCopy = styled.h1`
  color: white;
`

export default ({ type }: { type: 'offchain' | 'onchain' }) => (
  <Container>
    <Loading />
    <SubmittingCopy>
      {(() => {
        if (type === 'offchain') {
          return 'Submitting... Please hold the line.'
        } else if (type === 'onchain') {
          return 'Please interact with MetaMask!'
        }
      })()}
    </SubmittingCopy>
  </Container>
)
