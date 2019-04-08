// const monolithApi = '35.196.21.146:80'
const monolithExternalApi = "api.dev.kauri.io";
const monolithApi = monolithExternalApi;

module.exports = {
  monolithApi,
  monolithExternalApi,
  gethBlockchain: "35.231.60.112:8545",
  KauriCoreArtifact:
    "../../../../flow/smart-contracts/build/contracts/KauriCore.json",
  WalletArtifact:
    "../../../../flow/smart-contracts/build/contracts/Wallet.json",
  TopicModeratorArtifact:
    "../../../../flow/smart-contracts/build/contracts/TopicModerator.json",
  KauriCommunityId: "3e174cdcf9744ee3898f6a3badc3288b",
  analyticsTokens: {
    mixpanel: process.env.MIXPANEL_TOKEN,
    ga: "UA-112179323-4",
  },
};

// module.exports = {
//   monolithApi: 'localhost:8080',
//   gethBlockchain: 'localhost:8545',
//   KauriCoreArtifact: '/Users/rej156/Documents/flow/smart-contracts/build/contracts/KauriCore.json',
//   monolithExternalApi: 'localhost:8080',
// }
