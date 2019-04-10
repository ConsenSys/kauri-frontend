import * as React from "react";
import { Title2 } from "../Typography";
import TopResourcesSection from "../Section/TopResourcesSection";
import UserAvatarComponent, {
  IProps as UserAvatarComponentProps,
} from "../UserAvatar";
import styled from "../../lib/styled-components";

const ContributorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  contributors: UserAvatarComponentProps[];
  linkComponent: (children: React.ReactElement<any>, route: string) => void;
}

const TopContributors: React.FunctionComponent<IProps> = ({
  contributors,
  linkComponent,
}) => (
  <TopResourcesSection>
    <Title2>Top Contributors</Title2>
    <ContributorsContainer>
      {contributors.map(contributor =>
        linkComponent(
          <UserAvatarComponent key={contributor.userId} {...contributor} />,
          `/public-profile/${contributor.userId}`
        )
      )}
    </ContributorsContainer>
  </TopResourcesSection>
);

export default TopContributors;
