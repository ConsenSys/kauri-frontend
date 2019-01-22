import * as React from "react";
import TextTruncate from "react-text-truncate";
import moment from "moment";
import styled from "../../lib/styled-components";
import UserAvatar from "../UserAvatar";
import { Label, H1, BodyCard } from "../Typography";
import TagList from "../Tags/TagList";

const ResourceRow = styled.div`
  display: flex;
  width: 933px;
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

interface IRenderDescriptionRowContentProps {
  content: string;
  cardHeight: number;
  imageURL: string | null;
}

const RenderDescriptionRowContent: React.FunctionComponent<
  IRenderDescriptionRowContentProps
> = ({ content, cardHeight, imageURL }) => {
  if (process.env.STORYBOOK !== "true") {
    const DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js")
      .default;
    return React.createElement(
      DescriptionRow,
      { record: { text: content }, type: "article card", cardHeight, imageURL },
      null
    );
  } else {
    return null;
  }
};

interface IProps {
  id: string;
  version: number;
  title: string;
  content: string;
  date: string;
  tags: string[] | null;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  resourceType: "USER" | "COMMUNITY";
}

const Component: React.SFC<IProps> = props => (
  <ResourceRow>
    <Container>
      {props.linkComponent(
        <Content>
          <Label>
            {"Posted " + moment(props.date).format("DD MMM YYYY HH:mm")}
          </Label>
          <H1>
            <TextTruncate line={1} truncateText="…" text={props.title} />
          </H1>
          {props.content.substring(0, 2).includes("{") ? (
            <RenderDescriptionRowContent
              content={props.content}
              cardHeight={290}
              imageURL={null}
            />
          ) : (
            <BodyCard>
              <TextTruncate line={2} truncateText="…" text={props.content} />
            </BodyCard>
          )}
          {Array.isArray(props.tags) && props.tags.length > 0 && (
            <TagList maxTags={3} color="textPrimary" tags={props.tags} />
          )}
        </Content>,
        `/article/${props.id}/v${props.version}`
      )}
      <Divider />
      <Footer>
        {props.linkComponent(
          <UserAvatar
            imageURL={null}
            cardType="ARTICLE"
            fullWidth={true}
            username={props.username}
            userId={props.userId}
            avatar={props.userAvatar}
          />,
          props.resourceType === "COMMUNITY"
            ? `/community/${props.userId}`
            : `/public-profile/${props.userId}`
        )}
      </Footer>
    </Container>
  </ResourceRow>
);

export default Component;