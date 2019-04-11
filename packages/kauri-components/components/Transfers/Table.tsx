import styled from 'styled-components';
import { Label } from '../Typography';
import { ITransfer } from './index';
import {Link} from '../../../kauri-web/routes';

interface ICell {
    bold?: boolean;
    flex?: number;
    hoverable?: boolean;
}

interface IProps {
    data: ITransfer[];
    rejectArticleTransferAction: ({id} : { id: string}) => void;
    acceptArticleTransferAction: ({id} : { id: string}) => void;
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Cell = styled("div")<ICell>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: ${props => props.flex ? props.flex : 1};
    padding: ${props => props.theme.space[1]}px 0;
    ${props => props.hoverable ? `& > span {
        cursor: pointer; color: ${props.theme.colors.primary};
        transition: all 0.3s;
         &:hover {
             color: ${props.theme.colors.primaryDark};
         }
    }` : ''}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: ${props => props.theme.space[2]}px;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background: ${props => props.theme.colors.disabledBackgroundColor};
`;

const Table = (props: IProps) => <Container>
    <Row>
        <Cell bold={true}><Label>Status</Label></Cell>
        <Cell bold={true}><Label>Sent By</Label></Cell>
        <Cell flex={3} bold={true}><Label>Article Name</Label></Cell>
        <Cell bold={true} />
    </Row>
    <Line />
    {props.data && props.data.map((i) => <Row key={i.id}>
        <Cell><Label>Pending</Label></Cell>
        <Cell hoverable={true}><Link href={`/public-profile/${i.article.owner.id}`}><Label>{i.article.owner.name || i.article.owner.username || i.article.owner.id}</Label></Link></Cell>
        <Cell flex={3} hoverable={true}><Link href={`/article/${i.article.id}`}><Label>{i.article.title}</Label></Link></Cell>
        <Cell hoverable={true}>
            <Label onClick={() => props.acceptArticleTransferAction({ id: i.id })}>Accept</Label>
            <Label onClick={() => props.rejectArticleTransferAction({ id: i.id })}>Reject</Label>
        </Cell>
    </Row>)}
</Container>

export default Table;