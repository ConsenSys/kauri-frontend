import React from "react";
import { storiesOf } from "@storybook/react";
import moment from "moment";
import ArticleCard from "../components/Card/ArticleCard";
import PrimaryButton from "../components/Button/PrimaryButton";
import styled from "../lib/styled-components";

const typeName: "NftTokenDTO" = "NftTokenDTO";

const nfts = [
  {
    __typename: typeName,
    contractAddress: "0xalis239qkljeu293hd",
    externalUrl: "https://link-to-kudos",
    image:
      "https://s.gitcoin.co/static/v2/images/kudos/kauri_2.b22f35d8111e.svg",
    name: "Web3 Advocate",
    tokenType: "kauri-web3-advocate",
  },
  {
    __typename: typeName,
    contractAddress: "0x384ahse9872eheqiuwye91",
    externalUrl: "https://link-to-kudos",
    image:
      "https://s.gitcoin.co/static/v2/images/kudos/kauri_1.d335211161dc.svg",
    name: "Kauri Pioneer",
    tokenType: "kauri-pioneer",
  },
];

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
  .add("Default height of 310, two line title, no image", () => (
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
      nfts={nfts}
    />
  ))
  .add("Card height of 420, three line title, no image", () => (
    <ArticleCard
      imageURL={null}
      date={moment(1538734619928).format("D MMM YYYY")}
      title={
        "Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title"
      }
      id={"1234567890"}
      version={1}
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
      userAvatar={null}
      cardHeight={420}
      linkComponent={linkComponent}
      resourceType={"USER"}
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      nfts={nfts}
    />
  ))
  .add("Default height of 310, two line title, with image", () => (
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
      nfts={nfts}
    />
  ))
  .add("Card height of 420, two line title, with image", () => (
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
      userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      username={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      userAvatar={null}
      resourceType={"USER"}
      linkComponent={linkComponent}
      cardHeight={450}
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      nfts={nfts}
    />
  ))
  .add("Is logged in, Card height of 420, two line title, with image", () => (
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
      hoverChildren={handleHoverChildren(
        <PrimaryButton
          onClick={handleAction("choose", { id: "1", version: 2345 })}
        >
          Choose Article
        </PrimaryButton>
      )}
      isLoggedIn={true}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      nfts={nfts}
    />
  ))
  .add(
    "Is logged in, Card height of 420, two line title, with image, is chosen article",
    () => (
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
        nfts={nfts}
      />
    )
  )
  .add("Card width of 610, two line title, no image", () => (
    <ArticleCard
      imageURL={null}
      date={moment(1538734619928).format("D MMM YYYY")}
      title={
        "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title"
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
      userAvatar={null}
      userId={"HEY"}
      cardHeight={310}
      linkComponent={linkComponent}
      resourceType="COMMUNITY"
      cardWidth={610}
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      nfts={nfts}
    />
  ))
  .add("Card width of 610, two line title, with image", () => (
    <ArticleCard
      date={moment(1538734619928).format("D MMM YYYY")}
      title={
        "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title"
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
      userAvatar={null}
      cardHeight={420}
      linkComponent={linkComponent}
      resourceType="COMMUNITY"
      cardWidth={610}
      imageURL={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      nfts={nfts}
    />
  ))
  .add("Status Draft, Default height of 310, two line title, no image", () => (
    <ArticleCard
      imageURL={null}
      date={moment(1538734619928).format("D MMM YYYY")}
      title={
        "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title"
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
      status={"DRAFT"}
      isLoggedIn={false}
      tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
      nfts={nfts}
    />
  ))
  .add(
    "Is logged in, Status Draft, Default height of 310, two line title, no image",
    () => (
      <ArticleCard
        imageURL={null}
        date={moment(1538734619928).format("D MMM YYYY")}
        isLoggedIn={true}
        title={
          "Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title Two Line Title"
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
        status={"DRAFT"}
        hoverChildren={handleHoverChildren(
          <PrimaryButton
            onClick={handleAction("draft deleted", { id: "1", version: 2345 })}
          >
            Delete Draft
          </PrimaryButton>
        )}
        tags={["testing", "web3", "truffle", "infura", "zeppelinOS"]}
        nfts={nfts}
      />
    )
  );
