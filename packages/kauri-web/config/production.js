//@flow
module.exports = {
  KauriCoreArtifact: "/contracts/KauriCore.json",
  WalletArtifact: "/contracts/Wallet.json",
  TopicModeratorArtifact: "/contracts/TopicModerator.json",
  monolithApi: process.env.MONOLITH_API,
  monolithExternalApi: process.env.MONOLITH_EXTERNAL_API,
  gethBlockchain: process.env.GETH_BLOCKCHAIN,
  KauriCommunityId: "524d2cb07f2d40c992479064209bbb21",
  analyticsTokens: {
    mixpanel: "7d83001be784f09b212b9b3274e41530",
    ga: "UA-112179323-1",
  },
};
