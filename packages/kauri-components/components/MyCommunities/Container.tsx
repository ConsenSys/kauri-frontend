import styled from "../../lib/styled-components";

const Container = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[2]}px 0;
  padding-bottom: 0px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.106912);
  border-radius: 4px;
  flex: 1;
  & > h3,
  span {
    padding: 0 ${props => props.theme.space[2]}px;
    display: block;
  }
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

export default Container;
