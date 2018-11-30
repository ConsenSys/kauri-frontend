import styled from 'styled-components';

interface ITagName {
    color: string;
}

const TagName = styled<ITagName, "div">("div")`
    font-weight: ${props => props.theme.fontWeight[2]};
    text-transform: uppercase;
    color: ${props => props.color};
    font-size: ${props => props.theme.fontSizes[0]}px;
    margin-top: 1px;
    color: ${props => props.theme.colors[props.color]};
`;

export default TagName