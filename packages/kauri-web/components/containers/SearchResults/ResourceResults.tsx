import React from "react";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import SearchCategory from "../../../../kauri-components/components/SearchResults/SearchCategory";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import { Title2 } from "../../../../kauri-components/components/Typography";
import Empty from "../PublicProfile/Empty";
import Loading from "../../common/Loading";
import { searchResultsAutocomplete_searchAutocomplete_content } from "../../../queries/__generated__/searchResultsAutocomplete";

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

const CenterContent = styled.div`
  display: flex;
  min-width: 1280px;
  justify-content: center;
`;

interface IProps {
  totalElementsBreakdown: IElementsBreakdown;
  loading: boolean;
  results: searchResultsAutocomplete_searchAutocomplete_content[];
}

const searchCategories = ["ARTICLE", "COLLECTION", "COMMUNITY"];

class ResourceResults extends React.Component<IProps> {
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
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
            {Array.isArray(this.props.results) &&
              this.props.results.map(resource => {
                if (resource) {
                  switch (
                    resource.resourceIdentifier &&
                      resource.resourceIdentifier.type
                  ) {
                    case "COMMUNITY":
                      return <p>Community</p>;
                    case "ARTICLE":
                      return <p>ARTICLE</p>;
                    case "COLLECTION":
                      return <p>COLLECTION</p>;
                    default:
                      return null;
                  }
                }
                return null;
              })}
          </ResourceSection>
        ) : null}
      </ContentSection>
    );
  }
}

export default ResourceResults;
