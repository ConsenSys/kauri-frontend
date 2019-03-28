import React from "react";
import withPagination from "../../../../lib/with-pagination";
import ContentSection from "../../../../../kauri-components/components/Section/ContentSection";
import CategorySection from "../../../../../kauri-components/components/Section/CategorySection";
import ResourceCategory from "../../../../../kauri-components/components/ResourceCategory";
import Drafts from '../Drafts/View'
import Awaiting from '../Awaiting/View'
import Pending from '../Pending/View'

const categories = [
  "drafts",
  "awaiting approval",
  "submitted updates",
  // "communities",
];

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

  return (
    <ContentSection gridAutoFlow={["", "column"]}>
      <CategorySection>
        {categories.map(category => (
          <ResourceCategory
            key={category}
            active={category === state.currentCategory}
            category={category}
            amount={3}
            onClick={() => setState({ currentCategory: category })}
          />
        ))}
      </CategorySection>
      {state.currentCategory === 'drafts' && (
          <Drafts
            {...props}
            data={props.draftsQuery}
          />
        ) 
      }
      {state.currentCategory === 'awaiting approval' && (
          <Awaiting
            {...props}
            data={props.approvalsQuery}
          />
        ) 
      }
      {state.currentCategory === 'submitted updates' && (
          <Pending
            {...props}
              data={props.pendingQuery}
          />
        ) 
      }
    </ContentSection>
  );
};

export default withPagination(Manage, "searchArticles");
