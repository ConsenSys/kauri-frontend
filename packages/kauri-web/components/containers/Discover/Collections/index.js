import React from "react";
import List from "./List";
import Header from "./Header";
import styled from "styled-components";

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CollectionDiscover = props => (
  <ContentContainer>
    <Header />
    <List />
  </ContentContainer>
);

export default CollectionDiscover;
