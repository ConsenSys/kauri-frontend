import styled, { css } from "styled-components";

const outlineHeaderCss = css`
  position: sticky;
  overflow-x: hidden;
  overflow-y: scroll;
  overflow-y: -moz-hidden-unscrollable;
  overflow-x: -moz-hidden-unscrollable;
  top: 30px;
  max-height: 90vh;
  > :nth-child(3) {
    overflow: auto;
    max-height: 100vh;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const CreateRequestDetails = styled<{ type: string }, "section">(
  "section"
)`
  display: flex;
  width: 26%;
  padding-left: 30px;
  flex-direction: column;
  align-items: center;
  > :last-child {
    margin-top: 15px;
  }
  padding-left: ${props => props.type === "createRequest" && "110px"};
  padding-top: ${props => (props.type === "createRequest" ? "4em" : "2.5em")};
  ${props => props.type === "outline" && outlineHeaderCss};
`;
