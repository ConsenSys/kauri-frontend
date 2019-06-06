import Container from "./Container";
import Table, { Line } from "./Table";
import { H3, BodyCard } from "../Typography";
import styled from "../../lib/styled-components";
import PrimaryButtonComponent from "../Button/PrimaryButton";

export interface ICommunity {
  role: string;
  community: {
    id: string;
    name: string;
    members: Array<{
      id: string;
      role: string;
    }>;
  };
}

interface IProps {
  routeChangeAction: (route: string) => void;
  data: ICommunity[];
  ownProfile: {
    getMyProfile: {
      id: string;
    };
  };
}

const Center = styled.div`
  display: flex;
  > * {
    margin: 0 auto;
    margin-top: ${props => props.theme.space[3]}px;
  }
`;

const NoCommunities: React.FunctionComponent<
  Pick<IProps, "routeChangeAction">
> = ({ routeChangeAction }) => (
  <Container>
    <H3>Communities</H3>
    <BodyCard>You are not part of any communities yet.</BodyCard>
    <Line />
    <Center>
      <PrimaryButtonComponent
        onClick={() => routeChangeAction(`/create-community`)}
      >
        Create Community
      </PrimaryButtonComponent>
    </Center>
  </Container>
);

const MyCommunities: React.FunctionComponent<IProps> = props =>
  Array.isArray(props.data) && !props.data.length ? (
    <Container>
      <H3>Communities</H3>
      <BodyCard>
        The communities you manage and moderate are displayed below;
      </BodyCard>
      <Table userId={props.ownProfile.getMyProfile.id} data={props.data} />
    </Container>
  ) : (
    <NoCommunities routeChangeAction={props.routeChangeAction} />
  );

export default MyCommunities;
