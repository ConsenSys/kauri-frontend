import React, { Component } from 'react';
import styled from 'styled-components';
import EditProfile from '../../common/EditProfile';
import { PrimaryButton, TertiaryButton } from '../../../../kauri-components/components/Button';
import Loading from '../../common/Loading';
import nextRoutes from 'next-routes'
const Router = nextRoutes().Router

const Page = styled.div`
    display: flex;
    background: ${props => props.theme.bgPrimary};
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: ${props => props.theme.space[3]}px;
    width: 300px;
    justify-content: space-between;
`;

class OnboardingEditProfile extends Component {
    // componentDidMount() {
    //     const { name, username, email, avatar, social: {github, twitter}, title, website } = this.props.user;
    //     if (name || username || email || avatar || githiub || twitter || title || website) this.redirect();
    // }
    handleSubmit() {
        this.login.getWrappedInstance().getWrappedInstance().saveUser();
        this.redirect();
    }

    redirect () {
        if (Router.router && Router.router.query.r) {
            Router.push('/'+ Router.router.query.r);
        } else if (Router.router) {
            Router.push(`/public-profile/${window.web3.eth.accounts[0].substring(2)}`);
        }
    }

    render () {
        const { name, username, email, avatar, social: {github, twitter}, title, website } = this.props.user;
        const hasData = name || username || email || avatar || githiub || twitter || title || website;
        if (hasData) this.redirect();
        if (hasData) return <Page><Loading /></Page>
        return (
            <Page>
                <Wrapper>
                    <EditProfile ref={ comp => this.login = comp} />
                </Wrapper>
                <ButtonWrapper>
                    <TertiaryButton onClick={() => this.redirect()}>
                        Skip
                    </TertiaryButton>
                    <PrimaryButton onClick={() => this.handleSubmit()}>
                        Next
                    </PrimaryButton>
                </ButtonWrapper>
            </Page>
        );
    }
};

export default OnboardingEditProfile;