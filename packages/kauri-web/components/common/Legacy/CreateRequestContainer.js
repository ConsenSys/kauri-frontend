import styled, { css } from "styled-components";

const inReviewArticleContainerCss = css`
  display: flex;
  padding-top: 2.5em;
  flex-direction: column;
`;

const approvedArticleContainerCss = css`
  padding-top: 2.5em;
`;

export const CreateRequestContainer = styled.div`
  width: 74%;
  @media (max-width: 500px) {
    width: 100%;
    padding: 10px;
  }
  ${props => props.type === "in review article" && inReviewArticleContainerCss};
  ${props => props.type === "approved article" && approvedArticleContainerCss};
`;
