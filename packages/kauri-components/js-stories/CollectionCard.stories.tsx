import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import CollectionCard from "../components/Card/CollectionCard";

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

const Container = styled.div`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const linkComponent = (
  childrenProps: React.ReactElement<any>,
  route: string
) => <Link href={route}>{childrenProps}</Link>;

storiesOf("CollectionCard", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("Default height of 310, two line title, no image", () => (
    <CollectionCard
      imageURL={null}
      date={"5 DAYS AGO"}
      name={
        "TwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleHEY"
      }
      id={"1234567890"}
      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Praesent sed cursus purus.
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit…
      `}
      username={"USERNAME GOES HERE"}
      userAvatar={null}
      userId={"HEY"}
      linkComponent={linkComponent}
      articleCount={"3"}
      collectionCount={"3"}
      cardHeight={310}
    />
  ))
  .add("Default height of 310, two line title, with image", () => (
    <CollectionCard
      cardHeight={310}
      date={"5 DAYS AGO"}
      name={"Two Line Title Two Line Title Two Line Title Two Line Title"}
      id={"1234567890"}
      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      linkComponent={linkComponent}
      userAvatar={null}
      articleCount={"5"}
      collectionCount={"3"}
    />
  ))
  .add(
    "Default height of 310, two line title, with image, is chosen collection",
    () => (
      <CollectionCard
        cardHeight={310}
        date={"5 DAYS AGO"}
        name={"Two Line Title Two Line Title Two Line Title Two Line Title"}
        id={"1234567890"}
        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
        imageURL={
          "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
        }
        linkComponent={linkComponent}
        userAvatar={null}
        articleCount={"5"}
        collectionCount={"3"}
        isChosenCollection={true}
      />
    )
  );
