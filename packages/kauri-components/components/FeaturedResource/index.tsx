import * as React from "react";
import styled from "../../lib/styled-components";
import UserAvatarComponent, {
  IProps as UserAvatarComponentProps,
} from "../UserAvatar";
import { Label, Title2, BodyCard } from "../Typography";
import TagList from "../Tags/TagList";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import Stack from "stack-styled";
import TextTruncate from "react-text-truncate";

const ResourceDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const ViewContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FeaturedResourceStack = styled(Stack)`
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
  background: white;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: ${props => props.theme.space[3]}px
      ${props => props.theme.space[2]}px;
    grid-auto-flow: row;
    ${ViewContainer} {
      align-items: flex-start;
    }
  }
`;

export const FeaturedResourceContainer = styled.section`
  display: flex;
  background: white;
  flex-direction: row;
  padding: 0px ${props => props.theme.padding};
`;

interface IProps {
  id: string;
  version: string | null;
  title: string;
  description: string;
  tags: string[];
  resourceType: string;
  ownerResourceType: string;
  linkComponent: (
    children: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
}

const FeaturedResource: React.FunctionComponent<
  IProps & UserAvatarComponentProps
> = props => (
  <FeaturedResourceStack
    width={"100%"}
    alignItems={[""]}
    justifyContent={[""]}
    gridAutoFlow={["column"]}
    gap={30}
  >
    <ResourceDetailsContainer>
      <Label>Featured</Label>
      {props.linkComponent(
        <React.Fragment>
          <Title2>
            <TextTruncate line={2} truncateText="…" text={props.title} />
          </Title2>
          <BodyCard>
            <TextTruncate line={2} truncateText="…" text={props.description} />
          </BodyCard>
        </React.Fragment>,
        props.resourceType === "article"
          ? `/article/${props.id}/v${props.version}`
          : props.resourceType === "collection"
          ? `/collection/${props.id}`
          : `/community/${props.id}`
      )}
      <TagList maxTags={3} color="textPrimary" tags={props.tags} />
      {props.linkComponent(
        <UserAvatarComponent
          userId={props.userId}
          username={props.username}
          avatar={props.avatar}
        />,
        props.ownerResourceType === "COMMUNITY"
          ? `/community/${props.userId}`
          : `/public-profile/${props.userId}`
      )}
    </ResourceDetailsContainer>
    <ViewContainer>
      {props.linkComponent(
        <SecondaryButtonComponent border="primary" color="textPrimary">{`View ${
          props.resourceType
        }`}</SecondaryButtonComponent>,
        props.ownerResourceType === "COMMUNITY"
          ? `/community/${props.userId}`
          : `/public-profile/${props.userId}`
      )}
    </ViewContainer>
  </FeaturedResourceStack>
);

export default FeaturedResource;
