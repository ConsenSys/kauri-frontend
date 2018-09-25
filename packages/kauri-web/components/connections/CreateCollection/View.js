// @flow
import React from 'react'

type Props = {
  userId: string,
  data?: { getCollection?: ?CollectionDTO }
}

class CollectionConnection extends React.Component<Props> {
  render () {
    return (
      this.props.data &&
      this.props.data.getCollection
        ? <p>Update Collection form goes here</p>
        : <p>Create Collection form goes here</p>
    )
  }
}

export default CollectionConnection
