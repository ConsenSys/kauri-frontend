import * as React from "react";
import { Title2 } from "../Typography";
import TagList from "../Tags/TagList";
import TopResourcesSection from "../Section/TopResourcesSection";

const TopTags: React.FunctionComponent<{ tags: string[] }> = ({ tags }) => (
  <TopResourcesSection>
    <Title2>Top Tags</Title2>
    <TagList
      color="textPrimary"
      orientation={"vertical"}
      tags={tags}
      maxTags={5}
    />
  </TopResourcesSection>
);

export default TopTags;
