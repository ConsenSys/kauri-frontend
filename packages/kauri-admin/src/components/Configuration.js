import Web3Utils from './Web3Utils'

class Configuration {
  static _BACKEND = {
    LOCAL: {
      name: 'LOCAL',
      host: 'localhost',
      port: 8080,
      network_id: 17
    },
    DEV: {
      name: 'DEV',
      host: 'api.dev2.kauri.io',
      port: 443,
      network_id: 224895
    },
    UAT: {
      name: 'UAT',
      host: 'api.rinkeby.kauri.io',
      port: 443,
      network_id: 4
    }
  }

  static _FAUCETS = {
    Mainet: 'Buy some !!!',
    Rinkeby: 'Go to https://faucet.rinkeby.io/',
    Ropsten: 'Go to http://faucet.ropsten.be:3001/',
    Unknown: 'NO FAUCET for the DEV blockchain'
  }

  static _DEFAULT_BACKEND = 'DEV'
  static _JWT_MSG = 'v0G9u7huK4mJb2K1'
  static _TIMEOUT = 10000

  static _TOPICS = ['metamask', 'uport', 'ethereum', 'kauri', 'aragon', 'dharma', 'ens', 'makerdao', 'remix', 'toshi']
  static _CATEGORY = ['General', 'Tutorials']

  static _TOPIC_ABI = [
    {
      constant: false,
      inputs: [
        {
          name: '_storageContract',
          type: 'address'
        }
      ],
      name: 'setStorageContractAddress',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getStorageContractAddress',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'topic',
          type: 'bytes32'
        },
        {
          indexed: true,
          name: 'modAddress',
          type: 'address'
        }
      ],
      name: 'ModeratorAdded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'topic',
          type: 'bytes32'
        },
        {
          indexed: true,
          name: 'modAddress',
          type: 'address'
        }
      ],
      name: 'ModeratorDeactivated',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_topic',
          type: 'bytes32'
        },
        {
          name: '_modAddress',
          type: 'address'
        }
      ],
      name: 'addModerator',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_topic',
          type: 'bytes32'
        },
        {
          name: '_modAddress',
          type: 'address'
        }
      ],
      name: 'deactivateModerator',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_topic',
          type: 'bytes32'
        },
        {
          name: '_potentialModAddress',
          type: 'address'
        }
      ],
      name: 'isModerator',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_topic',
          type: 'bytes32'
        }
      ],
      name: 'isTopic',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_moderator',
          type: 'address'
        }
      ],
      name: 'getModeratorTopics',
      outputs: [
        {
          name: '',
          type: 'bytes32[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_topic',
          type: 'bytes32'
        }
      ],
      name: 'getModerators',
      outputs: [
        {
          name: '',
          type: 'address[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ]

  static _LICENSES = [
    {
      name: 'CC-BY-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/'
    },
    {
      name: 'Apache License 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0'
    },
    {
      name: 'BSD 3-Clause "New" or "Revised" license',
      url: 'https://spdx.org/licenses/BSD-3-Clause.html'
    },
    {
      name: 'BSD 2-Clause "Simplified" or "FreeBSD" license',
      url: 'https://opensource.org/licenses/BSD-2-Clause'
    },
    {
      name: 'GNU General Public License (GPL)',
      url: 'https://www.gnu.org/licenses/gpl-3.0.en.html'
    },
    {
      name: 'GNU Library or "Lesser" General Public License (LGPL)',
      url: 'https://www.gnu.org/licenses/lgpl-3.0.en.html'
    },
    {
      name: 'MIT license',
      url: 'https://opensource.org/licenses/MIT'
    },
    {
      name: 'Mozilla Public License 2.0',
      url: 'https://www.mozilla.org/en-US/MPL/2.0/'
    },
    {
      name: 'Common Development and Distribution License',
      url: 'https://opensource.org/licenses/CDDL-1.0'
    },
    {
      name: 'Eclipse Public License',
      url: 'https://www.eclipse.org/legal/epl-v10.html'
    }
  ]

  constructor() {
    this.web3Utils = new Web3Utils()
    this.setBackend(Configuration._DEFAULT_BACKEND)

    this.addresses = {};
    this.web3Utils.getNetwork().then( (network) => {
      console.log(network)
      const smartContractAddresses = localStorage.getItem(network.networkId+"_smartcontracts");
      if(smartContractAddresses && smartContractAddresses !== "") {
        this.setSmartContractAddresses(JSON.parse(smartContractAddresses));
      } else {
        this.setSmartContractAddresses({});
      }
    } );
  }


  getBackend() {
    return this.backend
  }

  setBackend(backend) {
    this.backend = Configuration._BACKEND[backend]
    this.endpoints = {
      // auth: 'https://' + this.backend.host + ':' + this.backend.port + '/auth',
      initiateAuth: 'https://api.dev2.kauri.io/web3auth/api/login?app_id=kauri&client_id=kauri-gateway',
      auth: 'https://api.dev2.kauri.io/web3auth/api/login',
      gql: 'https://' + this.backend.host + ':' + this.backend.port + '/graphql',
      ws: 'wss://' + this.backend.host + ':' + this.backend.port + '/socket/graphql'
    }
  }

  getEndpoints() {
    return this.endpoints
  }

  getSmartContractAddresses() {
    return this.addresses
  }

  async setSmartContractAddresses(addresses) {
    this.addresses = addresses

    // Save smart contract addresses in the local storage
    const network = await this.web3Utils.getNetwork();
    localStorage.setItem(network.networkId+"_smartcontracts", JSON.stringify(addresses));
  }

  getContractInstance(contract, address) {
    if (contract === 'TOPICS') {
      const contract = window.web3.eth.contract(Configuration._TOPIC_ABI)
      const contractInst = contract.at(address)

      return contractInst
    }
  }

}

export default Configuration
