import styled from 'styled-components';
import Close from './Close';
import TagName from './TagName';

const Container = styled.div`
    display: flex;
    align-items: center;
    & > svg {
        cursor: pointer;
    }
    margin-right: ${props => props.theme.space[1]}px;
`;

interface IProps {
    tag: string,
    removeTag: (tag: string) => void;
    color: string;
}

const Tag = (props: IProps) => <Container>
    <Close onClick={props.removeTag.bind(props.tag)}/>
    <TagName color={props.color}>{props.tag}</TagName>
</Container>


export default Tag