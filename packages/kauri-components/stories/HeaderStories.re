open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Headers", ~decorators=[], ~_module, ());

myStory.add("Collection Header", () =>
  <CollectionHeader
    id="1234567890"
    ownerId="1234567890"
    name="Test collection"
    description="Test description for a fake collection"
    userId="0x32048jdwk298he"
    username={Some("0x32048jdwk298he")}
    userAvatar=None
    updated="1 day ago"
    url="test.com"
  />
);

myStory.add("Community Header", () =>
  <CommunityHeader>
    <CommunityProfile
      hostName="beta.kauri.io"
      avatar="https://api.dev2.kauri.io:443/ipfs/QmYy86Xyt4KgJDjZysYP4snuR9aTxXYFkPd9DpB4b3sjMz"
      community="metamask"
      website="https://metamask.io"
    />
  </CommunityHeader>
);