import React from "react";
import withPagination from "../../../../lib/with-pagination";
import ContentSection from "../../../../../kauri-components/components/Section/ContentSection";
import CategorySection from "../../../../../kauri-components/components/Section/CategorySection";
import ResourceCategory from "../../../../../kauri-components/components/ResourceCategory";

const categories = [
  "drafts",
  "awaiting approval",
  "submitted updates",
  "communities",
];

interface IState {
  currentCategory: string;
}

const Manage: React.FunctionComponent<
  any & {
    isLoggedIn: boolean;
  }
> = _ => {
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
    </ContentSection>
  );
};

export default withPagination(Manage, "searchArticles");
