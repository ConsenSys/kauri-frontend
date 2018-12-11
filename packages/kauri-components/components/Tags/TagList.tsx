import TagName from './TagName';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin: ${props => props.theme.space[1]}px 0;
`;

interface IProps {
    tags: string[];
    color: string;
    maxTags: number;
}

const StyledTag = styled(TagName)`
    &:not(:first-child):before {
        content: '•';
        color: ${props => props.theme.colors.primary};
        margin-bottom: ${props => props.theme.space[1] / 2}px;
    }
`;

const TagList = (props: IProps) => <Container>
    {Array.isArray(props.tags) && props.tags.map((tag, key) => {
    if (key < props.maxTags) {
        return (<StyledTag color={props.color} key={key}>{tag}</StyledTag>);
    } else if (key === props.maxTags) {
        return (<StyledTag key={key} color={props.color}>+{props.tags.length - props.maxTags}</StyledTag>)
    } else {
        return null;
    }})}
</Container>

export default TagList;