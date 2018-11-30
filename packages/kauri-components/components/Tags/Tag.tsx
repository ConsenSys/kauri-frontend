/* tslint:disable */
import styled from 'styled-components';
import Close from './Close';
import TagName from './TagName';
import {ITag} from './types';

const Container = styled.div`
    display: flex;
    align-items: center;
    & > svg {
        cursor: pointer;
    }
    margin-right: ${props => props.theme.space[1]}px;
`;

interface IProps {
    tag: ITag,
    removeTag: (tag: ITag) => void;
    color: string;
}

const Tag = (props: IProps) => <Container>
    <Close onClick={() => props.removeTag(props.tag)}/>
    <TagName color={props.color}>{props.tag.tag}</TagName>
</Container>


export default Tag