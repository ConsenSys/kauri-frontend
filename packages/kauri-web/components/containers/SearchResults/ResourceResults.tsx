import React from "react";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import SearchCategory from "../../../../kauri-components/components/SearchResults/SearchCategory";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import { Title2 } from "../../../../kauri-components/components/Typography";
import Empty from "../PublicProfile/Empty";

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const ResourceSection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const ResourceRow = styled.div`
  display: flex;
  width: 933px;
  height: 190px;
  background-color: ${props => props.theme.colors.white};
`;

const CenterContent = styled.div`
  display: flex;
  min-width: 1280px;
  justify-content: center;
`;

interface IProps {
  totalElementsBreakdown: IElementsBreakdown;
}

const searchCategories = ["ARTICLE", "COLLECTION", "COMMUNITY"];

class ResourceResults extends React.Component<IProps> {
  render() {
    return (
      <ContentSection gridAutoFlow={["", "column"]}>
        <CategorySection>
          {Object.values(this.props.totalElementsBreakdown).filter(
            amount => amount > 0
          ).length ? (
            Object.keys(this.props.totalElementsBreakdown)
              .filter(
                category =>
                  searchCategories.includes(category) &&
                  this.props.totalElementsBreakdown[category] > 0
              )
              .sort()
              .map(category => (
                <SearchCategory
                  active={true}
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
        {Object.values(this.props.totalElementsBreakdown).filter(
          amount => amount > 0
        ).length ? (
          <ResourceSection>
            <ResourceRow />
            <ResourceRow />
            <ResourceRow />
            <ResourceRow />
          </ResourceSection>
        ) : null}
      </ContentSection>
    );
  }
}

export default ResourceResults;
