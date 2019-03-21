// @flow
import { Observable } from "rxjs/Observable";
import contract from "truffle-contract";
import superagent from "superagent";
const request = superagent.agent();
const config = require("../config").default;

let smartContracts;

type Web3Props = {
  currentProvider: string,
};

export const initSmartContracts = (web3: Web3Props, cb: any) => {
  if (typeof web3 !== "undefined") {
    const smartContractNames = ["KauriCore", "Wallet", "Community"];
    const smartContractFetchObservables = smartContractNames.map(
      smartContractName =>
        Observable.fromPromise(
          request
            .get(
              `https://${config.getApiURL()}/smartcontract/${smartContractName}/all`
            )
            .then(({ body }) => body)
        )
    );
    const smartContracts = {};

    Observable.forkJoin(smartContractFetchObservables)
      .map(abiJSONs =>
        smartContractNames.map(smartContractName => {
          const fetchedSmartContract = abiJSONs.find(
            abiJSON => abiJSON.contractName === smartContractName
          );
          const smartContractWithProvider = contract(fetchedSmartContract);
          smartContractWithProvider.setProvider(web3.currentProvider);
          return smartContractWithProvider.deployed();
        })
      )
      .mergeMap(smartContractsToDeploy =>
        Observable.of(...smartContractsToDeploy.map(sc => sc))
      )
      .combineAll()
      .map(arrayOfSmartContractsToDeploy => {
        smartContractNames.map((smartContractName, index) => {
          smartContracts[smartContractNames[index]] =
            arrayOfSmartContractsToDeploy[index];
        });
        return smartContracts;
      })
      .subscribe(
        result => {
          // console.log(result)
          window.smartContracts = result;
          cb(result);
          return result;
        },
        err => {
          console.error(err);
          cb(false, err);
        }
      );
  }
};

export default smartContracts;
