import styled from "styled-components";

export const CreateRequestContainer = styled.div`
  width: 74%;
  @media (max-width: 500px) {
    width: 100%;
    padding: 10px;
  }
  ${props => props.type === "in review article" && inReviewArticleContainerCss};
  ${props => props.type === "approved article" && approvedArticleContainerCss};
`;
