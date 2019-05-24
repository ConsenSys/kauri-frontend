import React from "react";
import { storiesOf } from "@storybook/react";
import moment from "moment";
import ArticleCard from "../components/Card/ArticleCard";
import PrimaryButton from "../components/Button/PrimaryButton";
import styled from "../lib/styled-components";

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

const handleAction = (
  actionType: string,
  payload: { id: string; version: number }
) => () => alert(actionType + payload.id + payload.version);

const handleHoverChildren = (children: React.ReactElement<any>) => () =>
  children;

const linkComponent = (
  childrenProps: React.ReactElement<any>,
  route: string
) => <Link href={route}>{childrenProps}</Link>;

storiesOf("ArticleCard", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("No Image", () => (
    <ArticleCard
      imageURL={null}
      date={moment(1538734619928).format("D MMM YYYY")}
      title={
        "TwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitleTwoLineTitle"
      }
      id={"1234567890"}
      version={1}
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
      userAvatar={null}
      cardHeight={310}
      linkComponent={linkComponent}
      resourceType={"USER"}
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
    />
  ))
  .add("With Image", () => (
    <ArticleCard
      date={moment(1538734619928).format("D MMM YYYY")}
      title={"Two Line Title Two Line Title Two Line Title Two Line Title"}
      id={"1234567890"}
      version={1}
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
      userAvatar={null}
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      cardHeight={310}
      linkComponent={linkComponent}
      resourceType={"USER"}
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
    />
  ))
  .add("Chosen Article", () => (
    <ArticleCard
      date={moment(1538734619928).format("D MMM YYYY")}
      title={"Two Line Title Two Line Title Two Line Title Two Line Title"}
      id={"1234567890"}
      version={1}
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
      userAvatar={null}
      linkComponent={linkComponent}
      resourceType="USER"
      cardHeight={420}
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      isChosenArticle={true}
      hoverChildren={handleHoverChildren(
        <PrimaryButton
          onClick={handleAction("remove", { id: "1", version: 2345 })}
        >
          Remove Article
        </PrimaryButton>
      )}
      isLoggedIn={true}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
    />
  ));
