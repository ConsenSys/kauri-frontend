import * as React from "react";
import styled from "../../lib/styled-components";
import ResourceRow from "../SearchResults/ResourceRowWithImage"; // IProps as ResourceRowProps,
import { UserAgent } from "@quentin-sommer/react-useragent";
import { Title2 } from "../Typography";
import { RenderCardContent } from "../CuratedLists";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px ${props => props.theme.padding};
`;

const ResourceRowContainer = styled(Container)`
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  // content: ResourceRowProps[] | null;
  // content: ResourceRowProps[];
  content: any[];
  Link: React.ReactNode;
}

const RenderMobileFeaturedContent: React.FunctionComponent<IProps> = props => (
  <ResourceRowContainer>
    <Title2>Featured Content</Title2>
    {props.content.map(
      RenderCardContent({ fromAdmin: false, Link: props.Link })
    )}
  </ResourceRowContainer>
);

const RenderDesktopFeaturedContent: React.FunctionComponent<IProps> = props => (
  <ResourceRowContainer>
    <Title2>Featured Content</Title2>
    {props.content.map(resource => (
      <ResourceRow
        {...resource}
        imageURL={
          resource && resource.attributes && resource.attributes.background
        }
      />
    ))}
  </ResourceRowContainer>
);

const FeaturedContent: React.FunctionComponent<IProps> = props => (
  <Container>
    <UserAgent mobile={true}>
      {uaIsMobile =>
        uaIsMobile ? (
          <RenderMobileFeaturedContent {...props} />
        ) : (
          <RenderDesktopFeaturedContent {...props} />
        )
      }
    </UserAgent>
  </Container>
);

export default FeaturedContent;
