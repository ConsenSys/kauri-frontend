import TagSelectorView from "./View";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { searchTags } from "../../../queries/Tag";

const mapStateToProps = () => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    {
      searchTags,
    },
    null,
    { withRef: true }
  ),
  graphql(searchTags, {
    name: "SearchTags",
    options: {
      variables: {
        page: 0,
        query: "docker",
        size: 10,
      },
    },
  })
)(TagSelectorView);
