import styled from "../../../lib/styled-components";
import moment from "moment";
import { TagList } from "../../../../kauri-components/components/Tags";
import {
  Label,
  Title1,
} from "../../../../kauri-components/components/Typography";
import Image from "../../../../kauri-components/components/Image";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  align-items: center;
  height: 260px;
  margin-top: -76px;
  background: ${props => props.theme.colors.bgPrimary};
  padding: 0 ${props => props.theme.padding};

  & > button {
    margin-left: ${props => props.theme.space[2]}px;
  }

  @media (max-width: 700px) {
    padding: ${props => props.theme.space[3]}px;
    & button {
      display: none;
    }
  }
  @media (min-width: 700px) {
    padding: ${props => props.theme.space[4]}px;
  }
  @media (min-width: 1280px) {
    padding: ${props => `${props.theme.space[4]}px ${props.theme.padding}`};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  align-self: center;
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
  tags: Array<string | null>;
  ownerId: string;
  authorId: string;
  userAvatar: string;
  username: string;
  routeChangeAction: (route: string) => void;
  publishArticleAction: any;
  version: string;
  owner: string;
  contentHash: string;
  userId: string;
}

export default ({
  id,
  version,
  contentHash,
  owner,
  authorId,
  datePublished,
  dateCreated,
  title,
  attributes,
  tags,
  routeChangeAction,
  publishArticleAction,
  userId,
}: IProps) => (
  <HeaderContainer>
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
    <SecondaryButton
      onClick={() =>
        userId
          ? routeChangeAction(`/article/${id}/v${version}/update-article`)
          : routeChangeAction(
              `/login?r=/article/${id}/v${version}/update-article`
            )
      }
      text="Update Draft"
    />
    <PrimaryButton
      onClick={() => {
        const publishArticlePayload = {
          contentHash,
          contributor: authorId,
          dateCreated,
          id,
          owner,
          version,
        };
        publishArticleAction(publishArticlePayload);
      }}
      text="Publish Article"
    />
  </HeaderContainer>
);
