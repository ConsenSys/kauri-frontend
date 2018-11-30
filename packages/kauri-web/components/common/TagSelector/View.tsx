/* tslint:disable */
import * as React from "react";
import { TagSelector } from "../../../../kauri-components/components/Tags";
import { ITag } from "../../../../kauri-components/components/Tags/types";

interface IProps {
  searchTags: (query?: string) => void;
}

interface IState {
  tags: ITag[];
}

class TagSelectorContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  componentDidMount() {
    //
  }
  handleEnterKey() {
    //
  }

  handleChange() {
    //
  }

  updateTags() {
    //
  }

  render() {
    console.log(this);
    return (
      <TagSelector
        handleEnterKey={this.handleEnterKey}
        onChange={this.handleChange}
        updateTags={this.updateTags}
        availableTags={this.state.tags}
        maxTags={5}
      />
    );
  }
}

export default TagSelectorContainer;
