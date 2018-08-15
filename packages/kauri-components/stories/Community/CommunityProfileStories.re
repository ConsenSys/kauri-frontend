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
    <CommunityProfile community="metamask" website="https://metamask.io" />
  </DummyContainer>
);