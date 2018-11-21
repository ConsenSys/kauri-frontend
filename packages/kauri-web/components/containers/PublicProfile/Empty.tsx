import styled from "../../../lib/styled-components";
import ContentContainer from "./PublicProfileContentContainer";

const EmptyContainer = styled(ContentContainer)`
  flex-direction: column;
  width: fit-content;
  align-items: center;
  margin: auto;
`;

const Image = styled.img`
  margin-bottom: ${props => props.theme.space[3]}px;
`;

const Empty: React.SFC = ({ children }) => (
  <EmptyContainer>
    <Image src="/static/images/empty.png" />
    {children}
  </EmptyContainer>
);

export default Empty;
