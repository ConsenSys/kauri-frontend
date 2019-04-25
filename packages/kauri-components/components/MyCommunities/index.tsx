import Container from "./Container";
import Table from "./Table";
import { H3, BodyCard } from "../Typography";

interface IProps {
  data: ICommunity[];
  ownProfile: {
    getMyProfile: {
      id: string;
    };
  };
}

export interface ICommunity {
  id: string;
  name: string;
  members: IMember[];
}

export interface IMember {
  id: string;
  role: string;
}

const MyCommunities = (props: IProps) => (
  <Container>
    <H3>Communities</H3>
    <BodyCard>
      The communities you manage and moderate are displayed below;
    </BodyCard>
    <Table userId={props.ownProfile.getMyProfile.id} data={props.data} />
  </Container>
);

export default MyCommunities;
