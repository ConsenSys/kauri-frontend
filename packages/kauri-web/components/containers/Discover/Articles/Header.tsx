import React from "react";
import styled from "styled-components";
import ArticleSearch from "./ArticlesSearch";

const ArticlesHeader = styled.div`
  background-color: ${props => props.theme.colors.primaryTextColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[3]}px;
  padding-bottom: ${props => props.theme.space[3]}px;
`;

const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: ${props => props.theme.fontSizes[5]}px;
  margin-top: ${props => props.theme.space[4]}px;
  margin-bottom: ${props => props.theme.space[3]}px;

  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`;

const KauriDescription = styled.div`
  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`;

const Header = () => (
  <ArticlesHeader>
    <KauriTitle>Discover Articles</KauriTitle>
    <KauriDescription>User and Community Articles</KauriDescription>
    <ArticleSearch />
  </ArticlesHeader>
);

export default Header;
