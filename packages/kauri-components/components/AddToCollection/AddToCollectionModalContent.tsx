import * as React from "react";
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";
import Select from "../../components/Select";
import CollectionsContent, { ICollection } from "./CollectionsContent";
import SectionsContent, { ISection } from "./SectionsContent";

export const AddToCollectionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.space[2]}px;
  > * {
    margin-bottom: ${theme.space[3]}px;
  }
`;

interface IParentState {
  chosenCollection: ICollection | null;
  chosenSection: ISection | null;
}

interface IProps {
  collections: ICollection[];
  setCollection: (payload: { chosenCollection: ICollection }) => void;
  setSection: (payload: { chosenSection: ISection }) => void;
  parentState: IParentState;
}

const Content: React.FunctionComponent<IProps> = ({
  collections,
  setCollection,
  setSection,
  parentState,
}) => {
  const chosenCollection = collections.find(({ id }) =>
    parentState.chosenCollection
      ? id === parentState.chosenCollection.id
      : false
  );

  return (
    <AddToCollectionSection>
      {Array.isArray(collections) && collections.length > 0 && (
        <Select
          value={
            parentState.chosenCollection
              ? parentState.chosenCollection.name
              : null
          }
          placeHolder={"Collection name"}
        >
          <CollectionsContent
            handleClick={collection =>
              setCollection({ chosenCollection: collection })
            }
            collections={collections}
          />
        </Select>
      )}
      {chosenCollection && chosenCollection.sections.length > 0 && (
        <Select
          value={
            parentState.chosenSection ? parentState.chosenSection.name : null
          }
          placeHolder={"Section name"}
        >
          <SectionsContent
            handleClick={section => setSection({ chosenSection: section })}
            sections={chosenCollection.sections}
          />
        </Select>
      )}
    </AddToCollectionSection>
  );
};

export default Content;
