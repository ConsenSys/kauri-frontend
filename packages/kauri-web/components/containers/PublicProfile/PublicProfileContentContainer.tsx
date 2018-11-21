import styled from "../../../lib/styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
  padding-top: 0px;
`;

export default ContentContainer;
