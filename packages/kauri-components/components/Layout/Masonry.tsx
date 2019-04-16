import React, { Component } from "react";
import styled, { css } from "../../lib/styled-components";
import theme from "../../lib/theme-config";

const DEFAULT_CARD_WIDTH = theme.DEFAULT_CARD_WIDTH;

const paddingCSS = css`
  padding-top: ${props => props.theme.paddingTop};
  ${props => props.theme.padContent};
`;

const MasonryContainer = styled<{ withPadding: boolean }, "div">("div")`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${DEFAULT_CARD_WIDTH}px, ${DEFAULT_CARD_WIDTH}px)
  );
  grid-gap: ${props => props.theme.space[2]}px
    ${props => props.theme.space[3]}px;
  ${props => props.withPadding && paddingCSS};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    justify-content: center;
  }
`;

interface IProps {
  withPadding?: boolean;
}

class Masonry extends Component<IProps> {
  public render() {
    const { children, withPadding = true } = this.props;

    return (
      <MasonryContainer withPadding={withPadding}>{children}</MasonryContainer>
    );
  }
}

export default Masonry;
