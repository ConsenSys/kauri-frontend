import styled from "styled-components";
import { Label } from "../Typography";
import { Link } from "../../../kauri-web/routes";
import R from "ramda";
import { ICommunity } from "./index";

interface ICell {
  bold?: boolean;
  flex?: number;
  hoverable?: boolean;
}

interface IProps {
  userId: string;
  data: ICommunity[];
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled("div")<ICell>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: ${props => (props.flex ? props.flex : 1)};
  padding: ${props => props.theme.space[2]}px 0;
  ${props =>
    props.hoverable
      ? `& > span {
        cursor: pointer; color: ${props.theme.colors.primary};
        transition: all 0.3s;
         &:hover {
             color: ${props.theme.colors.primaryDark};
         }
    }`
      : ""}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.theme.space[2]}px;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => props.theme.colors.disabledBackgroundColor};
`;

const Table: React.FunctionComponent<IProps> = props => (
  <Container>
    <Line />
    {props.data &&
      props.data.map(({ community }) => (
        <Row key={community.id}>
          <Cell flex={0}>
            <Label>
              {R.pipe(
                R.find<{ id: string; role: string }>(
                  member => member.id === props.userId
                ),
                R.path(["role"])
              )(community.members)}
            </Label>
          </Cell>
          <Cell flex={4}>
            <Label>{community.name}</Label>
          </Cell>
          <Cell flex={0} hoverable={true}>
            <Link href={`/community/${community.id}`}>
              <Label>View Community</Label>
            </Link>
          </Cell>
        </Row>
      ))}
  </Container>
);

export default Table;
