import { Observable } from 'rxjs'
import contract from 'truffle-contract'

const KauriCoreArtifact = require(process.env.KauriCoreArtifact)
const WalletArtifact = require(process.env.WalletArtifact)
const TopicModeratorArtifact = require(process.env.TopicModeratorArtifact)

let smartContracts

export const initSmartContracts = web3 => {
  let KauriCore = contract(KauriCoreArtifact)
  let Wallet = contract(WalletArtifact)
  let TopicModerator = contract(TopicModeratorArtifact)
  if (typeof web3 !== 'undefined') {
    KauriCore.setProvider(web3.currentProvider)
    Wallet.setProvider(web3.currentProvider)
    TopicModerator.setProvider(web3.currentProvider)
    const smartContractsToDeploy = {
      KauriCore: KauriCore.deployed(),
      Wallet: Wallet.deployed(),
      TopicModerator: TopicModerator.deployed(),
    }

    return Observable.concat(...Object.values(smartContractsToDeploy))
      .reduce((current, next, index) => {
        current[Object.keys(smartContractsToDeploy)[index]] = next
        return current
      }, {})
      .subscribe(result => {
        smartContracts = result
        window.smartContracts = result
      })
  }
}

export default smartContracts
