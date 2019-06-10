import * as React from "react";
import styled from "../../../lib/styled-components";
import { getCommunity_getCommunity_homepage } from "../../../queries/__generated__/getCommunity";
import CommunityHomepageEmptyState from "./EmptyStates/Homepage";

const Container = styled.section``;

interface IProps {
  isCommunityAdmin: boolean;
  homepage: Array<getCommunity_getCommunity_homepage | null> | null;
}

const CommunityHomepageContent: React.FunctionComponent<
  Pick<IProps, "homepage">
> = ({ homepage }) => (
  <p>Show homepage content here: {JSON.stringify(homepage, null, 2)}</p>
);

const HomepageResources: React.FunctionComponent<IProps> = ({
  homepage,
  isCommunityAdmin,
}) => (
  <Container>
    {Array.isArray(homepage) && homepage.length && (
      <CommunityHomepageContent homepage={homepage} />
    )}
    {((Array.isArray(homepage) && !homepage.length) || !homepage) &&
      isCommunityAdmin && <CommunityHomepageEmptyState />}
  </Container>
);

export default HomepageResources;
