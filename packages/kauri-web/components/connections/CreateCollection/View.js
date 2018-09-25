// @flow
import React from 'react'
import CreateCollectionForm from '../../containers/CreateCollectionForm'

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
        : <CreateCollectionForm />
    )
  }
}

export default CollectionConnection
