import * as React from "react";
import styled from "../../../lib/styled-components";
import { getCommunity_getCommunity_homepage } from "../../../queries/__generated__/getCommunity";
import CommunityHomepageEmptyState from "./EmptyStates/Homepage";
import { routeChangeAction as routeChange } from "../../../lib/Module";
import CollectionSection from "../Collection/CollectionSection";
import { openModalAction as openModal } from "../../../../kauri-components/components/Modal/Module";

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 ${props => props.theme.padding};
`;

const CommunityHomepageContent: React.FunctionComponent<
  Pick<
    IProps,
    | "homepage"
    | "isCommunityAdmin"
    | "isLoggedIn"
    | "userId"
    | "openModalAction"
  >
> = ({ homepage, isCommunityAdmin, isLoggedIn, userId, openModalAction }) => (
  <ContentContainer>
    {homepage &&
      homepage.map(
        section =>
          section && (
            <CollectionSection
              key={String(section.name)}
              name={String(section.name)}
              isLoggedIn={isLoggedIn}
              currentUser={userId}
              description={section.description || ""}
              resources={section.resources as any}
              openModalAction={openModalAction}
              isOwnedByCurrentUser={isCommunityAdmin}
            />
          )
      )}
  </ContentContainer>
);

interface IProps {
  isCommunityAdmin: boolean;
  homepage: Array<getCommunity_getCommunity_homepage | null> | null;
  id: string;
  userId: string;
  routeChangeAction: typeof routeChange;
  isLoggedIn: boolean;
  openModalAction: typeof openModal;
}

const HomepageResources: React.FunctionComponent<IProps> = ({
  homepage,
  id,
  isCommunityAdmin,
  routeChangeAction,
  isLoggedIn,
  userId,
  openModalAction,
}) => {
  if (Array.isArray(homepage) && homepage.length) {
    return (
      <CommunityHomepageContent
        isCommunityAdmin={isCommunityAdmin}
        openModalAction={openModalAction}
        userId={userId}
        isLoggedIn={isLoggedIn}
        homepage={homepage}
      />
    );
  } else if (
    ((Array.isArray(homepage) && !homepage.length) || !homepage) &&
    isCommunityAdmin
  ) {
    return (
      <CommunityHomepageEmptyState
        routeChangeAction={routeChangeAction}
        id={id}
      />
    );
  }
  return null;
};

export default HomepageResources;
