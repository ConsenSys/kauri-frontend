// const monolithApi = '35.196.21.146:80'
const monolithApi = 'api.dev.kauri.io'
const monolithExternalApi = monolithApi
const zaleniumGrid = 'https://zalenium.dev.kauri.io/wd/hub'

module.exports = {
  monolithApi,
  monolithExternalApi,
  zaleniumGrid,
  gethBlockchain: '35.231.60.112:8545',
  KauriCoreArtifact: process.env.CI
    ? '/contracts/KauriCore.json'
    : '../../../../flow/smart-contracts/build/contracts/KauriCore.json',
  WalletArtifact: process.env.CI
    ? '/contracts/Wallet.json'
    : '../../../../flow/smart-contracts/build/contracts/Wallet.json',
  devSeedWords: process.env.DEV_SEED_WORDS,
}

// module.exports = {
//   monolithApi: 'localhost:8080',
//   gethBlockchain: 'localhost:8545',
//   KauriCoreArtifact: '/Users/rej156/Documents/flow/smart-contracts/build/contracts/KauriCore.json',
//   monolithExternalApi: 'localhost:8080',
// }
