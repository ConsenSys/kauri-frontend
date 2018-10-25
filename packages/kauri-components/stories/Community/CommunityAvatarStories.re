open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Community Avatar", ~decorators=[], ~_module, ());

myStory.add("MetaMask", () =>
  <CommunityAvatar
    avatar="https://api.dev2.kauri.io:443/ipfs/QmYy86Xyt4KgJDjZysYP4snuR9aTxXYFkPd9DpB4b3sjMz"
  />
);
myStory.add("MakerDAO", () =>
  <CommunityAvatar
    avatar="https://api.dev2.kauri.io/ipfs/QmPcuAZuSV4ZWYkrkbaxnRw7K2pzSKZP2WmYZKyP48uWAb"
  />
);