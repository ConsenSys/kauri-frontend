import { H3 } from "../Typography";
import styled from "../../lib/styled-components";
import { TagList } from "../Tags";
import Tabs from "../Tabs";
import PrimaryButton from "../Button/PrimaryButton";
import Truncate from "react-truncate-html";
import analytics from "../../../kauri-web/lib/analytics";

export interface IResult {
  description: string;
  name: string;
  score: number;
  tags?: string[] | null;
  resourceIdentifier: {
    type: string;
    id: string;
  };
}

export interface IElementsBreakdown {
  [key: string]: number;
}

interface IProps {
  value: string;
  results: IResult[];
  breakDown: IElementsBreakdown;
  maxResults: number;
  routeChangeAction: (route: string) => void;
  fetchByType: (type: string) => void;
}

const ResultComp = styled.div`
  padding: ${props => props.theme.space[1]}px ${props => props.theme.space[2]}px
    0;
  max-width: 400px;
  width: 100%;
  cursor: pointer;
  color: ${props => props.theme.colors.textPrimary};

  &:hover {
    background: ${props => props.theme.colors.tertiaryBackgroundColor};
  }

  div {
    line-height: normal;
    max-height: 54px;
    white-space: normal;
  }

  & .quickSearchDescription {
    font-size: ${props => props.theme.fontSizes[1]}px;
    > span > span {
      background: ${props => props.theme.colors.primary};
      color: white;
      padding: 0px 2px;
      border-radius: 2px;
    }
  }

  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const SearchComp = styled.div`
  background: white;
  max-width: 400px;
  padding-bottom: ${props => props.theme.space[1]}px;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.11);
  > div > div {
    padding: ${props => props.theme.space[1]}px;
  }
`;

const ResultsComp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > :last-child {
    margin-top: ${props => props.theme.space[1]}px;
    line-height: normal !important;
  }
`;

const getTabs = (breakdown: IElementsBreakdown) =>
  Object.keys(breakdown)
    .filter(tab => breakdown[tab] > 0)
    .sort((a, b) => breakdown[b] - breakdown[a]);

const getRoute = (element: IResult) => {
  switch (element.resourceIdentifier.type) {
    case "ARTICLE":
      return `/article/${element.resourceIdentifier.id}`;
    case "COLLECTION":
      return `/collection/${element.resourceIdentifier.id}`;
    case "COMMUNITY":
      return `/community/${element.resourceIdentifier.id}`;
    case "USER":
      return `/public-profile/${element.resourceIdentifier.id}`;
    default:
      return "/";
  }
};

interface IResultComp {
  key: string;
  result: IResult;
  routeChangeAction: (route: string) => void;
}

const Result = (props: IResultComp) => (
  <ResultComp
    className="quickSearch"
    onClick={() => {
      analytics.track("QuickSearch Clicked", {
        category: "generic",
      });
      props.routeChangeAction(getRoute(props.result));
    }}
  >
    <H3>
      <div
        className="quickSearchTitle"
        dangerouslySetInnerHTML={{ __html: props.result.name }}
      />
    </H3>
    <div className="quickSearchDescription">
      <Truncate
        lines={4}
        dangerouslySetInnerHTML={{ __html: props.result.description }}
      />
    </div>
    {props.result.tags && (
      <TagList color="textPrimary" tags={props.result.tags} maxTags={3} />
    )}
  </ResultComp>
);

interface ISearchResults {
  routeChangeAction: (route: string) => void;
  maxResults: number;
  type: string;
  results: IResult[];
  value: string;
}

const viewAllCategories = ["COLLECTION", "COMMUNITY", "ARTICLE"];

const SearchResults = (props: ISearchResults) => (
  <ResultsComp>
    {props.results.slice(0, props.maxResults).map(i => (
      <Result
        routeChangeAction={props.routeChangeAction}
        key={i.resourceIdentifier.id}
        result={i}
      />
    ))}
    {viewAllCategories && viewAllCategories.includes(props.type) && (
      <PrimaryButton
        onClick={() => {
          analytics.track("QuickSearch - All Results", {
            category: "generic",
            keyword: props.value,
          });
          props.routeChangeAction(
            `/search-results?q=${props.value}&default_category=${props.type}`
          );
        }}
        text={`View all ${props.type}`}
      />
    )}
  </ResultsComp>
);

const Search = (props: IProps) => (
  <>
    {props.breakDown && props.results && props.results.length > 0 && (
      <SearchComp>
        <Tabs
          padContent={false}
          dark={false}
          tabs={getTabs(props.breakDown).map(tab => ({
            callback: () => props.fetchByType(tab),
            name: `${tab} (${props.breakDown[tab]})`,
          }))}
          panels={getTabs(props.breakDown).map(tab => (
            <SearchResults
              routeChangeAction={props.routeChangeAction}
              maxResults={props.maxResults}
              type={tab}
              key={tab}
              value={props.value}
              results={props.results.filter(
                i => i.resourceIdentifier.type === tab
              )}
            />
          ))}
        />
      </SearchComp>
    )}
  </>
);

export default Search;
