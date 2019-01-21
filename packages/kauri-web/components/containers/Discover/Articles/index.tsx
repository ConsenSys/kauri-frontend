import React from "react";
import List from "./List";
import Header from "./Header";
import styled from "styled-components";

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ArticleDiscover = () => (
  <ContentContainer>
    <Header category={"ARTICLE"} />
    <List />
  </ContentContainer>
);

export default ArticleDiscover;
