// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import anchorme from "anchorme";
import { PrimaryButton } from "../../../../kauri-components/components/Button";
import StatisticsContainer from "../../../../kauri-components/components/PublicProfile/StatisticsContainer.tsx";
import SocialWebsiteIcon from "../../../../kauri-components/components/PublicProfile/SocialWebsiteIcon.tsx";
import UserAvatar from "../../../../kauri-components/components/UserAvatar";
import Helmet from "react-helmet";
import type { HeaderProps } from "./types";

const PublicProfileHeader = styled.div`
  background-color: #1e2428;
  display: flex;
  color: white;
  padding: 2.5em ${props => props.theme.padding};

  @media (min-width: 700px) {
    > div:first-child {
      margin-right: ${props => props.theme.space[2]}px;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media (min-width: 700px) {
    > :first-child {
      margin-bottom: ${props => props.theme.space[3]}px;
    }
    margin-right: ${props => props.theme.space[4]}px;
  }

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
  align-self: center;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  & > a {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

const Avatar = styled.div`
  background: #0ba986;
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
  hostName,
}: HeaderProps) => (
  <PublicProfileHeader>
    <Helmet>
      <title>{`Kauri - ${name || (username && `@${username}`) || id}`}</title>
      <meta name="description" content={`${title}`} />
      <meta
        name="keywords"
        content={typeof title === "string" && title.split(" ")}
      />
      <meta
        property="og:title"
        content={`Kauri - ${name || (username && `@${username}`) || id}`}
      />
      <meta property="og:site_name" content="kauri.io" />
      <meta
        property="og:url"
        content={`https://${hostName}/public-profile/${id}`}
      />
      <meta property="og:description" content={`${title}`} />
      <meta property="og:type" content="public profile" />
      <meta property="og:image" content={avatar} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:site"
        content={`https://${hostName}/public-profile/${id}`}
      />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={title} />
      <meta name="twitter:creator" content="@kauri_io" />
      <meta name="twitter:image" content={avatar} />
    </Helmet>
    {avatar ? (
      <UserAvatar
        hideUsername
        borderRadius="4px" height={100} width={100} avatar={avatar}
      >
        {avatar ? "" : (name || id).substring(0, 1).toUpperCase()}
      </UserAvatar>
    ) : (
      <Avatar>{(name || id).substring(0, 1).toUpperCase()}</Avatar>
    )}
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
      {id === currentUser && (
        <StyledButton onClick={() => toggleEditing()}>Edit Profile</StyledButton>
      )}
    </RightSide>
  </PublicProfileHeader>
);

export default ProfileHeader;
