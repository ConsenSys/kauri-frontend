import React, { useState } from "react";

import styled from "styled-components";
import ResourceCategory from "../../../../kauri-components/components/ResourceCategory";
import DisplayResources from "./DisplayResources";
import ManageMembers from "./ManageMembers";
import {
  getCommunity_getCommunity_pending,
  getCommunity_getCommunity_members,
} from "../../../queries/__generated__/getCommunity";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  &:not(:first-child) {
    flex: 1;
  }
`;

interface IProps {
  communityId: string;
  pending: Array<getCommunity_getCommunity_pending | null> | null;
  members: Array<getCommunity_getCommunity_members | null> | null;
}

const Manage = ({ pending, members, communityId }: IProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const pendingArticles =
    pending && pending.filter(i => i && i.__typename === "ArticleDTO");
  const pendingCollections =
    pending && pending.filter(i => i && i.__typename === "CollectionDTO");

  return (
    <Container>
      <Column>
        <ResourceCategory
          active={tabIndex === 0}
          category="Manage Members"
          amount={members ? members.length : 0}
          onClick={() => setTabIndex(0)}
        />
        <ResourceCategory
          active={tabIndex === 1}
          category="Articles for approval"
          amount={pendingArticles ? pendingArticles.length : 0}
          onClick={() => setTabIndex(1)}
        />
        <ResourceCategory
          active={tabIndex === 2}
          category="Collections for approval"
          amount={pendingCollections ? pendingCollections.length : 0}
          onClick={() => setTabIndex(2)}
        />
      </Column>
      <Column>
        {tabIndex === 0 && <ManageMembers members={members} />}
        {tabIndex === 1 && (
          <DisplayResources
            communityId={communityId}
            resources={pendingArticles}
          />
        )}
        {tabIndex === 2 && (
          <DisplayResources
            communityId={communityId}
            resources={pendingCollections}
          />
        )}
      </Column>
    </Container>
  );
};

export default Manage;
