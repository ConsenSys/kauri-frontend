import styled from 'styled-components';

const Tag = styled.div`
    font-weight: ${props => props.theme.fontWeight[2]};
    text-transform: uppercase;
    color: ${props => props.color};
    font-size: ${props => props.theme.fontSizes[0]}px;
    margin-top: 1px;
`;

export default Tag