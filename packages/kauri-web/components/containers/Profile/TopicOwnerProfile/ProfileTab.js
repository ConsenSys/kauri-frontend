// @flow
import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { CategoryAvatar, CategoryBadge, CategoryName } from '../../OpenRequests/OpenRequest'
import { Helmet } from 'react-helmet'
import Web3 from 'web3'

const web3 = new Web3()

const PersonalDetail = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    &:first-child {
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      color: ${props => props.theme.secondaryTextColor};
    }
    &:last-child {
      font-size: ${props => (props.type === 'address' ? '20px' : '16px')};
      font-weight: 500;
      color: ${props => (props.type === 'address' ? '#0BA986;' : '#1e2428;')};
    }
  }
`

const ProfileHeader = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
`

const ProfileTab = styled.div`
  > :first-child {
    margin-bottom: 20px;
  }
`

const ProfileDetails = styled.div`
  background-color: #f7f7f7;
  padding: 2.5em ${({ theme }) => theme.padding};
`

const ProfileBalance = styled.div`
  padding: 2.5em ${({ theme }) => theme.padding};
`

const BalanceAmount = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5em;
  margin-bottom: 1em;
  > * {
    &:first-child {
      margin-left: 0;
    }
    margin-left: 15px;
  }
`

const EthIcon = styled.div`
  margin-top: 3px;
  height: 24px;
  width: 24px;
  border-radius: 4px;
  background-color: #0ba986;
`

const Funds = styled.h2`
  height: 33px;
  text-align: center;
  line-height: 33px;
  font-weight: bold;
  font-size: 25px;
`
const USDAmount = Funds.extend`
  font-weight: 300;
  color: #1e2428;
`

const WithdrawFundsButton = styled(Button)`
  display: flex;
  height: 40px;
  width: 170px;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  transition: none !important;
  * {
    transition: none !important;
  }
  :hover {
    box-shadow: 0 0 0 2px ${props => props.theme.primaryColor} !important;
    border: none;
    transition: none !important;
  }
`

const ProfileUserDetails = styled.div`
  > :first-child {
    margin-bottom: 30px;
  }
`

const ProfileAddressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 33px;
  margin-bottom: 37px;
`

export default ({
  topics,
  id,
  username,
  email,
  category,
  funds,
  ethUsdPrice,
  withdrawWalletAvailableFundsAction,
}) => (
  <ProfileTab>
    <Helmet>
      <title>Profile</title>
    </Helmet>
    <ProfileDetails>
      <ProfileHeader>Your Profile</ProfileHeader>
      <ProfileAddressContainer>
        {topics && topics.length ? (
          topics.map(category => (
            <CategoryBadge type='profile' key={category} category={category}>
              <CategoryAvatar src={`/static/images/${category}/avatar.png`} alt='logo' />
              <CategoryName>{category}</CategoryName>
            </CategoryBadge>
          ))
        ) : (
          <CategoryBadge type='profile' key={category} category={category}>
            <CategoryAvatar src={`/static/images/kauri/avatar.png`} alt='logo' />
          </CategoryBadge>
        )}
        <PersonalDetail type='address'>
          <span>Address</span>
          <span>{id}</span>
        </PersonalDetail>
      </ProfileAddressContainer>
      {/* <ProfileUserDetails>
        <PersonalDetail>
          <span>Username</span>
          <span>{username}</span>
        </PersonalDetail>
        <PersonalDetail>
          <span>Email</span>
          <span>{email}</span>
        </PersonalDetail>
      </ProfileUserDetails> */}
    </ProfileDetails>
    <ProfileBalance>
      <ProfileHeader>Your Kauri Balance</ProfileHeader>
      <BalanceAmount>
        <EthIcon type='trophy' />
        <Funds>{`${web3.fromWei(funds || 0, 'ether')} ETH`}</Funds>
        <USDAmount>{`$${(web3.fromWei(funds || 0, 'ether') * ethUsdPrice || 0).toFixed(2)}`}</USDAmount>
      </BalanceAmount>
      <WithdrawFundsButton disabled={!funds} onClick={() => withdrawWalletAvailableFundsAction()}>
        Withdraw Funds
      </WithdrawFundsButton>
    </ProfileBalance>
  </ProfileTab>
)
