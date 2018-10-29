import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dropdown from './common/dropdown'
import { withRouter } from 'react-router-dom';

const NavBar = styled.div`
    padding: 16px;
    background-color: #1E2428;
    color: white;
    display: flex;
    align-items: center;
`;

const StyledLink = styled(Link)`
    color: white;
    padding: 0px 16px;
    transition: all 0.2s;
    cursor: pointer;
    text-transform: uppercase;

    &:hover, &:active, &:focus {
        color: #0BA986;
        text-decoration: none;
    }
`;

const Header = props =>
    <NavBar>
        <img src="./images/logo.svg" alt="kauri-logo" />
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/curated-lists">Homepage</StyledLink>
        <StyledLink to="/collections">Collections</StyledLink>
        <StyledLink to="/config">Settings</StyledLink>
        <Dropdown header="Legacy" list={[{
            name: 'Signer ', action: () => props.history.push('/signer')
        }, {
            name: 'Authenticator', action: () => props.history.push('/authenticator')
        }, {
            name: 'Transaction Receipt', action: () => props.history.push('/transactionReceipt')
        }, {
            name: 'Faucet', action: () => props.history.push('/faucet')
        }, {
            name: 'Article Submission', action: () => props.history.push('/submission')
        }, {
            name: 'Article Migration', action: () => props.history.push('/migration')
        }, {
            name: 'Topics', action: () => props.history.push('/topics')
        }]} />
    </NavBar>;

export default withRouter(Header);