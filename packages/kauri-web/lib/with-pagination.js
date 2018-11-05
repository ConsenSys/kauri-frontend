import React, { Component } from 'react'
import Loading from '../components/common/Loading'

const withPagination = (Paginated, key) => {
  class WithPagination extends Component {
    constructor (props) {
      super(props)
      this.state = {
        page: 0,
        showLoading: false,
      }
    }

    componentDidMount () {
      window.addEventListener('scroll', this.handleOnScroll)
      window.addEventListener('touchend', this.handleOnScroll)
    }

    componentWillUnmount () {
      window.removeEventListener('scroll', this.handleOnScroll)
      window.removeEventListener('touchend', this.handleOnScroll)
    }

    handleOnScroll = () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight + 50) >= scrollHeight
      if (scrolledToBottom && this.props.data[key].isLast !== true) {
        this.setState({ showLoading: true })
        this.props.data.fetchMore({
          variables: {
            page: (this.state.page += 1),
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            this.setState({ showLoading: false, page: (this.state.page += 1) })
            if (!fetchMoreResult) return prev
            const result = Object.assign({}, prev, {
              [key]: {
                __typename: prev[key].__typename,
                content: [...prev[key].content, ...fetchMoreResult[key].content],
                isLast: fetchMoreResult[key].isLast,
                totalElements: prev[key].totalElements
              },
            });
            return result;
          },
        })
      }
    }

    render () {
      return (
        <>
          <Paginated {...this.props} />
          {this.state.showLoading && <Loading />}
        </>
      )
    }
  }
  return WithPagination
}

export default withPagination
