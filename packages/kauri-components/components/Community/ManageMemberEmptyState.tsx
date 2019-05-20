import PublicProfileEmptyState from "../PublicProfileEmptyState";
import PrimaryButtonComponent from "../Button/PrimaryButton";
import styled from "../../lib/styled-components";

const ManageMemberEmptyStateContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.106912);
  border-radius: 4px;
`;

const ManageMemberEmptyState: React.SFC<{
  handleClick: () => void;
}> = ({ handleClick }) => (
  <ManageMemberEmptyStateContainer>
    <PublicProfileEmptyState
      iconSrc={null}
      description={
        "Moderators can add articles and collections to the community, as well as edit and remove existing ones."
      }
      title="Moderators"
      primaryButton={
        <PrimaryButtonComponent onClick={handleClick}>
          Add Moderator
        </PrimaryButtonComponent>
      }
    />
  </ManageMemberEmptyStateContainer>
);

export default ManageMemberEmptyState;
