import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";
import Select from "../../components/Select";
import CollectionsContent, { ICollection } from "./CollectionsContent";
import SectionsContent, { ISection } from "./SectionsContent";

const AddToCollectionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.space[2]}px;
  > * {
    margin-bottom: ${theme.space[3]}px;
  }
`;

interface IProps {
  sections: ISection[];
  collections: ICollection[];
}

const Content: React.FunctionComponent<IProps> = ({
  sections,
  collections,
}) => (
  <AddToCollectionSection>
    <Select placeHolder="Collection name">
      <CollectionsContent collections={collections} />
    </Select>
    <Select placeHolder="Section name">
      <SectionsContent sections={sections} />
    </Select>
  </AddToCollectionSection>
);

export default Content;
