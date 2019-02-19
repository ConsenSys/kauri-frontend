import * as React from "react";
import styled from "../../lib/styled-components";
import { Article_contributors } from "../../../kauri-web/queries/__generated__/Article";
import { Label } from "../Typography";
import UserAvatarComponent from "../UserAvatar";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  contributors: Array<Article_contributors | null> | null;
}

const Component: React.SFC<IProps> = props => (
  <Container>
    <Label>Contributors</Label>
    {Array.isArray(props.contributors) &&
      props.contributors.map(
        contributor =>
          contributor &&
          props.linkComponent(
            <UserAvatarComponent
              avatar={contributor.avatar}
              userId={String(contributor.id)}
              username={contributor.username}
            />,
            `/public-profile/${contributor.id}`
          )
      )}
  </Container>
);

export default Component;
