import React from "react";
import withPagination from "../../../../lib/with-pagination";
import ContentSection from "../../../../../kauri-components/components/Section/ContentSection";
import CategorySection from "../../../../../kauri-components/components/Section/CategorySection";
import ResourceCategory from "../../../../../kauri-components/components/ResourceCategory";
import Drafts from "../Drafts/View";
import Awaiting from "../Awaiting/View";
import Pending from "../Pending/View";
import Transfers from "../../../../../kauri-components/components/Transfers";
import styled from "../../../../lib/styled-components";

const categories = [
  "drafts",
  "awaiting approval",
  "submitted updates",
  // "communities",
];

const queriesMatch: { [key: string]: string } = {
  "awaiting approval": "approvalsQuery",
  drafts: "draftsQuery",
  "pending transfers": "transfersQuery",
  "submitted updates": "pendingQuery",
};

const ManageContentSection = styled.section`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
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

  if (
    props.transfersQuery.getArticleTransfers &&
    props.transfersQuery.getArticleTransfers.content.length > 0 &&
    categories.indexOf("pending transfers") === -1
  ) {
    categories.push("pending transfers");
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
              props[queriesMatch[category]].getArticleTransfers
                ? props[queriesMatch[category]].getArticleTransfers
                    .totalElements
                : props[queriesMatch[category]].searchArticles.totalElements
            }
            onClick={() => setState({ currentCategory: category })}
          />
        ))}
      </CategorySection>
      {state.currentCategory === "drafts" && (
        <Drafts {...props} data={props.draftsQuery} />
      )}
      {state.currentCategory === "awaiting approval" && (
        <Awaiting {...props} data={props.approvalsQuery} />
      )}
      {state.currentCategory === "submitted updates" && (
        <Pending {...props} data={props.pendingQuery} />
      )}
      {state.currentCategory === "pending transfers" && (
        <Transfers
          {...props}
          data={props.transfersQuery.getArticleTransfers.content}
        />
      )}
    </ManageContentSection>
  );
};

export default withPagination(Manage, "searchArticles");
