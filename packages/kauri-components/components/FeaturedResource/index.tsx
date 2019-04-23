import * as React from "react";
import styled from "../../lib/styled-components";
import UserAvatarComponent, {
  IProps as UserAvatarComponentProps,
} from "../UserAvatar";
import { Label, Title2, BodyCard } from "../Typography";
import TagList from "../Tags/TagList";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import TextTruncate from "react-text-truncate";

const ContentSection = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    flex-direction: column;
    > :first-child {
      margin-bottom: ${props => props.theme.space[3]}px;
    }
  }
  ${props => props.theme.padContent};
`;

const ResourceDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 3;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const ViewContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const FeaturedResourceContainer = styled.div`
  display: flex;
  width: 100%;
  background: white;
  flex-direction: column;
  padding: ${props => props.theme.space[3]}px 0px;
  background: white;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: ${props => props.theme.space[3]}px
      ${props => props.theme.space[2]}px;
    ${ViewContainer} {
      align-items: flex-start;
    }
  }
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
  <FeaturedResourceContainer>
    <ContentSection>
      <ResourceDetailsContainer>
        <Label>Featured</Label>
        {props.linkComponent(
          <React.Fragment>
            <Title2>
              <TextTruncate line={2} truncateText="…" text={props.title} />
            </Title2>
            <BodyCard>
              <TextTruncate
                line={2}
                truncateText="…"
                text={props.description}
              />
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
          <SecondaryButtonComponent
            border="primary"
            color="textPrimary"
          >{`View ${props.resourceType}`}</SecondaryButtonComponent>,
          props.resourceType === "article"
            ? `/article/${props.id}/v${props.version}`
            : props.resourceType === "collection"
            ? `/collection/${props.id}`
            : `/community/${props.id}`
        )}
      </ViewContainer>
    </ContentSection>
  </FeaturedResourceContainer>
);

export default FeaturedResource;
