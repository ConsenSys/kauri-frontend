import React from "react";
import styled from "styled-components";
import moment from "moment";
import { CreateRequestSecondaryHeader as ApprovedArticleSecondaryHeader } from "../../common/Legacy/CreateRequestSecondaryHeader";
import { TagList } from "../../../../kauri-components/components/Tags";
import {
  Label,
  Title1,
} from "../../../../kauri-components/components/Typography";
import theme from "../../../lib/theme-config";
import Image from "../../../../kauri-components/components/Image";

const ApproveArticleHeader = styled(ApprovedArticleSecondaryHeader)`
  display: flex;
  position: relative;
  padding: 0;
  margin-top: -76px;
  height: inherit;
  @media (max-width: 700px) {
    max-height: 90vh;
  }
  @media (min-width: 700px) {
    max-height: 300px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  align-self: center;
  padding: ${props => props.theme.space[4] + 40}px
    ${props => props.theme.padding} ${props => props.theme.space[4]}px;
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

interface IProps {
  id: string;
  datePublished: string;
  dateCreated: string;
  title: string;
  attributes: any;
  status: string;
  tags: Array<string | null>;
  ownerId: string;
  authorId: string;
  userAvatar: string;
  username: string;
  routeChangeAction: (route: string) => void;
}

export default ({
  datePublished,
  dateCreated,
  title,
  attributes,
  tags,
  routeChangeAction,
}: IProps) => (
  <ApproveArticleHeader type="article" theme={theme}>
    {attributes && attributes.background && (
      <Image
        asBackground={true}
        height="100%"
        width="100%"
        overlay={attributes.background && { opacity: 0.8 }}
        image={attributes.background}
      />
    )}
    <InfoContainer>
      <Label color="white">
        {`CREATED ${moment(datePublished || dateCreated).format(
          "DD MMM YYYY HH:mm"
        )}`}
      </Label>
      <Title1 color="white">{title}</Title1>
      {tags && (
        <TagList
          routeChangeAction={routeChangeAction}
          color={"white"}
          maxTags={7}
          tags={tags}
        />
      )}
    </InfoContainer>
  </ApproveArticleHeader>
);
