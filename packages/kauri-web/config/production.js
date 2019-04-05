//@flow
module.exports = {
  KauriCoreArtifact: "/contracts/KauriCore.json",
  WalletArtifact: "/contracts/Wallet.json",
  TopicModeratorArtifact: "/contracts/TopicModerator.json",
  monolithApi: process.env.MONOLITH_API,
  monolithExternalApi: process.env.MONOLITH_EXTERNAL_API,
  gethBlockchain: process.env.GETH_BLOCKCHAIN,
  KauriCommunityId: process.env.KAURI_COMMUNITY_ID,
  analyticsTokens: {
    mixpanel: "7d83001be784f09b212b9b3274e41530",
    ga: "UA-112179323-1",
  },
};
