//@flow
import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../../../kauri-components/components/Button';
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs';
import type { HeaderState, HeaderProps } from './types';

const PublicProfileHeader = styled.div`
    background-color: #1e2428;
    display: flex;
    color: white;
    padding: 2.5em calc((100vw - 1280px) / 2);

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
    }
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
    margin-right: ${props => props.theme.space[2]}px;
    margin-bottom: ${props => props.theme.space[3]}px;
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    h3, span {
        color: white;
        opacity: 1;
    }
`;

const Details = styled.div`
    font-size: ${props => props.theme.fontSizes[props.size]}px;
    font-weight: ${props => props.weight || 400};
    color: white;
    margin-bottom: ${props => props.theme.space[1]}px;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    @media (max-width: 700px) {
        align-items: center;
    }
`;

const StyledButton = styled(PrimaryButton)`
    margin: ${props => props.theme.space[3]}px;
    align-self: center;
`;


const ProfileHeader = ({ id, avatar, title, username, name, website, github, twitter, currentUser, collections, articles, toggleEditing }: HeaderProps) =><PublicProfileHeader>
<Avatar avatar={avatar}>{avatar ? '' : (name || id).substring(0,1).toUpperCase()}</Avatar>
<DetailsContainer>
    {username && <Details weight={700} size={2}>@{username}</Details>}
    {name && <Details weight={500} size={5}>{name}</Details>}
    {title && <Details size={2}>{title}</Details>}
    {website && <Details>{website}</Details>}
    {github && <Details size={2}>{github}</Details>}
    {twitter && <Details>{twitter}</Details>}
</DetailsContainer>
<RightSide>
    {articles && collections &&
        <StatisticsContainer
            statistics={[{
                name: 'Articles',
                count: articles.length
            }, {
                name: 'Collections',
                count: collections.length
            }]}/>}
</RightSide>
{id === currentUser && <StyledButton onClick={() => toggleEditing()}>Edit Profile</StyledButton>}
</PublicProfileHeader>;



export default ProfileHeader; 