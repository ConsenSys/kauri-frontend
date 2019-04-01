import React from "react";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import ResourceCategory from "../../../../kauri-components/components/ResourceCategory";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import { Title2 } from "../../../../kauri-components/components/Typography";
import Empty from "../PublicProfile/Empty";
import Loading from "../../common/Loading";
import ResourceRows from "./PaginatedResourceResults";
import { searchResultCategories } from "./index";

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const CenterContent = styled.div`
  display: flex;
  min-width: 1280px;
  justify-content: center;
`;

interface IProps {
  totalElementsBreakdown: IElementsBreakdown;
  loading: boolean;
  viewedSearchCategory: string | null | undefined;
  setSearchCategory: (viewedSearchCategory: string) => void;
  query: string;
}

const PaginatedResourceResults: React.FunctionComponent<IProps> = props => (
  <ResourceRows {...props} />
);

class ResourceResults extends React.Component<IProps> {
  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <ContentSection gridAutoFlow={["", "column"]}>
        <CategorySection>
          {Object.keys(this.props.totalElementsBreakdown).filter(
            category =>
              this.props.totalElementsBreakdown[category] > 0 &&
              searchResultCategories &&
              searchResultCategories.includes(category)
          ).length ? (
            Object.keys(this.props.totalElementsBreakdown)
              .filter(
                category =>
                  searchResultCategories &&
                  searchResultCategories.includes(category) &&
                  this.props.totalElementsBreakdown[category] > 0
              )
              .sort()
              .map(category => (
                <ResourceCategory
                  key={category}
                  onClick={() => this.props.setSearchCategory(category)}
                  active={category === this.props.viewedSearchCategory}
                  category={category}
                  amount={this.props.totalElementsBreakdown[category]}
                />
              ))
          ) : (
            <CenterContent>
              <Empty>
                <Title2>No Results found! :(</Title2>
              </Empty>
            </CenterContent>
          )}
        </CategorySection>
        <PaginatedResourceResults {...this.props} />
      </ContentSection>
    );
  }
}

export default ResourceResults;
