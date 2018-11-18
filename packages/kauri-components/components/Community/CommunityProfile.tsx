import * as React from "react";
import * as t from "io-ts";
import { Title2 } from "../Typography";
import { failure } from "io-ts/lib/PathReporter";
import styled from "../../lib/styled-components";
import ShareArticle from "../Tooltip/ShareArticle";

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

const stripWebsite = (website: string) =>
  website.includes("://") ? website.split("://")[1] : website;

const getCommunity = (communityName: string) =>
  communityName === "metamask" ? "MetaMask" : capitalize(communityName);

const RuntimeProps = t.interface({
  hostName: t.string,
  id: t.string,
  name: t.string,
  website: t.string,
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  const { id, hostName, name, website } = RuntimeProps.decode(props).getOrElseL(
    errors => {
      throw new Error(failure(errors).join("\n"));
    }
  );

  return (
    <CommunityProfileSection>
      {/* CommunityAvatar */}
      <Title2 textTransform="capitalize" color="white">
        {getCommunity(name)}
      </Title2>
      <Website>{stripWebsite(website)}</Website>
      <ShareArticle
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
