import contract from 'truffle-contract'
import config from '../../../config'
import Web3 from 'web3'
import HDWalletProvider from '../../../forked_modules/truffle-hdwallet-provider'
import initApollo from '../../../lib/init-apollo'
import { searchRequests } from '../../../queries/Request'
import { globalSearchApprovedArticles } from '../../../queries/Article'
import { web3GetAccounts, web3Sign, login, message } from '../../../__tests__/lib/test-helpers'

export const KauriCoreArtifact = require(config.default.KauriCoreArtifact)

describe('tipArticle unit test', async () => {
  let smartContractPayload
  let KauriCore
  let web3
  let web3Account
  let result

  beforeAll(async () => {
    global.process.env.monolithExternalApi = config.default.monolithExternalApi
    global.process.env.monolithApi = config.default.monolithApi

    smartContractPayload = {
      id: '',
      article_id: '',
      contentHash: '',
      category: '',
      deadLine: '',
      weiBounty: '',
      options: {
        from: '',
        value: 0,
        gas: 250000,
        gasPrice: '',
      },
    }

    KauriCore = contract(KauriCoreArtifact)
    const mnemonic = config.default.devSeedWords
    const provider = new HDWalletProvider(mnemonic, `http://${config.default.gethBlockchain}`)
    web3 = new Web3(provider)
    web3Account = await web3GetAccounts(web3)
    web3Account = web3Account[0]
    KauriCore.setProvider(web3.currentProvider)
    KauriCore = await KauriCore.deployed()
  })

  it('should take in correct parameters', async () => {
    const signature = await web3Sign(web3, web3Account, web3.toHex(message))
    const token = await login(web3Account, signature)
    const apolloClient = initApollo(
      {},
      {
        getToken: () => token,
      }
    )

    const {
      data: {
        searchRequests: { content },
      },
    } = await apolloClient.query({
      query: searchRequests,
      variables: {
        filter: { status_in: ['OPENED'] },
        status_in: ['OPENED'],
        size: 1,
        sort: 'date_created',
        userId: null,
      },
    })
    const openedRequest = content[0]
    expect(openedRequest).not.toBeUndefined()
    expect(openedRequest).toMatchObject({
      request_id: expect.any(String),
    })

    const {
      data: {
        searchArticles: { content: articleContent },
      },
    } = await apolloClient.query({
      query: globalSearchApprovedArticles,
      variables: {
        size: 1,
      },
    })
    const approvedArticle = articleContent[0]
    expect(approvedArticle).not.toBeUndefined()
    expect(approvedArticle).toMatchObject({
      article_id: expect.any(String),
    })

    smartContractPayload.id = openedRequest.request_id
    smartContractPayload.article_id = approvedArticle.article_id
    smartContractPayload.article_version = approvedArticle.article_version
    smartContractPayload.weiBounty = web3.fromWei(openedRequest.bounty, 'ether')
    smartContractPayload.options.from = web3Account
    smartContractPayload.options.gasPrice = web3.toWei(1, 'wei')
    console.log(web3.toWei(smartContractPayload.weiBounty, 'ether'))

    console.info(smartContractPayload)

    try {
      result = await KauriCore.tipArticle.sendTransaction(
        smartContractPayload.article_id,
        smartContractPayload.article_version,
        smartContractPayload.id || '',
        web3Account,
        web3.toWei(smartContractPayload.weiBounty, 'ether'),
        {
          from: smartContractPayload.options.from,
          value: smartContractPayload.options.value,
          gas: 250000,
          gasPrice: smartContractPayload.options.gasPrice,
        }
      )
    } catch (err) {
      console.error(err)
      result = err
    } finally {
      if (typeof result === 'object') {
        expect(result.message).not.toEqual(expect.stringContaining('Solidity'))
      } else {
        expect(typeof result).toBe('string')
      }
    }
  })
})
