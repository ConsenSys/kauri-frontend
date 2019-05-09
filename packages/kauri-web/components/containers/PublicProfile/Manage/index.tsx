import React from "react";
import withPagination from "../../../../lib/with-pagination";
import CategorySection from "../../../../../kauri-components/components/Section/CategorySection";
import ResourceCategory from "../../../../../kauri-components/components/ResourceCategory";
import Drafts from "../Drafts/View";
import Awaiting from "../Awaiting/View";
import Pending from "../Pending/View";
import Transfers from "../../../../../kauri-components/components/Transfers";
import MyCommunities from "../../../../../kauri-components/components/MyCommunities";
import styled from "../../../../lib/styled-components";
import R from "ramda";

const categories = [
  "drafts",
  "awaiting approval",
  "submitted updates",
  // "communities",
];

const queriesMatch: { [key: string]: string } = {
  drafts: "draftsQuery",
  "pending transfers": "transfersQuery",
};

const ManageContentSection = styled.section`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.paddingTop};
  ${props => props.theme.padContent};
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

interface IState {
  currentCategory: string;
}

const Manage: React.FunctionComponent<
  any & {
    isLoggedIn: boolean;
  }
> = props => {
  const [state, setState] = React.useState<IState>({
    currentCategory: "drafts",
  });

  const communities = R.path(
    ["ownProfile", "getMyProfile", "communities"],
    props
  );
  const transfers = R.path(
    ["transfersQuery", "getArticleTransfers", "content"],
    props
  );

  if (
    (transfers as []).length > 0 &&
    categories.indexOf("pending transfers") === -1
  ) {
    categories.push("pending transfers");
  }
  if (
    (communities as []).length > 0 &&
    categories.indexOf("communities") === -1
  ) {
    categories.push("communities");
  }

  return (
    <ManageContentSection>
      <CategorySection>
        {categories.map(category => (
          <ResourceCategory
            key={category}
            active={category === state.currentCategory}
            category={category}
            amount={
              category === "pending transfers"
                ? (transfers as []).length
                : category === "communities"
                ? (communities as []).length
                : (props[queriesMatch[category]] &&
                    props[queriesMatch[category]].searchArticles &&
                    props[queriesMatch[category]].searchArticles
                      .totalElements) ||
                  0
            }
            onClick={() => setState({ currentCategory: category })}
          />
        ))}
      </CategorySection>
      {state.currentCategory === "drafts" && (
        <Drafts {...props} data={props.draftsQuery} />
      )}
      {state.currentCategory === "awaiting approval" && (
        <Awaiting
          {...props}
          communities={
            Array.isArray(communities) && communities.map(({ id }) => id)
          }
        />
      )}
      {state.currentCategory === "submitted updates" && (
        <Pending
          {...props}
          communities={
            Array.isArray(communities) && communities.map(({ id }) => id)
          }
        />
      )}
      {state.currentCategory === "pending transfers" && (
        <Transfers {...props} data={transfers} />
      )}
      {state.currentCategory === "communities" && (
        <MyCommunities {...props} data={communities} />
      )}
    </ManageContentSection>
  );
};
//
export default withPagination(Manage, "searchArticles");
