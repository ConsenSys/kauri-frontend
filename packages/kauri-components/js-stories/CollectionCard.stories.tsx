import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import CollectionCard from "../components/Card/CollectionCard";

const alertAction = (message: string) => () => alert(message);

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

storiesOf("CollectionCard", module)
  .add("Default height of 290, two line title, no image", () => (
    <CollectionCard
      date={"5 DAYS AGO"}
      name={
        "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title HEY"
      }
      id={"1234567890"}
      version={"1"}
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
      userId={"HEY"}
      linkComponent={linkComponent}
    />
  ))
  .add("Card height of 420, three line title, no image", () => (
    <CollectionCard
      date={"5 DAYS AGO"}
      name={
        "Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title"
      }
      id={"1234567890"}
      version={"1"}
      description={`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      cardHeight={420}
      linkComponent={linkComponent}
    />
  ))
  .add("Default height of 290, two line title, with image", () => (
    <CollectionCard
      cardHeight={290}
      date={"5 DAYS AGO"}
      name={"Two Line Title Two Line Title Two Line Title Two Line Title"}
      id={"1234567890"}
      version={"1"}
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
    />
  ))
  .add("Card height of 420, two line title, with image", () => (
    <CollectionCard
      date={"5 DAYS AGO"}
      name={"Two Line Title Two Line Title Two Line Title Two Line Title"}
      id={"1234567890"}
      version={"1"}
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
      cardHeight={420}
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      linkComponent={linkComponent}
    />
  ))
  .add(
    "Card height of 420, two line title, with image, with hoverAction prop",
    () => (
      <CollectionCard
        date={"5 DAYS AGO"}
        name={"Two Line Title Two Line Title Two Line Title Two Line Title"}
        id={"1234567890"}
        version={"1"}
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
        cardHeight={420}
        imageURL={
          "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
        }
        hoverAction={alertAction("hover")}
        viewAction={alertAction("view")}
        linkComponent={linkComponent}
      />
    )
  )
  .add(
    "Card height of 420, two line title, with image, is chosen Collection",
    () => (
      <CollectionCard
        date={"5 DAYS AGO"}
        name={"Two Line Title Two Line Title Two Line Title Two Line Title"}
        id={"1234567890"}
        version={"1"}
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
        cardHeight={420}
        imageURL={
          "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
        }
        hoverAction={alertAction("hover")}
        viewAction={alertAction("view")}
        linkComponent={linkComponent}
        isChosenCollection={true}
      />
    )
  )
  .add("Card width of 610, two line title, no image", () => (
    <CollectionCard
      date={"5 DAYS AGO"}
      name={
        "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title"
      }
      id={"1234567890"}
      version={"1"}
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      Nam lectus ipsum, molestie sit
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      `}
      username={"USERNAME GOES HERE"}
      userId={"HEY"}
      cardWidth={610}
      linkComponent={linkComponent}
    />
  ))
  .add("Card width of 610, two line title, with image", () => (
    <CollectionCard
      date={"5 DAYS AGO"}
      name={
        "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title"
      }
      id={"1234567890"}
      version={"1"}
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      Nam lectus ipsum, molestie sit
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      `}
      username={"USERNAME GOES HERE"}
      userId={"HEY"}
      cardWidth={610}
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      linkComponent={linkComponent}
    />
  ));
