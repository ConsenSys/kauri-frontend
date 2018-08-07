module.exports = {
  KauriCoreArtifact: '/contracts/KauriCore.json',
  WalletArtifact: '/contracts/Wallet.json',
  TopicModeratorArtifact: '/contracts/TopicModerator.json',
  monolithApi: process.env.MONOLITH_API || 'monolith.dev:8080',
  monolithExternalApi: process.env.MONOLITH_EXTERNAL_API || 'api.dev.kauri.io',
  gethBlockchain: process.env.GETH_BLOCKCHAIN || '35.196.184.109:8545' || 'geth.dev:8545',
}
