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

myStory.add("Community Card No Image", () =>
  <CommunityCard
    communityName="Loom Network"
    communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
    /* followers="319" */
    articles="58"
    /* views="39k" */
  />
);

myStory.add("Community Card With Image", () =>
  <CommunityCard
    communityName="Loom Network"
    communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
    /* followers="319" */
    articles="58"
    /* views="39k" */
    communityLogo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
  />
);

myStory.add("Collection Card", () =>
  <CollectionCard
    userId="0x2344234312312"
    username={Some("davo")}
    /* profileImage=None */
    collectionId="1"
    imageURL=None
    collectionName="Build a DAPP from 0 to Mainnet"
    collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
    articles="58"
    lastUpdated="Last Updated 3 June 2099"
  />
);

myStory.add("Collection Card With Image", () =>
  <CollectionCard
    userId="0x2344234312312"
    username={Some("davo")}
    /* profileImage=None */
    collectionId="1"
    collectionName="Build a DAPP from 0 to Mainnet"
    collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
    articles="58"
    lastUpdated="Last Updated 3 June 2099"
    imageURL={
      Some(
        "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      )
    }
  />
);

myStory.add("All Cards", () =>
  <div className=Styles.container>
    <CollectionCard
      userId="0x2344234312312"
      username={Some("davo")}
      /* profileImage=None */
      collectionId="1"
      collectionName="Build a DAPP from 0 to Mainnet"
      collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
      articles="58"
      lastUpdated="Last Updated 3 June 2099"
      imageURL={
        Some(
          "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        )
      }
    />
    <CollectionCard
      userId="0x2344234312312"
      username={Some("davo")}
      /* profileImage=None */
      collectionId="1"
      imageURL=None
      collectionName="Build a DAPP from 0 to Mainnet"
      collectionDescription="A walkthrough for every stage of dapp development. From Smart Contract to deployment"
      articles="58"
      lastUpdated="Last Updated 3 June 2099"
    />
    <CommunityCard
      communityName="Loom Network"
      communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
      /* followers="319" */
      articles="58"
      /* views="39k" */
      communityLogo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
    />
    <CommunityCard
      communityName="Loom Network"
      communityDescription="The Next-Generation Blockchain Application Platform for Ethereum."
      /* followers="319" */
      articles="58"
      /* views="39k" */
    />
  </div>
);