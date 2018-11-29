/* tslint:disable */
import styled from 'styled-components';
import Close from './Close';
import {ITag} from './types';

const TagName = styled<ITagName, "div">("div")`
    font-weight: ${props => props.theme.fontWeight[2]};
    text-transform: uppercase;
    color: ${props => props.color};
    font-size: ${props => props.theme.fontSizes[0]}px;
    margin-top: 1px;
    color: ${props => props.theme.colors[props.color]};
`;

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

interface ITagName {
    color: string;
}


const Tag = (props: IProps) => <Container>
    <Close onClick={() => props.removeTag(props.tag)}/>
    <TagName color={props.color}>{props.tag.name}</TagName>
</Container>


export default Tag