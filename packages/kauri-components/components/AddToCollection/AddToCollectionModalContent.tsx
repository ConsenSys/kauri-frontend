import * as React from "react";
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";
import Select from "../../components/Select";
import CollectionsContent, { ICollection } from "./CollectionsContent";
import SectionsContent from "./SectionsContent";

export const AddToCollectionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.space[2]}px;
  > * {
    margin-bottom: ${theme.space[3]}px;
  }
`;

interface IParentState {
  chosenCollection: string | null;
  chosenSection: number | null;
}

interface IProps {
  collections: ICollection[];
  setCollection: (payload: { chosenCollection: string }) => void;
  setSection: (payload: { chosenSection: number }) => void;
  parentState: IParentState;
}

const Content: React.FunctionComponent<IProps> = ({
  collections,
  setCollection,
  setSection,
  parentState,
}) => {
  const chosenCollection = collections.find(
    ({ id }) => id === parentState.chosenCollection
  );

  return (
    <AddToCollectionSection>
      {Array.isArray(collections) && collections.length > 0 && (
        <Select placeHolder="Collection name">
          <CollectionsContent
            handleClick={id => setCollection({ chosenCollection: id })}
            collections={collections}
          />
        </Select>
      )}
      {chosenCollection && chosenCollection.sections.length > 0 && (
        <Select placeHolder="Section name">
          <SectionsContent
            handleClick={id => setSection({ chosenSection: id })}
            sections={chosenCollection.sections}
          />
        </Select>
      )}
    </AddToCollectionSection>
  );
};

export default Content;
