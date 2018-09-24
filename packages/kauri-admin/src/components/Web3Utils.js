import ethJsUtil from 'ethereumjs-util';

class Web3Utils  {

    getAccount() {
      return window.web3.eth.accounts[0];
    }

    async sign(message) {
        return new Promise((resolve, reject) => {
            window.web3.currentProvider.sendAsync(
                {
                    id      : new Date().getTime(),
                    jsonrpc : '2.0',
                    method  : 'personal_sign',
                    params  : [window.web3.eth.accounts[0], window.web3.toHex(message)],
                },
                (err, { result }) => (err ? reject(err) : resolve(result))
            )
        });
    }

    async recover(msg, rpcSignature) {
      const {v, r, s} = ethJsUtil.fromRpcSig(rpcSignature);

      const msgHash = ethJsUtil.hashPersonalMessage(new Buffer(msg));
      const pubKey  = ethJsUtil.ecrecover(msgHash, v, r, s);
      const addrBuf = ethJsUtil.pubToAddress(pubKey);
      const addr    = ethJsUtil.bufferToHex(addrBuf);

      return addr
    }

    async getEvents(contract) {
        console.log("getEvents(contract:"+contract+")")

        return new Promise((resolve, reject) => {

            if(!contract) reject("no contract configured");

            window.web3.eth.filter({
                address       : contract,
                fromBlock     : 1,
                toBlock       : 'latest'
            }).get(function (err, result) {
              console.log(err);
              console.log(result)
                if(err) {
                  reject(err)
                } else {
                  resolve(result)
                }
            })
        }); 
    }

    async gasPrice() {
        console.log("gasPrice()")

        return new Promise((resolve, reject) => {

            window.web3.eth.gasPrice(function (err, result) {
                if(err) {
                  reject(err)
                } else {
                  resolve(result)
                }
            })
        }); 
    }

    async getTransactionReceipt(transactionHash) {
        console.log("getTransactionReceipt(transactionHash:"+transactionHash+")")

        return new Promise((resolve, reject) => {

            window.web3.eth.getTransactionReceipt(transactionHash, function (err, result) {
                if(err) {
                  reject(err)
                } else {
                  resolve(result)
                }
            })
        }); 
    }

    async getNetwork() {
        return new Promise((resolve, reject) => {

            window.web3.version.getNetwork((err, netId) => {

              if(err) {
                  reject(err)
              }

              var networkId = netId;
              var networkName;

              switch (netId) {
                case "1":
                  networkName = "Mainnet";
                  break
                case "2":
                  networkName = "Morden";
                  break
                case "3":
                  networkName = "Ropsten";
                  break
                case "4":
                  networkName = "Rinkeby";
                  break
                case "42":
                  networkName = "Kovan";
                  break
                default:
                  networkName = "Unknown";
              }

              resolve({networkId: Number(networkId), networkName})
            }) 
        }); 
    }

}

export default Web3Utils;


