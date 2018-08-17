open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Cards", ~decorators=[], ~_module, ());

module Styles = {
  let container =
    Css.(style([display(`flex), flexDirection(row), flex(1)]));
};

myStory.add("Base Card", () =>
  <BaseCard> <Paragraph text="Some Content Here" /> </BaseCard>
);

myStory.add("Article Card", () =>
  <ArticleCard
    userId="0x133733713371337"
    date="3 June 2099"
    title="This is a title, possibly should support two lines"
    content="This is the content body, should be longer of course. Like a Lorem Ipsum, Bacon Summit or something like that"
    tags=[|"test", "foo", "bar", "ethereum"|]
    username=(Some("nelsonpimieeeenta"))
  />
);

myStory.add("Article Card with Image", () =>
  <ArticleCard
    userId="0x133733713371337"
    cardHeight=500
    date="3 June 2099"
    title="Debugging a Dapp using Remix - Mist - Geth"
    content="The ultimate goal of this tutorial is to debug transactions that have been created by a dapp front end.

    It is easy in Remix to debug a transaction created from its own GUI. However, setting up an environment that allows you to debug transactions created outside of Remix, require a bit more of complexity.

    We will need four tools for that :

    Geth - this is the center piece and provides the blockchain environment. We will basically run geth in a dev mode.
    Mist - this is the Ethereum dapp browser. We will use it to browse our front end.
    Remix - this is the Ethereum IDE. We will use it to develop our Solidity contract.
    Any code editor you want - in order to write your front end :)"
    imageURL="https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
    tags=[|"test", "foo", "bar", "ethereum"|]
    username=(Some("etherealcoder"))
    profileImage="https://randomuser.me/api/portraits/women/51.jpg"
  />
);

myStory.add("Community Card No Image", () =>
  <CommunityCard
    communityName="Loom Network"
    communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
    followers="319"
    articles="58"
    views="39k"
  />
);

myStory.add("Community Card With Image", () =>
  <CommunityCard
    communityName="Loom Network"
    communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
    followers="319"
    articles="58"
    views="39k"
    communityLogo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
  />
);

myStory.add("Collection Card", () =>
  <CollectionCard
    imageURL=None
    collectionName="Build a DAPP from 0 to Mainnet"
    collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
    articles="58"
    lastUpdated="Last Updated 3 June 2099"
    curatorImage="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
  />
);

myStory.add("Collection Card With Image", () =>
  <CollectionCard
    collectionName="Build a DAPP from 0 to Mainnet"
    collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
    articles="58"
    lastUpdated="Last Updated 3 June 2099"
    curatorImage="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
    imageURL=(
      Some(
        "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      )
    )
  />
);

myStory.add("All Cards", () =>
  <div className=Styles.container>
    <CollectionCard
      collectionName="Build a DAPP from 0 to Mainnet"
      collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
      articles="58"
      cardHeight=500
      lastUpdated="Last Updated 3 June 2099"
      curatorImage="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
      imageURL=(
        Some(
          "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        )
      )
    />
    <CollectionCard
      imageURL=None
      collectionName="Build a DAPP from 0 to Mainnet"
      collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
      articles="58"
      lastUpdated="Last Updated 3 June 2099"
      curatorImage="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
    />
    <CommunityCard
      communityName="Loom Network"
      communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
      followers="319"
      articles="58"
      views="39k"
      cardHeight=500
      communityLogo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
    />
    <CommunityCard
      communityName="Loom Network"
      communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
      followers="319"
      articles="58"
      views="39k"
    />
    <ArticleCard
      userId="0x133733713371337"
      cardHeight=500
      date="3 June 2099"
      title="Debugging a Dapp using Remix - Mist - Geth"
      content="The ultimate goal of this tutorial is to debug transactions that have been created by a dapp front end.

It is easy in Remix to debug a transaction created from its own GUI. However, setting up an environment that allows you to debug transactions created outside of Remix, require a bit more of complexity.

We will need four tools for that :

Geth - this is the center piece and provides the blockchain environment. We will basically run geth in a dev mode.
Mist - this is the Ethereum dapp browser. We will use it to browse our front end.
Remix - this is the Ethereum IDE. We will use it to develop our Solidity contract.
Any code editor you want - in order to write your front end :)"
      imageURL="https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      tags=[|"test", "foo", "bar", "ethereum"|]
      username=(Some("etherealcoder"))
      profileImage="https://randomuser.me/api/portraits/women/51.jpg"
    />
    <ArticleCard
      userId="0x133733713371337"
      date="3 June 2099"
      title="This is a title, possibly should support two lines"
      content="This is the content body, should be longer of course. Like a Lorem Ipsum, Bacon Summit or something like that"
      tags=[|"test", "foo", "bar", "ethereum"|]
      username=(Some("nelsonpimieeeenta"))
    />
  </div>
);