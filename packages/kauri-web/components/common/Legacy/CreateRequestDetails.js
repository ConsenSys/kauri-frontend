import styled from "styled-components";

export const CreateRequestDetails = styled.section`
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
