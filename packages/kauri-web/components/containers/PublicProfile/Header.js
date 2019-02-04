// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import anchorme from "anchorme";
import { PrimaryButton } from "../../../../kauri-components/components/Button";
import StatisticsContainer from "../../../../kauri-components/components/PublicProfile/StatisticsContainer.tsx";
import SocialWebsiteIcon from "../../../../kauri-components/components/PublicProfile/SocialWebsiteIcon.tsx";

import type { HeaderProps } from "./types";

const PublicProfileHeader = styled.div`
  background-color: #1e2428;
  display: flex;
  color: white;
  padding: 2.5em ${props => props.theme.padding};

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Avatar = styled.div`
  background: ${props =>
    props.avatar ? `url(${props.avatar}) center center` : "#0ba986"};
  background-size: cover;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-size: ${props => props.theme && props.theme.fontSizes[5]}px;
  font-weight: 700;
  margin-right: ${props => props.theme.space[2]}px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  h3,
  span {
    color: white;
    opacity: 1;
  }
`;

const Details = styled.div`
  font-size: ${props => props.theme && props.theme.fontSizes[props.size]}px;
  font-weight: ${props => props.weight || 400};
  color: white;
  margin-bottom: ${props => props.theme.space[1]}px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  @media (max-width: 700px) {
    align-items: center;
  }
`;

const StyledButton = styled(PrimaryButton)`
  margin-left: ${props => props.theme.space[3]}px;
  margin-right: ${props => props.theme.space[1]}px;
  align-self: center;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  & > a {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

const getURL = (string, type) => {
  const split = string.split("/");
  switch (type) {
    case "website":
      const url = anchorme(string, { list: true })[0];
      return `${url && `${url.protocol}${url.encoded}`}`;
    case "twitter":
      return `https://www.twitter.com/${split[split.length - 1]}`;
    case "github":
      return `https://www.github.com/${split[split.length - 1]}`;
    default:
      return "";
  }
};

const ProfileHeader = ({
  id,
  avatar,
  title,
  username,
  name,
  website,
  github,
  twitter,
  currentUser,
  collections,
  articles,
  toggleEditing,
}: HeaderProps) => (
  <PublicProfileHeader>
    <Avatar avatar={avatar}>
      {avatar ? "" : (name || id).substring(0, 1).toUpperCase()}
    </Avatar>
    <DetailsContainer>
      {username || name ? (
        <Fragment>
          {username && (
            <Details weight={700} size={2}>
              @{username}
            </Details>
          )}
          {name && (
            <Details weight={500} size={5}>
              {name}
            </Details>
          )}
        </Fragment>
      ) : (
        id && (
          <Details weight={700} size={5}>
            {id}
          </Details>
        )
      )}
      {title && <Details size={2}>{title}</Details>}
      <Links>
        {github && (
          <SocialWebsiteIcon
            brand="github"
            height={20}
            socialURL={getURL(github, "github")}
          />
        )}
        {twitter && (
          <SocialWebsiteIcon
            brand="twitter"
            height={20}
            socialURL={getURL(twitter, "twitter")}
          />
        )}
        {website && (
          <a target="_blank" href={getURL(website, "website")}>
            <Details size={1}>{website}</Details>
          </a>
        )}
      </Links>
    </DetailsContainer>
    <RightSide>
      {(articles > 0 || (collections && collections.length > 0)) && (
        <StatisticsContainer
          statistics={[
            {
              name: "Articles",
              count: articles,
            },
            {
              name: "Collections",
              count: collections.length,
            },
          ]}
        />
      )}
    </RightSide>
    {id === currentUser && (
      <StyledButton onClick={() => toggleEditing()}>Edit Profile</StyledButton>
    )}
  </PublicProfileHeader>
);

export default ProfileHeader;
