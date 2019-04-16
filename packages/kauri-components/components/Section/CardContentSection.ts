import styled from "../../lib/styled-components";

const CardContentSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: ${props => props.theme.breakpoints[2]};
  > * {
    margin: ${props => props.theme.space[2]}px;
  }
`;

export default CardContentSection;
