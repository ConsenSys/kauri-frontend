import styled from "../../lib/styled-components";

const TopResourcesSection = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-top: 0px;
  }
  > * > *:nth-child(n + 6) {
    display: none;
  }
`;

export default TopResourcesSection;
