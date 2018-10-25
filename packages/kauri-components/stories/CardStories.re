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

myStory.add("All Cards", () =>
  <div className=Styles.container>
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