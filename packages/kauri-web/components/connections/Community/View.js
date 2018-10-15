// @flow
import React from 'react'
import Community from './Community.bs'; // flowlint-line untyped-import:off

type Props = {
  category: string,
  hostName: string,
  data?: { getCommunity?: ?CommunityDTO, error?: { message: string} }
}

class CommunityConnection extends React.Component<Props> {
  render () {
    if (this.props.data && this.props.data.error) return <p>{this.props.data.error.message}</p>
    return (
      this.props.data &&
      this.props.data.getCommunity
        ? <Community name={this.props.data.getCommunity.name} website={this.props.data.getCommunity.website} category={this.props.category} hostName={this.props.hostName} />
        : null
    )
  }
}

export default CommunityConnection
