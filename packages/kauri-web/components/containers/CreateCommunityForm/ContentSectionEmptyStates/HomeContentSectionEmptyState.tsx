import ContentSection from "../../../../../kauri-components/components/Section/ContentSection";
import styled from "../../../../lib/styled-components";
import { BodyCard } from "../../../../../kauri-components/components/Typography";

export const EmptyStateContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (props: { isCommunityAdmin: boolean }) =>
  props.isCommunityAdmin ? (
    <p>Show homepage manipulation shit here</p>
  ) : (
    <ContentSection justifyContent={["", "column"]}>
      <EmptyStateContainer>
        <BodyCard>
          All of the community's articles and collections will be shown here!
        </BodyCard>
      </EmptyStateContainer>
    </ContentSection>
  );
