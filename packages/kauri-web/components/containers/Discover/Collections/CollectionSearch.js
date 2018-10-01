// @flow
import React from 'react'
import styled from 'styled-components'
import { searchCollections } from '../../../../queries/Collection';
import { Icon, Input, AutoComplete } from 'antd'
import { Subject } from 'rxjs/Subject'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux';
import { routeChangeAction } from '../../../../lib/Module'

const Option = AutoComplete.Option

const SearchInput = styled(Input)`
  background-color: #262c35 !important;
  .ant-select-selection {
    background-color: transparent;
  }
  * {
    color: white !important;
    background-color: transparent;
  }
  .ant-select-selection__rendered,
  .ant-select-selection,
  > * {
    background-color: #262c35 !important;
  }
  .ant-input {
    border: 1px solid #ebebeb;
    :hover {
      border: 2px solid #209b86 !important;
    }
  }
  .ant-input-affix-wrapper:hover {
    border: 2px solid #209b86 !important;
  }
`

const SearchWrapper = styled.div`
  width: 300px;
  margin-bottom: 64px;
  margin-top: 19px;
  display: grid;
  position: relative;
  > *:not(.certain-category-icon) {
    opacity: ${props => (props.collapsible ? '0' : '1')};
    transition: all 0.3s;
  }
  &: hover {
    > * {
      opacity: 1;
    }
  }
`

const IconOverlay = styled(Icon)`
  position: absolute;
  top: 12.5px;
  right: 12px;
  height: 17px;
  width: 17px;
  font-size: 17px;
`

const handleSearch$ = new Subject()

class Complete extends React.Component<any, any> {
  state = {
    dataSource: [],
  }

  componentDidMount () {
    const sub = handleSearch$
      .debounceTime(300)
      .flatMap(text =>
        this.props.client.query({
          query: searchCollections,
          variables: { filter: { nameContains: text } },
        })
      )
      .map(
        ({
          data: {
            searchCollections: { content },
          },
        }) => content
      )
      .subscribe(dataSource => {
        if (dataSource.length === 0) {
          dataSource = [{ collection_id: 'No collections found', text: 'No collections found', subject: 'No collections found' }]
        }
        this.setState({ dataSource })
      })
    this.setState({ sub })
  }

  componentWillUnmount () {
    this.state.sub.unsubscribe()
  }

  handleSearch = (text: string) => {
    handleSearch$.next(text)
  }

  onSelect = (collectionRoute: string) => {
    this.props.routeChangeAction(collectionRoute)
  }

  renderOption = (collection: CollectionDTO) =>
    collection.name !== 'No collections found' ? (
      <Option
        key={`/collection/${collection.id}`}
        value={`/collection/${collection.id}`}
      >
        {typeof collection.name === 'string' && collection.name.length && collection.name.substr(0, 50).concat('...')}
      </Option>
    ) : (
      <Option disabled key={'No collections found'} value={'No collections found'}>
        No collections found
      </Option>
    )

  render () {
    const { dataSource } = this.state
    return (
      <SearchWrapper collapsible={this.props.collapsible} className='global-search-wrapper'>
        <AutoComplete
          className='global-search'
          size='large'
          style={{ width: '100%', backgroundColor: 'transparent' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
        >
          <SearchInput
            style={{ backgroundColor: 'transparent' }}
            suffix={<Icon type='search' className='certain-category-icon' />}
          />
        </AutoComplete>
        <IconOverlay type='search' className='certain-category-icon' />
      </SearchWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(withApollo, connect(mapStateToProps, { routeChangeAction }))(Complete)