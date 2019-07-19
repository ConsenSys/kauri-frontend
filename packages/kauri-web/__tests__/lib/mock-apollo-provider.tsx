/* tslint:disable */
import { MockedProvider } from "react-apollo/test-utils";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject,
} from "apollo-cache-inmemory";
// @ts-ignore
import introspectionQueryResultData from "../../fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "ArticleDTO":
        // @ts-ignore
        return object.id + object.version; // use `key` as the primary key
      default:
        return defaultDataIdFromObject(object);
    }
  },
  fragmentMatcher,
});

const ApolloMockedProvider: React.FC<{ mocks: any }> = ({
  mocks,
  children,
}) => (
  <MockedProvider cache={cache.restore({})} mocks={mocks}>
    {children as any}
  </MockedProvider>
);

export default ApolloMockedProvider;
