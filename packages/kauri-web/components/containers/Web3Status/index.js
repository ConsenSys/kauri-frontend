import React, { Component } from "react";
import styled, { css } from "styled-components";
import cookie from "cookie";
import userIdTrim from "../../../lib/userid-trim";

const networkNames = {
  1: "Main",
  2: "Morden",
  3: "Ropsten",
  4: "Rinkeby",
  42: "Kovan",
  224895: "Kauri Dev",
};

const supportedNetworkIds = [4, 224895];
const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

const StatusIndicator = styled.div`
  cursor: pointer;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: ${props =>
    props.accountsError || props.networkError ? "red" : "rgb(246, 195, 67)"};
  border: 1px solid #fff;
`;

const Loading = props => <div>Loading...</div>;

const UnsupportedNetwork = props => (
  <div>
    MetaMask should be on <strong>Rinkeby</strong> Network
  </div>
);

const Web3Unavailable = props => (
  <div>
    <a style={{ color: "#fff" }} target="_blank" href="https://metamask.io/">
      MetaMask extension not installed.
    </a>
  </div>
);

const WrongAccountText = styled.span`
  color: red !important;
`;

const slideDownCss = css`
  overflow-y: hidden;
  max-height: ${props => (props.hovered ? "60px" : "0px")};
  padding-top: ${props => !props.hovered && "0px"};
  padding-bottom: ${props => !props.hovered && "0px"};
  transition-property: unset;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
`;

const DropdownContainer = styled.div`
  display: flex;
  height: 60px;
  flex-direction: column;
  position: absolute;
  top: 80%;
  z-index: 9999;
  width: 200px;
  background: #fff;
  color: black !important;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  ${slideDownCss};
`;

const NetworkStatus = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  width: inherit;
  border-bottom: 1px solid ${props => props.theme.primaryColor};
  > * {
    line-height: 30px !important;
  }
`;

const AccountStatus = styled(NetworkStatus)`
  border-bottom: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  > * {
    border-bottom: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const NetworkText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #283035;
  text-transform: uppercase;
`;

const AccountText = NetworkText;

const DropdownDetails = ({
  currentNetworkName,
  hovered,
  account,
  accountsError,
  networkError,
}) => (
  <DropdownContainer hovered={hovered}>
    <NetworkStatus>
      <NetworkText>{`${currentNetworkName || "Loading"} Network`}</NetworkText>
    </NetworkStatus>
    <AccountStatus>
      {accountsError ? (
        <WrongAccountText>{accountsError}</WrongAccountText>
      ) : (
        <AccountText>
          {account &&
            `${account.substring(0, 8)}...${account.substring(
              account.length - 8,
              account.length
            )}`}
        </AccountText>
      )}
    </AccountStatus>
  </DropdownContainer>
);

const AccountDetailsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class AccountDetails extends Component {
  state = {
    hovered: false,
  };

  toggleHovered = () => this.setState({ hovered: !this.state.hovered });

  render() {
    const {
      currentNetworkName,
      networkError,
      accountsError,
      account,
    } = this.props;
    return (
      <AccountDetailsContainer>
        <StatusIndicator
          onMouseEnter={() => this.toggleHovered()}
          onMouseLeave={() => this.toggleHovered()}
          networkError={networkError}
          accountsError={accountsError}
        />
        <DropdownDetails
          networkError={networkError}
          accountsError={accountsError}
          hovered={this.state.hovered}
          currentNetworkName={currentNetworkName}
          account={account}
        />
      </AccountDetailsContainer>
    );
  }
}

class Web3Status extends Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.networkInterval = null;
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.fetchNetwork = this.fetchNetwork.bind(this);
    this.state = {
      accounts: null,
      accountsLoaded: false,
      networkId: null,
      networkError: null,
      accountsError: null,
    };
  }

  componentDidCatch(err, errorInfo) {
    console.log(this.state);
    console.log(err);
    console.log(errorInfo);
  }

  /**
   * Start polling accounts, & network. We poll indefinitely so that we can
   * react to the user changing accounts or networks.
   */
  componentDidMount() {
    this.fetchAccounts();
    this.fetchNetwork();
    this.initPoll();
    this.initNetworkPoll();
  }

  /**
   * Init web3/account polling, and prevent duplicate interval.
   * @return {void}
   */
  initPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, ONE_SECOND);
    }
  }

  /**
   * Init network polling, and prevent duplicate intervals.
   * @return {void}
   */
  initNetworkPoll() {
    if (!this.networkInterval) {
      this.networkInterval = setInterval(this.fetchNetwork, ONE_MINUTE);
    }
  }

  /**
   * Update state regarding the availability of web3 and an ETH account.
   * @return {void}
   */
  fetchAccounts() {
    const { web3 } = global.window;

    web3 &&
      web3.eth &&
      web3.eth.getAccounts((err, accounts) => {
        if (!this.state.accountsLoaded) {
          return this.setState({
            accountsLoaded: true,
          });
        }

        if (err) {
          console.log(err);

          return this.setState({
            ...this.state,
            accountsError: err,
          });
        } else {
          return this.handleAccounts(accounts);
        }
      });
  }

  handleAccounts(accounts) {
    let next = accounts && accounts[0];
    let curr = this.state.accounts && this.state.accounts[0];
    next = next && next.toLowerCase();
    curr = curr && curr.toLowerCase();

    if (curr !== next) {
      const cookieToParse = window.document.cookie;
      if (!cookieToParse) return {};
      const userId = cookie.parse(cookieToParse)["USER_ID"];

      this.setState({
        ...this.state,
        accountsError: null,
        accounts,
      });

      if (userId && userId !== next) {
        return this.setState({
          ...this.state,
          accountsError: "Wrong metamask account",
        });
      }

      if (!userId && next) {
        return this.setState({
          ...this.state,
          accountsError: `${userIdTrim(next.substring(2))} Disconnected`,
        });
      }
    }
  }

  /**
   * Get the network and update state accordingly.
   * @return {void}
   */
  fetchNetwork() {
    const { web3 } = window;

    web3 &&
      web3.version &&
      web3.version.getNetwork((err, netId) => {
        const networkId = parseInt(netId, 10);
        if (err) {
          return this.setState({
            ...this.state,
            networkError: err,
          });
        } else {
          if (networkId !== this.state.networkId) {
            return this.setState({
              ...this.state,
              networkError: null,
              networkId,
            });
          }
        }
      });
  }

  render() {
    if (!global.window) return <Loading />;

    const { web3 } = global.window;
    const { accounts, accountsLoaded, networkId } = this.state;
    const currentNetworkName = networkNames[networkId]
      ? networkNames[networkId]
      : networkId;

    if (!web3) {
      return <Web3Unavailable />;
    }

    if (networkId && supportedNetworkIds.indexOf(networkId) < 0) {
      return <UnsupportedNetwork currentNetworkName={currentNetworkName} />;
    }

    if (!accountsLoaded) {
      return <Loading />;
    }

    if (accounts && accounts.length < 1) {
      return (
        <AccountDetails
          currentNetworkName={currentNetworkName}
          accountsError={"Locked Wallet"}
        />
      );
    } else {
      return (
        <AccountDetails
          account={accounts && accounts[0]}
          currentNetworkName={currentNetworkName}
          accountsError={this.state.accountsError}
          networkError={this.state.networkError}
        />
      );
    }
  }
}

export default Web3Status;
