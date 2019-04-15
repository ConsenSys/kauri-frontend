import React, { Component } from "react";
import styled, { css } from "../../lib/styled-components";

const DEFAULT_CARD_WIDTH = 305;

const paddingCSS = css`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`;

const MasonryContainer = styled<{ withPadding: boolean }, "div">("div")`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(
    auto-fill,
    minmax(290px, ${DEFAULT_CARD_WIDTH}px)
  );
  grid-gap: ${props => props.theme.space[2]}px
    ${props => props.theme.space[3]}px;
  ${props => props.withPadding && paddingCSS};
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
