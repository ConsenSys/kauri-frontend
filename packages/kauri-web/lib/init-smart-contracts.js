// @flow
import { Observable } from 'rxjs/Observable'
import contract from 'truffle-contract'
import superagent from 'superagent'
const request = superagent.agent()
const config = require('../config').default

let smartContracts

export const initSmartContracts = web3 => {
  if (typeof web3 !== 'undefined') {
    const smartContractNames = ['KauriCore', 'Wallet', 'Community']
    const smartContractFetchObservables = smartContractNames.map(smartContractName =>
      Observable.fromPromise(request.get(`https://${config.getApiURL()}/smartcontract/${smartContractName}/all`)))
    const smartContractsToDeploy = {}

    Observable.forkJoin(smartContractFetchObservables).map(abiJSONs => {
      smartContractNames.map((smartContractName) => {
        const smartContractWithProvider = contract(abiJSONs[smartContractName]).setProvider(web3.currentProvider)
        smartContractsToDeploy[smartContractName] = smartContractWithProvider.deployed()
      })
      return smartContractsToDeploy
    }).concat(...Object.values(smartContractsToDeploy))
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
