import * as React from "react";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import styled from "../../../lib/styled-components";
import ResourceCategory from "../../../../kauri-components/components/ResourceCategory";
import ManageCommunityEmptyState from "../../../../kauri-components/components/Community/ManageCommunityEmptyState";
import { getCommunity_getCommunity_members } from "../../../queries/__generated__/getCommunity";
import MembersPanel from './MembersPanel'

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

type Category = "manage moderators" | "approve article" | "approve collection";

interface IState {
  category: Category;
}

const categories: Category[] = [
  "manage moderators",
  "approve article",
  "approve collection",
];

interface IProps {
  members: Array<getCommunity_getCommunity_members | null> | null;
  openAddMemberModal: () => void;
}

const ManageCommunity: React.SFC<IProps> = props => {
  const [state, setState] = React.useState<IState>({
    category: "manage moderators",
  });

  return (
    <ContentSection gridAutoFlow={["", "column"]}>
      <CategorySection>
        {categories.map((category: Category) => (
          <ResourceCategory
            key={category}
            onClick={() => setState({ category })}
            active={category === state.category}
            category={category}
            amount={undefined}
          />
        ))}
      </CategorySection>
      {props.members &&
      Array.isArray(props.members) &&
      props.members.length > 0 ? (
        <MembersPanel openAddMemberModal={() => props.openAddMemberModal()} />
      ) : (
        <ManageCommunityEmptyState
          handleClick={() => props.openAddMemberModal()}
        />
      )}
    </ContentSection>
  );
};

export default ManageCommunity;
