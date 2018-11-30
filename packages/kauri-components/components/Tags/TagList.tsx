import TagName from './TagName';
import styled from 'styled-components';
import { ITag } from './types';

const Container = styled.div`
    display: flex;
`;

interface IProps {
    tags: ITag[];
}

const StyledTag = styled(TagName)`
    &:not(:first-child):before {
        content: '•';
        color: ${props => props.theme.colors.primary};
        margin: 0 ${props => props.theme.space[1]}px;
    }
`;

const TagList = (props: IProps) => <Container>
    {props.tags.map((i, key) => <StyledTag color="white" key={key}>{i}</StyledTag>)}
</Container>

export default TagList;