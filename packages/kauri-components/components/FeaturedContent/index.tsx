import * as React from "react";
import styled from "../../lib/styled-components";
import ResourceRow from "../SearchResults/ResourceRowWithImage"; // IProps as ResourceRowProps,
import { UserAgent } from "@quentin-sommer/react-useragent";
import { Title2 } from "../Typography";
import { RenderCardContent } from "../CuratedLists";
import { HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource } from "../../../kauri-web/queries/__generated__/HomePagev2";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px ${props => props.theme.padding};
`;

const ResourceRowContainer = styled(Container)`
  padding: 0px;
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

const RenderDesktopFeaturedContent: React.FunctionComponent<
  IProps & { Link: React.FunctionComponent<any> }
> = ({ content, Link }) => (
  <ResourceRowContainer>
    <Title2>Featured Content</Title2>
    {content.map(
      ({
        resource,
      }: {
        resource: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource;
      }) => {
        switch (resource.__typename) {
          case "ArticleDTO": {
            return (
              <ResourceRow
                key={String(resource.id)}
                id={String(resource.id)}
                version={Number(resource.version)}
                title={String(resource.title)}
                description={String(resource.description)}
                tags={
                  (resource.tags &&
                    resource.tags.map(tag => (tag ? tag : ""))) ||
                  []
                }
                username={(resource.owner as any).username}
                userId={(resource.owner as any).id}
                userAvatar={(resource.owner as any).avatar}
                date={resource.datePublished}
                ownerType={"USER"}
                linkComponent={(children, route) => (
                  <Link useAnchorTag={true} href={route}>
                    {children}
                  </Link>
                )}
                imageURL={
                  resource &&
                  resource.attributes &&
                  resource.attributes.background
                }
              />
            );
          }

          case "CollectionDTO": {
            return (
              <ResourceRow
                key={String(resource.id)}
                id={String(resource.id)}
                title={String(resource.name)}
                description={String(resource.description)}
                tags={
                  (resource.tags &&
                    resource.tags.map(tag => (tag ? tag : ""))) ||
                  []
                }
                username={(resource.owner as any).username}
                userId={(resource.owner as any).id}
                userAvatar={(resource.owner as any).avatar}
                date={resource.dateUpdated}
                ownerType={"USER"}
                linkComponent={(children, route) => (
                  <Link useAnchorTag={true} href={route}>
                    {children}
                  </Link>
                )}
                imageURL={resource.background}
              />
            );
          }

          default: {
            return null;
          }
        }
      }
    )}
  </ResourceRowContainer>
);

const FeaturedContent: React.FunctionComponent<IProps> = props => (
  <Container>
    <UserAgent mobile={true}>
      {uaIsMobile =>
        uaIsMobile ? (
          <RenderMobileFeaturedContent {...props} />
        ) : (
          <RenderDesktopFeaturedContent
            {...props}
            Link={props.Link as React.FunctionComponent<any>}
          />
        )
      }
    </UserAgent>
  </Container>
);

export default FeaturedContent;
