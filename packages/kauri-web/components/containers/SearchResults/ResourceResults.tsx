import React from "react";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import SearchCategory from "../../../../kauri-components/components/SearchResults/SearchCategory";

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

class ResourceResults extends React.Component {
  render() {
    return (
      <ContentSection gridAutoFlow={["", "column"]}>
        <CategorySection>
          <SearchCategory active={true} category={"article"} amount={4} />
          <SearchCategory active={true} category={"article"} amount={4} />
          <SearchCategory active={true} category={"article"} amount={4} />
        </CategorySection>
        <p>hello world</p>
      </ContentSection>
    );
  }
}

export default ResourceResults;
