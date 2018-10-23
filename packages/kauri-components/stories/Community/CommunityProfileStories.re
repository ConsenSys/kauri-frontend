open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Community Profile", ~decorators=[], ~_module, ());

module DummyContainer =
  Styled.Div({
    type pageType = unit;
    let displayName = "DummyContainer";
    let style = _ => Css.[width(px(120))];
  });

myStory.add("MetaMask", () =>
  <DummyContainer>
    <CommunityProfile
      hostName="beta.kauri.io"
      avatar="https://api.dev2.kauri.io:443/ipfs/QmYy86Xyt4KgJDjZysYP4snuR9aTxXYFkPd9DpB4b3sjMz"
      community="metamask"
      website="https://metamask.io"
    />
  </DummyContainer>
);