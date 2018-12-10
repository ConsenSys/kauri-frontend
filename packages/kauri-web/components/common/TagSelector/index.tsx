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

interface IState {
  tags: string[];
  availableTags: ITag[];
  sub?: Subscription;
}

interface IProps {
  client: ApolloClient<{}>;
  setFieldsValue: any;
  getFieldDecorator: any;
  tags: string[];
  updateTags?: (tags: string[]) => void;
}

class TagSelectorContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      availableTags: [],
      tags: props.tags,
    };
    this.updateTags = this.updateTags.bind(this);
  }

  componentDidMount() {
    const sub = handleSearch$
      .debounceTime(100)
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
      .subscribe((availableTags: ITag[]) => {
        if (availableTags.length === 0) {
          availableTags = [];
        }
        this.setState({ ...this.state, availableTags });
      });
    this.setState({ ...this.state, sub });
    handleSearch$.next("");
  }

  componentWillUnmount() {
    if (this.state.sub) {
      this.state.sub.unsubscribe();
    }
  }

  updateTags(tags: string[]) {
    this.setState(
      { tags, availableTags: [] },
      () => this.props.updateTags && this.props.updateTags(tags)
    );
  }

  fetchMatches(text?: string) {
    handleSearch$.next(text);
  }

  handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  render() {
    return (
      <>
        {this.props.getFieldDecorator ? (
          this.props.getFieldDecorator("tags", {})(
            <TagSelector
              tags={this.state.tags}
              fetchMatches={this.fetchMatches}
              onChange={this.updateTags}
              availableTags={this.state.availableTags}
              maxTags={5}
            />
          )
        ) : (
          <TagSelector
            tags={this.state.tags}
            fetchMatches={this.fetchMatches}
            onChange={this.updateTags}
            availableTags={this.state.availableTags}
            maxTags={5}
          />
        )}
      </>
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
