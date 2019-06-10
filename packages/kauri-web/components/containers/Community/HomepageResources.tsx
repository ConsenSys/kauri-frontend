import * as React from "react";
import styled from "../../../lib/styled-components";
import { getCommunity_getCommunity_homepage } from "../../../queries/__generated__/getCommunity";
import CommunityHomepageEmptyState from "./EmptyStates/Homepage";
import { routeChangeAction as routeChange } from "../../../lib/Module";

interface IProps {
  isCommunityAdmin: boolean;
  homepage: Array<getCommunity_getCommunity_homepage | null> | null;
  id: string;
  routeChangeAction: typeof routeChange;
}

const CommunityHomepageContent: React.FunctionComponent<
  Pick<IProps, "homepage">
> = ({ homepage }) => (
  <p>Show homepage content here: {JSON.stringify(homepage, null, 2)}</p>
);

const HomepageResources: React.FunctionComponent<IProps> = ({
  homepage,
  id,
  isCommunityAdmin,
  routeChangeAction,
}) => {
  if (Array.isArray(homepage) && homepage.length) {
    return <CommunityHomepageContent homepage={homepage} />;
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
