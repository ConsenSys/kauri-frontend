import React from "react";
import { storiesOf } from "@storybook/react";
import SearchCategory from "../components/SearchResults/SearchCategory";
import styled from "../lib/styled-components";
import ResourceRowWithImage from "../components/SearchResults/ResourceRowWithImage";

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

storiesOf("SearchResults", module)
  .add("SearchCategory - active", () => (
    <Container>
      <SearchCategory
        onClick={() => alert("clicked")}
        active={true}
        category={"Articles"}
        amount={4}
      />
    </Container>
  ))
  .add("SearchCategory - inactive", () => (
    <Container>
      <SearchCategory
        onClick={() => alert("clicked")}
        active={false}
        category={"Collections"}
        amount={4}
      />
    </Container>
  ))
  .add("ResourceRow with image", () => (
    <Container>
      <ResourceRowWithImage
        resourceType={"USER"}
        date={"2019-01-14T09:49:25.350Z"}
        title={"One Line Title One Line Title One Line Title One Line Title"}
        id={"1234567890"}
        version={1}
        content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Praesent sed cursus purus.
            In facilisis nulla sed efficitur posuere.
            Maecenas vestibulum elementum interdum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec non eleifend ex, eu interdum justo.
            Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
            Nunc nec dui id magna ullamcorper semper.
            Morbi mollis mauris quis orci tristique posuere ac non magna.
            Nam lectus ipsum, molestie sit
            Morbi mollis mauris quis orci tristique posuere ac non magna.
            Nam lectus ipsum, molestie sit…
            `}
        username={"USERNAME GOES HERE"}
        userId={"HEY"}
        userAvatar={null}
        imageURL={
          "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
        }
        linkComponent={linkComponent}
        tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      />
    </Container>
  ))
  .add("ResourceRow without image", () => (
    <Container>
      <ResourceRowWithImage
        date={"2019-01-14T09:49:25.350Z"}
        title={"One Line Title One Line Title One Line Title One Line Title"}
        id={"1234567890"}
        version={1}
        content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Praesent sed cursus purus.
          In facilisis nulla sed efficitur posuere.
          Maecenas vestibulum elementum interdum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec non eleifend ex, eu interdum justo.
          Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
          Nunc nec dui id magna ullamcorper semper.
          Morbi mollis mauris quis orci tristique posuere ac non magna.
          Nam lectus ipsum, molestie sit
          Morbi mollis mauris quis orci tristique posuere ac non magna.
          Nam lectus ipsum, molestie sit…
          `}
        username={"USERNAME GOES HERE"}
        userId={"HEY"}
        userAvatar={null}
        linkComponent={linkComponent}
        tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
        resourceType={"USER"}
        imageURL={null}
      />
    </Container>
  ));
