// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import nextRoutes from 'next-routes'

import type { TrackAnalyticsPayload } from './Module'

const Router = nextRoutes().Router

type LinkProps = {
  as?: ?string,
  href?: ?string,
  children: any,
  trackAnalyticsAction: TrackAnalyticsPayload => void,
}

class Link extends React.Component<LinkProps> {
  render () {
    // console.log(this.props.children)
    return React.cloneElement(this.props.children, {
      onClick: e => {
        e.preventDefault()
        e.stopPropagation()
        const url = this.props.as || this.props.href || this.props.children.props.href
        // TODO: REACTIVATE ANALYTICS TRACKING SOON DUE TO NEW ROUTING
        this.props.trackAnalyticsAction({ url })
        Router.pushRoute(url)
      },
    })
  }
}

export default Link
export { Link }
