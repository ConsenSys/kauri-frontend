import * as React from "react";
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";
import Select from "../../components/Select";
import CollectionsContent, { ICollection } from "./CollectionsContent";
import SectionsContent, { ISection } from "./SectionsContent";
import { Label } from "../Typography";

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
  setCollection: (payload: { chosenCollection: ICollection }) => void;
  setSection: (payload: { chosenSection: ISection }) => void;
  parentState: IParentState;
  collectionsThatDoNotHaveTheChosenArticleId: ICollection[];
  articleAlreadyInAllCollections: boolean;
  changeToPrefilledArticleCreateCollectionRoute: () => void;
}

const Content: React.FunctionComponent<IProps> = ({
  setCollection,
  setSection,
  parentState,
  collectionsThatDoNotHaveTheChosenArticleId,
  articleAlreadyInAllCollections,
  changeToPrefilledArticleCreateCollectionRoute,
}) => {
  const chosenCollection = collectionsThatDoNotHaveTheChosenArticleId.find(
    ({ id }) =>
      parentState.chosenCollection
        ? id === parentState.chosenCollection.id
        : false
  );

  if (articleAlreadyInAllCollections) {
    return (
      <AddToCollectionSection>
        <Label>{"Article is already in all your collections!"}</Label>
      </AddToCollectionSection>
    );
  }

  return (
    <AddToCollectionSection>
      {Array.isArray(collectionsThatDoNotHaveTheChosenArticleId) &&
        collectionsThatDoNotHaveTheChosenArticleId.length > 0 && (
          <Select
            value={
              parentState.chosenCollection
                ? parentState.chosenCollection.name
                : null
            }
            placeHolder={"Collection name"}
          >
            <CollectionsContent
              changeToPrefilledArticleCreateCollectionRoute={
                changeToPrefilledArticleCreateCollectionRoute
              }
              handleClick={collection =>
                setCollection({ chosenCollection: collection })
              }
              collections={collectionsThatDoNotHaveTheChosenArticleId}
            />
          </Select>
        )}
      {chosenCollection && chosenCollection.sections.length > 0 && (
        <Select
          value={
            parentState.chosenSection && parentState.chosenSection.name
              ? parentState.chosenSection.name
              : "Untitled section"
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
