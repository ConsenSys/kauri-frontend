import styled, { css } from "styled-components";

const articleHeaderCss = css`
  height: 196px;
`;

export const CreateRequestSecondaryHeader = styled.div`
  position: relative;
  display: flex;
  height: 163px;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  background-color: ${props => props.theme.primaryTextColor};
  ${props => props.bg};
  ${props => props.type === "article" && articleHeaderCss};
  @media (max-width: 500px) {
    padding: ${props => props.theme.paddingTop} 10px;
  }
`;
