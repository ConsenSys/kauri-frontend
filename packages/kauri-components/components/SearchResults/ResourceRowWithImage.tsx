import * as React from "react";
import TextTruncate from "react-text-truncate";
import moment from "moment";
import styled from "../../lib/styled-components";
import UserAvatar from "../UserAvatar";
import { Label, H1, BodyCard } from "../Typography";
import TagList from "../Tags/TagList";
import Image from "../../../kauri-components/components/Image";
import theme from "../../lib/theme-config";

const DEFAULT_CARD_WIDTH = theme.DEFAULT_CARD_WIDTH;

const ResourceRow = styled.div`
  display: flex;
  width: ${props => DEFAULT_CARD_WIDTH * 3 + props.theme.space[3] * 2}px;
  height: 195px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.11);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > *:nth-child(3) {
    margin-bottom: 0px;
  }
`;

const Footer = Content;

const Container = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: ${props => props.theme.space[1]}px ${props => props.theme.space[2]}px;
`;

const Divider = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: ${props => props.theme.space[1]}px;
  background-color: ${props => props.theme.colors.divider};
  height: 2px;
`;

export interface IProps {
  id: string;
  version?: number;
  title: string;
  description: string | null;
  date: string;
  imageURL: string | null;
  tags: string[] | null;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  ownerType: string; // "USER" | "COMMUNITY" | "COLLECTION";
  resourceType: string; // "article" | "community" | "collection"
}

const ResourceRowWithImage: React.SFC<IProps> = props => {
  return (
    <ResourceRow key={props.id}>
      {props.imageURL &&
        props.linkComponent(
          <Image
            width={DEFAULT_CARD_WIDTH}
            height={195}
            image={props.imageURL}
          />,
          props.resourceType === "collection"
            ? `/collection/${props.id}`
            : props.resourceType === "community"
            ? `/community/${props.id}`
            : `/article/${props.id}/v${props.version}`
        )}
      <Container>
        {props.linkComponent(
          <Content>
            <Label>
              {props.ownerType === "COLLECTION"
                ? "Updated " + moment(props.date).format("DD MMM YYYY HH:mm")
                : "Posted " + moment(props.date).format("DD MMM YYYY HH:mm")}
            </Label>
            <H1>
              <TextTruncate line={1} truncateText="…" text={props.title} />
            </H1>
            {props.description && (
              <BodyCard>
                <TextTruncate
                  line={2}
                  truncateText="…"
                  text={props.description}
                />
              </BodyCard>
            )}
            {Array.isArray(props.tags) && props.tags.length > 0 && (
              <TagList maxTags={3} color="textPrimary" tags={props.tags} />
            )}
          </Content>,
          props.resourceType === "collection"
            ? `/collection/${props.id}`
            : props.resourceType === "community"
            ? `/community/${props.id}`
            : `/article/${props.id}/v${props.version}`
        )}
        <Divider />
        <Footer>
          {props.linkComponent(
            <UserAvatar
              imageURL={props.imageURL}
              cardType="ARTICLE"
              fullWidth={true}
              username={props.username}
              userId={props.userId}
              avatar={props.userAvatar}
            />,
            props.ownerType === "COMMUNITY"
              ? `/community/${props.userId}`
              : `/public-profile/${props.userId}`
          )}
        </Footer>
      </Container>
    </ResourceRow>
  );
};

export default ResourceRowWithImage;
