import styled from 'styled-components';
import theme from "../../../kauri-web/lib/theme-config";

interface ITagName {
    color: string;
    hiddenTags?: boolean;
}

const TagName = styled<ITagName, "div">("div")`
    font-weight: ${theme.fontWeight[2]};
    text-transform: uppercase;
    color: ${props => props.color};
    font-size: ${theme.fontSizes[0]}px;
    margin-top: 1px;
    color: ${props => theme.colors[props.color]};
`;

export default TagName