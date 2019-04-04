import * as React from "react";
import { Title2 } from "../Typography";
import TagList from "../Tags/TagList";
import TopResourcesSection from "../Section/TopResourcesSection";

interface IProps {
  tags: string[];
  routeChangeAction: any;
}
const TopTags: React.FunctionComponent<IProps> = ({
  tags,
  routeChangeAction,
}) => (
  <TopResourcesSection>
    <Title2>Top Tags</Title2>
    <TagList
      color="textPrimary"
      orientation={"vertical"}
      tags={tags}
      maxTags={5}
      routeChangeAction={routeChangeAction}
    />
  </TopResourcesSection>
);

export default TopTags;
