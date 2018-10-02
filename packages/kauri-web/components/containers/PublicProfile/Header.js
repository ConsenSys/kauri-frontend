import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../../../kauri-components/components/Button';
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs';
import userIdTrim from '../../../lib/userid-trim';

const PublicProfileHeader = styled.div`
    height: 300px;
    background-color: #1e2428;
    display: flex;
    align-items: center;
    color: white;
    padding: 2.5em calc((100vw - 1280px) / 2);
`;

const Avatar = styled.div`
    background: ${props => props.avatar ? `url(${props.avatar}) center center`: '#0ba986'};
    background-size: cover;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    font-size: ${props => props.theme.fontSizes[5]}px;
    font-weight: 700;

    @media (max-width: 700px) {
        display: none;
    }
`;

const Address = styled.div`
    font-size: ${props => props.theme.fontSizes[2]}px;
    font-weight: 700;
    color:white;
    margin: ${props => props.theme.space[3]}px;
    flex: 1;
`;

const Stats = styled.div`
    margin-right: 136px;
    h3, span {
        color: white;
        opacity: 1;
    }
`;

const Details = styled.div`
    font-size: ${props => props.theme.fontSizes[1]}px;
    font-weight: 400;
    color:white;
    margin: ${props => props.theme.space[3]}px;
    flex: 1;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Spacer = styled.div`
    display: flex;
    flex: 1;
`;


const ProfileHeader = ({ user, currentUser, collections, articles, toggleEditing }) => <PublicProfileHeader>
<Avatar avatar={user && user.avatar}>{user && user.avatar ? '' : (user.name || user.id).substring(0,1).toUpperCase()}</Avatar>
<DetailsContainer>
    <Address>{user && user.name ?  `@${user.name.toLowerCase()}` : user.id}</Address>
    <Details>{user && user.title}</Details>
    <Details>{user && user.website}</Details>
</DetailsContainer>
<Spacer />
<Stats>
    {articles && collections &&
        <StatisticsContainer
            statistics={[{
                name: 'Articles',
                count: articles.length
            }, {
                name: 'Collections',
                count: collections.length
            }]}/>}
</Stats>
{user.id === currentUser && <PrimaryButton onClick={() => toggleEditing()}>Edit Profile</PrimaryButton>}
</PublicProfileHeader>;



export default ProfileHeader; 