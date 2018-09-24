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
      Observable.fromPromise(
        request
          .get(`https://${config.getApiURL()}/smartcontract/${smartContractName}/all`)
          .then(({ body }) => body)
      )
    )
    const smartContractsToDeploy = {}

    Observable.forkJoin(smartContractFetchObservables).map(abiJSONs => {
      smartContractNames.map((smartContractName) => {
        const fetchedSmartContract = abiJSONs.find((abiJSON) => abiJSON.contractName === smartContractName)
        const smartContractWithProvider = contract(fetchedSmartContract)
        smartContractWithProvider.setProvider(web3.currentProvider)
        smartContractWithProvider.deployed()
        smartContractsToDeploy[smartContractName] = smartContractWithProvider
      })
      return smartContractsToDeploy
    })
      .subscribe(result => {
        smartContracts = result
        window.smartContracts = result
      })
  }
}

export default smartContracts
