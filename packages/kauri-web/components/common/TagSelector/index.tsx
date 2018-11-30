import React from "react";
import { searchTags } from "../../../queries/Tag";
import { Subject } from "rxjs/Subject";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import ApolloClient from "apollo-client";
import { Subscription } from "rxjs/Subscription";
import { TagSelector } from "../../../../kauri-components/components/Tags";
import { ITag } from "../../../../kauri-components/components/Tags/types";

const handleSearch$: Subject<string> = new Subject();

interface IDataSource extends Array<ITag> {}

interface IState {
  tags: IDataSource;
  sub?: Subscription;
}

interface IProps {
  client: ApolloClient<{}>;
}

class TagSelectorContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tags: [],
    };
    this.updateTags = this.updateTags.bind(this);
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(300)
      .flatMap((text: string) =>
        this.props.client.query<{
          searchTags: { content: ITag[] };
        }>({
          fetchPolicy: "no-cache",
          query: searchTags,
          variables: { query: text, page: 0, size: 10 },
        })
      )
      .map(
        ({
          data: {
            searchTags: { content },
          },
        }) => content
      )
      .subscribe((tags: IDataSource) => {
        if (tags.length === 0) {
          tags = [];
        }
        this.setState({ ...this.state, tags });
      });
    this.setState({ ...this.state, sub });
    handleSearch$.next("");
  }

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  updateTags(tags: ITag[]) {
    this.setState({ tags });
  }

  onChange(text?: string) {
    handleSearch$.next(text);
  }

  render() {
    return (
      <TagSelector
        onChange={this.onChange}
        updateTags={this.updateTags}
        availableTags={this.state.tags}
        maxTags={5}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default compose(
  withApollo,
  connect(
    mapStateToProps,
    {}
  )
)(TagSelectorContainer);
