/* tslint:disable */
import { getArticle } from "../../../../../queries/Article";
import ApolloMockedProvider from "../../../../../__tests__/lib/mock-apollo-provider";
import { searchTags } from "../../../../../queries/Tag";

// @ts-ignore
export const mockResult = {
  data: {
    getArticle: null,
    searchTags: { content: [{ tag: "", count: 0, score: 0 }] },
  },
  dataPresent: true,
};

export const mockVariables = {
  id: "2cfdfa427d324b57b2afd034f3cfb145",
  published: true,
  version: 1,
};

const mocks = [
  {
    request: {
      query: getArticle,
      variables: mockVariables,
    },
    result: mockResult,
  },
  {
    request: {
      query: searchTags,
      variables: { query: "", page: 0, size: 10 },
    },
    result: mockResult,
  },
];

const RenderWithQuery: React.FunctionComponent = ({ children }) => (
  <ApolloMockedProvider mocks={mocks}>{children}</ApolloMockedProvider>
);

export default RenderWithQuery;
