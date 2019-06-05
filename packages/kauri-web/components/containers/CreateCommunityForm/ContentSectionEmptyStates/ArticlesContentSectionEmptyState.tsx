import ContentSection from "../../../../../kauri-components/components/Section/ContentSection";
import { EmptyStateContainer } from "./HomeContentSectionEmptyState";
import { BodyCard } from "../../../../../kauri-components/components/Typography";

export default () => (
  <ContentSection justifyContent={["", "column"]}>
    <EmptyStateContainer>
      <BodyCard>All of the community's articles will be shown here!</BodyCard>
    </EmptyStateContainer>
  </ContentSection>
);
