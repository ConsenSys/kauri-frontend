// @flow
import React from 'react'
import Community from './Community.bs'

type Props = {
  category: string,
  hostName: string,
  data?: { getCommunity?: ?CommunityDTO, error: boolean }
}

class CommunityConnection extends React.Component<Props> {
  render () {
    if (this.props.data && this.props.data.error) return <p>{this.props.data.error.message}</p>
    return (
      this.props.data &&
      this.props.data.getCommunity
        ? <Community website={this.props.data.getCommunity.website} category={this.props.category} hostName={this.props.hostName} />
        : null
    )
  }
}

export default CommunityConnection
