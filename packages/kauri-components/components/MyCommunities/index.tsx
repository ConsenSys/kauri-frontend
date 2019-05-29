import Container from "./Container";
import Table from "./Table";
import { H3, BodyCard } from "../Typography";

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
  data: ICommunity[];
  ownProfile: {
    getMyProfile: {
      id: string;
    };
  };
}

const MyCommunities: React.FunctionComponent<IProps> = props => (
  <Container>
    <H3>Communities</H3>
    <BodyCard>
      The communities you manage and moderate are displayed below;
    </BodyCard>
    <Table userId={props.ownProfile.getMyProfile.id} data={props.data} />
  </Container>
);

export default MyCommunities;
