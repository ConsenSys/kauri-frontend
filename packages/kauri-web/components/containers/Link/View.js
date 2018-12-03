// @flow
import * as React from "react";
import styled from "styled-components";
import slugify from "slugify";

import type { TrackAnalyticsPayload } from "./Module";

type LinkProps = {
  href: string,
  as?: ?string,
  useAnchorTag?: boolean,
  children: any,
  trackAnalyticsAction: TrackAnalyticsPayload => void,
  fullWidth?: boolean,
  toSlug?: string,
};

const A = styled.a`
  text-decoration: none;
  color: inherit;
  ${props => props.fullWidth && "width: 100%;"};
  :hover {
    color: ${props => props.theme.colors.hoverTextColor} !important;
    > * {
      color: ${props => props.theme.colors.hoverTextColor} !important;
      > * {
        color: ${props => props.theme.colors.hoverTextColor} !important;
        > * {
          color: ${props => props.theme.colors.hoverTextColor} !important;
        }
      }
    }
  }
`;

class Link extends React.Component<LinkProps> {
  handleClick = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Uncomment again later
    // this.props.trackAnalyticsAction({ url })
    url.indexOf("https://") !== -1
      ? window.open(url, "_blank")
      : this.props.routeChangeAction(url);
  };

  render() {
    let url =
      this.props.as || this.props.href || this.props.children.props.href;
    const slug = this.props.toSlug
      ? slugify(this.props.toSlug, { lower: true })
      : null;
    if (slug) url += `/${slug}`;
    const { fullWidth } = this.props;

    if (this.props.useAnchorTag) {
      return (
        <A
          href={url}
          onClick={e => this.handleClick(e, url)}
          fullWidth={fullWidth}
        >
          {this.props.children}
        </A>
      );
    }
    return React.cloneElement(this.props.children, {
      onClick: e => this.handleClick(e, url),
    });
  }
}

export default Link;
export { Link };
