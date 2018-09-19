// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import nextRoutes from 'next-routes'
import slugify from 'slugify';

import type { TrackAnalyticsPayload } from './Module'

const Router = nextRoutes().Router

type LinkProps = {
  as?: ?string,
  href?: ?string,
  useAnchorTag?: boolean,
  children: any,
  trackAnalyticsAction: TrackAnalyticsPayload => void,
}

const A = styled.a`
  text-decoration: none;
  color: inherit;
  width: 100%;
  :hover {
    color: inherit;
  }
`

class Link extends React.Component<LinkProps> {
  handleClick = (e, url) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: Uncomment again later
    // this.props.trackAnalyticsAction({ url })
    Router.pushRoute(url)
  }

  render () {
    let url = this.props.as || this.props.href || this.props.children.props.href
    const slug = this.props.toSlug ? slugify(this.props.toSlug, { lower: true }) : null;
    if (slug) url += `/${slug}`;
    if (this.props.useAnchorTag) {
      return (
        <A href={url} onClick={(e) => this.handleClick(e, url)}>
          {this.props.children}
        </A>
      )
    }
    return React.cloneElement(this.props.children, {
      onClick: (e) => this.handleClick(e, url),
    })
  }
}

export default Link
export { Link }
