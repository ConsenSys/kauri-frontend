// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import cookie from 'cookie'

const supportedNetworkIds = [4, 224895]
const ONE_SECOND = 1000
const TWENTY_SECONDS = ONE_SECOND * 20

type NetworkBannerType = 'withActionsHeader' | 'rewardContributor' | 'profileTab'

const containerRewardContributorCss = css`
  position: absolute;
  flex-direction: column;
  height: 100px;
  max-height: ${props => (props.showBanner ? '100px' : '0px')};
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
`

const containerProfileTabCss = css`
  position: initial;
`

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 10000;
  padding: 0 ${props => props.theme.padding};
  background: #d77857;
  justify-content: center;
  align-items: center;
  color: white;
  ${(props: { type?: NetworkBannerType }) => {
    switch (props.type) {
      case 'rewardContributor':
        return containerRewardContributorCss
      case 'profileTab':
        return containerProfileTabCss
    }
  }};
`

class ContainerWithLifeCycle extends React.Component<{ type?: NetworkBannerType }> {
  componentDidMount () {
    if (this.props.type !== 'rewardContributor') {
      document.body.style = 'overflow: hidden;'
    }
  }

  componentWillUnmount () {
    document.body.style = 'overflow: visible;'
  }

  render () {
    return <Container {...this.props}>{this.props.children}</Container>
  }
}

const networkNames = {
  '1': 'Main',
  '2': 'Morden',
  '3': 'Ropsten',
  '4': 'Rinkeby',
  '42': 'Kovan',
  '224895': 'Kauri Dev',
}

const overlayWithActionsHeaderCss = css`
  top: 98px;
`

const overlayRewardContributorCss = css`
  top: 152px;
  height: 100px;
  position: initial;
`

const overlayProfileTabCss = css`
  top: 98px;
`

const Overlay = styled.div`
  position: fixed;
  height: 100%;
  width: 100vw;
  z-index: 999;
  opacity: 0.6;
  background-color: black;
  top: 22px;
  left: 0;
  right: 0;
  bottom: 0;
  ${(props: { type?: NetworkBannerType }) => {
    switch (props.type) {
      case 'withActionsHeader':
        return overlayWithActionsHeaderCss
      case 'rewardContributor':
        return overlayRewardContributorCss
      case 'profileTab':
        return overlayProfileTabCss
    }
  }};
`

const UnsupportedNetwork = ({ currentNetworkName, type, showBanner }) => (
  <ContainerWithLifeCycle type={type} showBanner={showBanner} error>
    <span>
      {`Please switch to the `}
      <strong>Rinkeby</strong>
      {` Test Network.`}
    </span>
    <Overlay type={type} />
  </ContainerWithLifeCycle>
)

const MetaMaskLocked = ({ type, showBanner }) => (
  <ContainerWithLifeCycle type={type} showBanner={showBanner} error>
    <span>Please unlock MetaMask</span>
    <Overlay type={type} />
  </ContainerWithLifeCycle>
)

const WrongAccount = ({ children, type, showBanner }) => (
  <ContainerWithLifeCycle showBanner={showBanner} type={type} error>
    <span>{children}</span>
    <Overlay type={type} />
  </ContainerWithLifeCycle>
)

type Props = {
  type?: NetworkBannerType,
  showBanner?: boolean,
  loggingOut?: boolean,
}

export default class NetworkBanner extends React.Component<
  Props,
  {
    networkId: ?number,
    networkError: any,
    networkLoaded: boolean,
    accountsLoaded: boolean,
    accountsError: any,
    accounts: ?Array<any>,
  }
> {
  interval = null
  networkInterval = null

  constructor (props: *) {
    super(props)
    this.state = {
      networkId: null,
      networkError: null,
      networkLoaded: false,
      accountsLoaded: false,
      accountsError: null,
      accounts: null,
    }
  }

  /**
   * Start polling accounts, & network. We poll indefinitely so that we can
   * react to the user changing accounts or networks.
   */
  componentDidMount () {
    this.fetchAccounts()
    this.fetchNetwork()
    this.initAccountsPoll()
    this.initNetworkPoll()
  }

  /**
   * Init network polling, and prevent duplicate intervals.
   * @return {void}
   */
  initNetworkPoll = () => {
    if (!this.networkInterval) {
      this.networkInterval = setInterval(this.fetchNetwork, TWENTY_SECONDS)
    }
  }

  /**
   * Init web3/account polling, and prevent duplicate interval.
   * @return {void}
   */
  initAccountsPoll = () => {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, ONE_SECOND)
    }
  }

  /**
   * Update state regarding the availability of web3 and an ETH account.
   * @return {void}
   */
  fetchAccounts = () => {
    const { web3 } = global.window

    web3 &&
      web3.eth &&
      web3.eth.getAccounts((err, accounts) => {
        if (!this.state.accountsLoaded) {
          return this.setState({
            ...this.state,
            accountsLoaded: true,
            accountsError: null,
          })
        }

        if (err) {
          console.log(err)

          return this.setState({
            ...this.state,
            accountsLoaded: true,
            accountsError: err,
          })
        } else {
          return this.handleAccounts(accounts)
        }
      })
  }

  handleAccounts = (accounts: Array<any>) => {
    let next = accounts && accounts[0]
    let curr = this.state.accounts && this.state.accounts[0]
    next = next && next.toLowerCase()
    curr = curr && curr.toLowerCase()
    if (curr !== next) {
      const cookieToParse = window.document.cookie
      if (!cookieToParse) return {}
      const userId = cookie.parse(cookieToParse)['USER_ID']

      this.setState({
        ...this.state,
        accounts,
        accountsLoaded: true,
        accountsError: null,
      })

      if (next && userId && userId !== next) {
        return this.setState({
          ...this.state,
          accounts,
          accountsLoaded: true,
          accountsError: 'Wrong metamask account',
        })
      }
    }
  }

  /**
   * Get the network and update state accordingly.
   * @return {void}
   */
  fetchNetwork = () => {
    const { web3 } = window

    web3 &&
      web3.version &&
      web3.version.getNetwork((err, netId) => {
        const networkId = parseInt(netId, 10)
        if (err) {
          return this.setState({
            ...this.state,
            networkLoaded: true,
            networkError: err,
          })
        } else {
          if (networkId !== this.state.networkId) {
            return this.setState({
              ...this.state,
              networkId,
              networkError: null,
              networkLoaded: true,
            })
          }
        }
      })
  }

  render () {
    if (!global.window) return null

    const { type, showBanner, loggingOut } = this.props
    const { networkId, accountsLoaded, accounts, accountsError } = this.state
    const currentNetworkName =
      typeof networkId === 'number' && networkNames[networkId] ? networkNames[networkId] : networkId

    if (typeof loggingOut === 'boolean') {
      return null
    }

    if (typeof showBanner === 'boolean' && !showBanner) {
      return null
    }

    if (typeof networkId === 'number' && supportedNetworkIds.indexOf(networkId) < 0) {
      return <UnsupportedNetwork showBanner={showBanner} currentNetworkName={currentNetworkName} type={type} />
    }

    if (Array.isArray(accounts) && accounts.length === 0 && !accountsError && accountsLoaded === true) {
      return <MetaMaskLocked showBanner={showBanner} type={type} />
    }

    if (accountsError === 'Wrong metamask account') {
      return (
        <WrongAccount showBanner={showBanner} type={type}>
          {accountsError}
        </WrongAccount>
      )
    }

    return null
  }
}
