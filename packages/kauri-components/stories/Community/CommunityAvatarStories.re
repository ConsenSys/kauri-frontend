open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Community Avatar", ~decorators=[], ~_module, ());

myStory.add("MetaMask", () => <CommunityAvatar community="metamask" />);
myStory.add("MakerDAO", () => <CommunityAvatar community="makerdao" />);