open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Headers", ~decorators=[], ~_module, ());

myStory.add("Collection Header", () =>
  <CollectionHeader
    name="Test collection"
    description="Test description for a fake collection"
    username="0x32048jdwk298he"
    updated="1 day ago"
  />
);

myStory.add("Community Header", () =>
  <CommunityHeader>
    <CommunityProfile community="metamask" website="https://metamask.io" />
  </CommunityHeader>
);