import { compose, graphql } from "react-apollo";
import { getCommunityArticleContent } from "../../../../queries/Community";
import withLoading from "../../../../lib/with-loading";
import withApolloError from "../../../../lib/with-apollo-error";
import withPagination from "../../../../lib/with-pagination";
import DisplayResources from "../DisplayResources";

export default compose(
  graphql(getCommunityArticleContent, {
    options: ({ id }: { id: string }) => ({
      variables: {
        filter: { statusEquals: "PENDING", resourceTypeEquals: "ARTICLE" },
        id,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(withPagination(DisplayResources, "getCommunityContent"));
