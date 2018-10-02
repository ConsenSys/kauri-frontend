//@flow

import styled from 'styled-components';

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    flex-wrap: wrap;
    padding: 0px calc((100vw - 1280px) / 2);
    padding-bottom: 0;
    padding-top: ${props => props.theme.space[4]}px;
`;

export default ContentContainer;