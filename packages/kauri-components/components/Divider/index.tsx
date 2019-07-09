import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors.divider};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
`;

export default Divider;
