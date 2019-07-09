import styled from "styled-components";

const Container = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[2]}px 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.106912);
  border-radius: 4px;
  & > h3,
  span {
    padding: 0 ${props => props.theme.space[2]}px;
    display: block;
  }
`;

export default Container;
