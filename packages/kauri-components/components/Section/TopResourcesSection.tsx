import styled from "../../lib/styled-components";

const TopResourcesSection = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > * > *:nth-child(n + 6) {
    display: none;
  }
`;

export default TopResourcesSection;
