import styled from "../../lib/styled-components";

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

export default CategorySection;
export { CategorySection };
