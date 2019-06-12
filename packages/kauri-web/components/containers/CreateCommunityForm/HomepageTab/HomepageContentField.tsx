import * as React from "react";
import styled from "../../../../lib/styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CardContentSection from "../../../../../kauri-components/components/Section/CardContentSection";
import { FieldArray, Field } from "formik";
import { IFormValues, emptySection } from "../index";
import Input from "../../../../../kauri-components/components/Input/Input";
import ArticleCard from "../../../connections/ArticleCard";
import CollectionCard from "../../../connections/CollectionCard";
import { space, SpaceProps, background, BackgroundProps } from "styled-system";
import R from "ramda";
import TertiaryButtonComponent from "../../../../../kauri-components/components/Button/TertiaryButton";
import SectionOptions from "../../../../components/containers/CreateCollectionForm/SectionOptions";
import {
  openModalAction as openModal,
  closeModalAction as closeModal,
} from "../../../../../kauri-components/components/Modal/Module";
import ChooseArticleModal from "../../../../components/containers/CreateCollectionForm/ChooseArticleModal";
import ChooseCollectionModal from "../../../../components/containers/CreateCollectionForm/ChooseCollectionModal";

const Section = styled<SpaceProps, "section">("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :not(:first-child) {
    ${space};
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > button:nth-child(4) {
    margin-top: ${props => props.theme.space[2]}px;
  }
`;

const ResourceSection = styled<SpaceProps, "section">("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  ${space};
  > button:last-child {
    margin-top: ${props => props.theme.space[1]}px;
  }
`;

const DraggableResourceContainer = styled.div`
  :hover {
    > :first-child {
      box-shadow: 0 0 0 2px ${props => props.theme.hoverTextColor};
    }
  }
`;

const RemoveIcon = () => (
  <img src="https://png.icons8.com/windows/50/000000/delete-sign.png" />
);

const renderResourceSection = (
  index: number,
  arrayHelpers: any,
  section: any,
  values: IFormValues,
  mappingKey: string
) => (resource: any, resourceIndex: number) => (
  <ResourceSection key={resourceIndex} mt={3}>
    {R.path(
      ["homepage", index, mappingKey, resourceIndex, "version"],
      values
    ) ? (
      <Draggable
        index={resourceIndex}
        draggableId={`${R.path(
          ["homepage", index, mappingKey, resourceIndex, "id"],
          values
        )}-${R.path(
          ["homepage", index, mappingKey, resourceIndex, "version"],
          values
        )}`}
      >
        {provided => (
          <DraggableResourceContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            id="article-card"
          >
            <ArticleCard
              isLoggedIn={true}
              id={R.path(
                ["homepage", index, mappingKey, resourceIndex, "id"],
                values
              )}
              version={parseInt(
                R.path<string>(
                  ["homepage", index, mappingKey, resourceIndex, "version"],
                  values
                ) || "",
                2
              )}
            />
            {provided.placeholder}
          </DraggableResourceContainer>
        )}
      </Draggable>
    ) : (
      R.path(["homepage", index, mappingKey, resourceIndex], values) && (
        <Draggable
          index={resourceIndex}
          draggableId={`${R.path(
            ["homepage", index, mappingKey, resourceIndex, "id"],
            values
          )}`}
        >
          {provided => (
            <DraggableResourceContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              innerRef={provided.innerRef}
              id="collection-card"
            >
              <CollectionCard
                id={R.path(
                  ["homepage", index, mappingKey, resourceIndex, "id"],
                  values
                )}
              />
              {provided.placeholder}
            </DraggableResourceContainer>
          )}
        </Draggable>
      )
    )}
    <TertiaryButtonComponent
      color="primaryTextColor"
      icon={<RemoveIcon />}
      onClick={() =>
        arrayHelpers.form.setFieldValue(
          `sections[${index}][${mappingKey}]`,
          Array.isArray(section[mappingKey]) &&
            (!resourceIndex
              ? section[mappingKey].length > 1
                ? section[mappingKey].splice(1)
                : []
              : R.remove(resourceIndex, resourceIndex, section[mappingKey]))
        )
      } // Remove current resource index
    >
      {`Remove ${resource.type}`}
    </TertiaryButtonComponent>
  </ResourceSection>
);

const ContentSection = styled<BackgroundProps & { bg: string }, "section">(
  "section"
)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  min-height: calc(100vh - 270px);
  ${background};
`;

interface IResourceIdentifier {
  id: string;
  type: string; // "ARTICLE" || "COLLECTION"
  version: number;
}

interface IProps {
  values: IFormValues;
  openModalAction: typeof openModal;
  closeModalAction: typeof closeModal;
}

const HomepageContentField: React.FunctionComponent<IProps> = ({
  values,
  openModalAction,
  closeModalAction,
}) => {
  return (
    <ContentSection bg="tertiaryBackgroundColor">
      <FieldArray
        name="homepage"
        render={arrayHelpers => (
          <React.Fragment>
            {values.homepage &&
              values.homepage.length > 0 &&
              values.homepage.map((section, index) => (
                <Section key={index} mt={4}>
                  <Field
                    type="text"
                    name={`homepage.${index}.name`}
                    render={({ field }: any) => (
                      <Input
                        {...field}
                        type="text"
                        placeHolder="Add Section Name"
                        fontSize={5}
                        fontWeight={500}
                        color={"primaryTextColor"}
                        textAlign={"center"}
                      />
                    )}
                  />
                  <Field
                    type="text"
                    name={`homepage.${index}.description`}
                    render={({ field }: any) => (
                      <Input
                        {...field}
                        type="text"
                        placeHolder="Add Section Description"
                        fontSize={2}
                        fontWeight={300}
                        color={"primaryTextColor"}
                        textAlign={"center"}
                      />
                    )}
                  />

                  <DragDropContext
                    onDragEnd={result => {
                      const { destination, source } = result;
                      if (!destination) {
                        return;
                      }
                      if (
                        destination.droppableId === source.droppableId &&
                        destination.index === source.index
                      ) {
                        return;
                      }
                      const sourceResource = R.path<IResourceIdentifier>([
                        "homepage",
                        index,
                        "resources",
                        source.index,
                      ])(values);

                      const destinationResource = R.path<IResourceIdentifier>([
                        "homepage",
                        index,
                        "resources",
                        destination.index,
                      ])(values);

                      // console.log(arrayHelpers.form);
                      // console.log(`homepage[${index}].resources[${destination.index}]`);
                      // console.log(sourceResource);

                      arrayHelpers.form.setFieldValue(
                        `homepage[${index}].resources[${destination.index}]`,
                        sourceResource
                      );

                      arrayHelpers.form.setFieldValue(
                        `homepage[${index}].resources[${source.index}]`,
                        destinationResource
                      );
                    }}
                  >
                    <Droppable
                      direction={"horizontal"}
                      droppableId={(section && section.id) || "0"}
                    >
                      {provided => (
                        <CardContentSection
                          {...provided.droppableProps}
                          innerRef={provided.innerRef}
                        >
                          {/* Section id */}
                          {section &&
                            section.resourcesId &&
                            Array.isArray(section.resourcesId) &&
                            section.resourcesId.map(
                              renderResourceSection(
                                index,
                                arrayHelpers,
                                section,
                                values,
                                "resourcesId"
                              )
                            )}
                        </CardContentSection>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <SectionOptions
                    currentSectionIndex={index}
                    previousSectionHasArticles={R.pipe(
                      R.path<any[]>([
                        "homepage",
                        index > 0 ? index : 0,
                        "resourcesId",
                      ]),
                      R.defaultTo([]),
                      resourcesId => resourcesId.length,
                      Boolean
                    )(values)}
                    addNewSection={() => arrayHelpers.push(emptySection)}
                    removeSection={() => arrayHelpers.remove(index)}
                    chooseArticle={() =>
                      openModalAction({
                        children: (
                          <ChooseArticleModal
                            allOtherChosenArticles={
                              values.homepage &&
                              values.homepage.filter(
                                (_, sectionIndex) => index !== sectionIndex
                              )
                            }
                            chosenArticles={R.pipe(
                              R.path<Array<{ type: string }>>([
                                "homepage",
                                index,
                                "resourcesId",
                              ]),
                              R.defaultTo([]),
                              R.filter(
                                (resourceId: any) =>
                                  resourceId &&
                                  resourceId.type.toLowerCase() === "article"
                              )
                            )(values)}
                            closeModalAction={() => closeModalAction()}
                            confirmModal={(
                              chosenArticles: [{ id: string; version: number }]
                            ) =>
                              arrayHelpers.form.setFieldValue(
                                `homepage[${index}].resourcesId`,
                                R.pipe(
                                  R.path<
                                    Array<{
                                      type: string;
                                      id: string;
                                      version: number;
                                    }>
                                  >(["homepage", index, "resourcesId"]),
                                  R.defaultTo([]),
                                  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
                                  // @ts-ignore
                                  R.filter<
                                    Array<{
                                      type: string;
                                      id: string;
                                      version: number;
                                    }>
                                  >(
                                    resourceId =>
                                      resourceId &&
                                      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
                                      // @ts-ignore
                                      resourceId.type &&
                                      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
                                      // @ts-ignore
                                      resourceId.type.toLowerCase() ===
                                        "collection"
                                  ),
                                  R.defaultTo([]),
                                  R.concat(
                                    chosenArticles.map(
                                      article =>
                                        article && {
                                          ...article,
                                          type: "ARTICLE",
                                        }
                                    )
                                  )
                                )(values)
                              )
                            }
                          />
                        ),
                      })
                    }
                    chooseCollection={() =>
                      openModalAction({
                        children: (
                          <ChooseCollectionModal
                            currentCollectionIdIfUpdating={"1337"}
                            allOtherChosenCollections={
                              values.homepage &&
                              values.homepage.filter(
                                (_, sectionIndex) => index !== sectionIndex
                              )
                            }
                            chosenCollections={R.pipe(
                              R.path(["homepage", index, "resourcesId"]),
                              R.defaultTo([]),
                              // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
                              // @ts-ignore
                              R.filter<
                                Array<{
                                  type: string;
                                  id: string;
                                }>
                              >(
                                resourceId =>
                                  resourceId &&
                                  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
                                  // @ts-ignore
                                  resourceId.type.toLowerCase() === "collection"
                              )
                            )(values)}
                            closeModalAction={() => closeModalAction()}
                            confirmModal={(
                              chosenCollections: [{ id: string }]
                            ) =>
                              arrayHelpers.form.setFieldValue(
                                `homepage[${index}].resourcesId`,
                                R.pipe(
                                  R.path(["homepage", index, "resourcesId"]),
                                  R.defaultTo([]),
                                  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
                                  // @ts-ignore
                                  R.filter(
                                    ({ type }) =>
                                      type.toLowerCase() === "article" // TODO: check?
                                  ),
                                  R.concat(
                                    chosenCollections.map(collection => ({
                                      ...collection,
                                      type: "COLLECTION",
                                    }))
                                  )
                                )(values)
                              )
                            }
                          />
                        ),
                      })
                    }
                  />
                </Section>
              ))}
          </React.Fragment>
        )}
      />
    </ContentSection>
  );
};

export default HomepageContentField;
