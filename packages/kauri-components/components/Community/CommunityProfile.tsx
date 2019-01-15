import * as React from "react";
import { Title2 } from "../Typography";
import styled from "../../lib/styled-components";
import ShareArticle from "../Tooltip/ShareArticle";
import CommunityAvatar from "./CommunityAvatar";

const CommunityProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > :last-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const capitalize = (stringPayload: string) => {
  return stringPayload.charAt(0).toUpperCase() + stringPayload.slice(1);
};

const stripWebsite = (website: string | null) =>
  website && website.includes("://") ? website.split("://")[1] : website;

const getCommunity = (communityName: string) =>
  communityName === "metamask" ? "MetaMask" : capitalize(communityName);

interface IProps {
  avatar: string | null;
  hostName: string;
  id: string;
  name: string;
  website: string | null;
}

const Container: React.SFC<IProps> = ({
  avatar,
  website,
  name,
  hostName,
  id,
}) => {
  return (
    <CommunityProfileSection>
      <CommunityAvatar avatar={avatar} />
      <Title2 textTransform="capitalize" color="white">
        {getCommunity(name)}
      </Title2>
      <Website>{stripWebsite(website)}</Website>
      <ShareArticle
        color={"white"}
        title={capitalize(name)}
        url={`https://${hostName.replace("api.", "")}/community/${id}`}
      />
    </CommunityProfileSection>
  );
};

const Website = styled.span`
  color: white;
  font-weight: 700;
  text-decoration: none;
  :hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export default Container;
