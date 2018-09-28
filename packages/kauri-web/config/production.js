//@flow
module.exports = {
  KauriCoreArtifact: '/contracts/KauriCore.json',
  WalletArtifact: '/contracts/Wallet.json',
  TopicModeratorArtifact: '/contracts/TopicModerator.json',
  monolithApi: process.env.MONOLITH_API,
  monolithExternalApi: process.env.MONOLITH_EXTERNAL_API,
  gethBlockchain: process.env.GETH_BLOCKCHAIN,
}
