import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import ArticleContributors from "../components/ArticleContributors";
import { Article_contributors } from "../../kauri-web/queries/__generated__/Article";

const Container = styled.section`
  display: flex;
  > :first-child {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    color: ${props => props.theme.colors.hoverTextColor} !important;
    > * {
      color: ${props => props.theme.colors.hoverTextColor} !important;
      > * {
        color: ${props => props.theme.colors.hoverTextColor} !important;
        > * {
          color: ${props => props.theme.colors.hoverTextColor} !important;
        }
      }
    }
  }
`;

const linkComponent = (
  childrenProps: React.ReactElement<any>,
  route: string
) => <Link href={route}>{childrenProps}</Link>;

const contributor: Article_contributors = {
  __typename: "PublicUserDTO",
  avatar:
    "https://images.unsplash.com/photo-1548606056-2093f8c13714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  id: "1234567890",
  name: "Kiss kiss",
  username: "kiss kiss",
};

storiesOf("ArticleContributors", module)
  .add("One contributor", () => (
    <Container>
      <ArticleContributors
        linkComponent={linkComponent}
        contributors={[contributor]}
      />
    </Container>
  ))
  .add("More than one contributor", () => (
    <Container>
      <ArticleContributors
        linkComponent={linkComponent}
        contributors={[contributor, contributor]}
      />
    </Container>
  ));
