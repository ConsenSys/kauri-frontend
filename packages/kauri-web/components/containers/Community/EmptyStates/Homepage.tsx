import * as React from "react";
import styled from "../../../../lib/styled-components";
import { routeChangeAction } from "../../../../lib/Module";
import { BodyCard } from "../../../../../kauri-components/components/Typography";
import Input from "../../../../../kauri-components/components/Input/Input";
import AddOptions from "../../../../../kauri-components/components/AddOptions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: ${props => props.theme.space[3]}px;
  height: 100%;
  min-height: 70vh;
  & > svg {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  cursor: pointer;
  > :last-child {
    margin-top: ${props => props.theme.space[1]}px;
  }
`;

const OpacityOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.3;
  > :first-child {
    margin-bottom: ${props => props.theme.space[0]}px;
  }
  > :last-child {
    margin-top: ${props => props.theme.space[2]}px;
  }
  margin-bottom: ${props => props.theme.space[3]}px;
`;

interface IProps {
  id: string;
  routeChangeAction: typeof routeChangeAction;
}

const CommunityHomepageEmptyState: React.FunctionComponent<IProps> = props => (
  <Container>
    <OpacityOverlay
      onClick={() =>
        props.routeChangeAction(`/community/${props.id}/update-community`)
      }
    >
      <Input
        placeHolder="Add Section Name"
        fontSize={5}
        fontWeight={500}
        color={"primaryTextColor"}
        textAlign={"center"}
      />
      <Input
        placeHolder="Add Section Description"
        fontSize={3}
        fontWeight={500}
        color={"primaryTextColor"}
        textAlign={"center"}
      />
      <AddOptions>
        <div />
      </AddOptions>
    </OpacityOverlay>
    <BodyCard>
      Create a home page for your community by selecting the "Update Community"
      button! You can organize articles and collections into sections to help
      readers navigate the content.
    </BodyCard>
    <BodyCard>
      While there is no home page set, users and moderators will see the
      "Articles" tab by default.
    </BodyCard>
  </Container>
);

export default CommunityHomepageEmptyState;
