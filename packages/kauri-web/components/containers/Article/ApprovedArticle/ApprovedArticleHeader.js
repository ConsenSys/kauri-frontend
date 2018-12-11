// @flow
import React from "react";
import styled from "styled-components";
import slugify from "slugify";
import moment from "moment";
import { CreateRequestSecondaryHeader as ApprovedArticleSecondaryHeader } from "../../CreateRequestForm/CreateRequestHeader";
import ShareArticle from "../../../../../kauri-components/components/Tooltip/ShareArticle";
import { TagList } from "../../../../../kauri-components/components/Tags";
import {
  Label,
  H5,
  Title1,
} from "../../../../../kauri-components/components/Typography";
import UserAvatar from "../../../../../kauri-components/components/UserAvatar";
import theme from "../../../../lib/theme-config";
import userIdTrim from "../../../../lib/userid-trim";

const ApproveArticleHeader = styled(ApprovedArticleSecondaryHeader)`
  display: flex;
  margin-top: -76px;
  padding-top: 160px;
  padding-bottom: 140px;
  position: relative;
  padding-left: 0;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme && props.theme.colors.bgPrimary};
  opacity: 0.8;
  height: 100%;
  width: 100%;
  position: absolute;
  margin-top: -160px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  align-self: center;
  padding: 0 ${props => props.theme.padding};
  padding-top: ${props => props.theme.space[3]}px;
  z-index: 9;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  @media (max-width: 500px) {
    > * {
      padding-left: ${props => props.theme.space[1]}px;
    }
  }
`;

export const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: ${props => props.theme.space[1]}px;
  align-items: center;
  margin-top: ${props => props.theme.space[2]}px;
  z-index: 9;
`;

const MobileShareContainer = styled.div`
  display: none;
  > * {
    color: white;
    > * {
      color: white;
    }
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    > :first-child {
      margin-bottom: ${props => props.theme.space[2]}px;
    }
    > *:nth-child(2),
    *:nth-child(3) {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export default ({
  id,
  version,
  datePublished,
  dateCreated,
  title,
  attributes,
  status,
  hostName,
  tags,
  ownerId,
  authorId,
  userAvatar,
  username,
}: *) => (
  <ApproveArticleHeader
    style={{
      background:
        attributes && attributes.background
          ? `url(${attributes.background}) center center`
          : "#1E2428",
      backgroundSize: "cover",
    }}
    type="article"
    theme={theme}
  >
    <Overlay />
    <InfoContainer>
      <Label color="white">
        {`POSTED ${moment(datePublished || dateCreated).fromNow()}`}
      </Label>
      <Title1 color="white">{title}</Title1>
      {tags && <TagList color={"white"} maxTags={5} tags={tags} />}
      <MobileShareContainer>
        <ShareArticle
          color="white"
          url={`${hostName.replace(/api\./g, "")}/article/${id}/${slugify(
            title,
            {
              lower: true,
            }
          )}?utm_campaign=read`}
          title={title}
        />
        <Label>{ownerId ? "OWNER" : "AUTHOR"}</Label>
        <UserAvatar
          variant={"white"}
          fullWidth
          imageURL={
            attributes && attributes.background && attributes.background
          }
          username={username ? username : "0x" + ownerId}
          userId={
            (ownerId && userIdTrim(ownerId)) ||
            (authorId && userIdTrim(authorId))
          }
          avatar={userAvatar}
        />
      </MobileShareContainer>
    </InfoContainer>
    {status !== "PUBLISHED" && (
      <PullRight>
        <H5 color="white">{`STATUS ${typeof status === "string" &&
          status.replace(/_/g, " ")}`}</H5>
      </PullRight>
    )}
  </ApproveArticleHeader>
);
