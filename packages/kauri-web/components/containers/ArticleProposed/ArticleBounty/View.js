// @flow
import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

const web3 = new Web3()

type Props = {
  request_id: string,
  data?: { getRequest?: RequestDTO, loading: boolean },
}

const BountyHighlight = styled.strong`
  color: #fff;
`

export default ({ data: { getRequest, loading } }: Props) =>
  !loading && (
    <BountyHighlight>{`${web3.fromWei((getRequest && getRequest.bounty) || 0, 'ether')} ETH`}</BountyHighlight>
  )
