import * as React from "react";
import AlertView from "../../../../kauri-components/components/Modal/AlertView";
import AddToCollectionModalContent from "../../../../kauri-components/components/AddToCollection/AddToCollectionModalContent";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  getUserCollections,
  getUserCollectionsVariables,
} from "./__generated__/getUserCollections";
import R from "ramda";
import { ICollection } from "../../../../kauri-components/components/AddToCollection/CollectionsContent";
import { ISection } from "../../../../kauri-components/components/AddToCollection/SectionsContent";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import { Label } from "../../../../kauri-components/components/Typography";
import { IAddArticleToCollectionPayload } from "./Module";

const query = gql`
  query getUserCollections($userId: String) {
    searchCollections(filter: { ownerIdEquals: $userId }) {
      content {
        id
        name
        sections {
          id
          name
          resources {
            ... on ArticleDTO {
              id
              version
            }
          }
        }
      }
    }
  }
`;

interface IChosen {
  chosenCollection: ICollection | null;
  chosenSection: ISection | null;
}

interface IProps {
  closeModalAction: () => void;
  userId: string;
  routeChangeAction: (route: string) => void;
  articleId: string;
  addArticleToCollectionAction: (
    payload: IAddArticleToCollectionPayload,
    callback: () => void
  ) => void;
  version: number;
}

const Component: React.FunctionComponent<IProps> = ({
  closeModalAction,
  userId,
  routeChangeAction,
  articleId,
  version,
  addArticleToCollectionAction,
}) => {
  const [state, setState] = React.useState<IChosen>({
    chosenCollection: null,
    chosenSection: null,
  });

  return (
    <Query<getUserCollections, getUserCollectionsVariables>
      query={query}
      variables={{ userId }}
    >
      {props => {
        if (props.loading) {
          return <Loading />;
        }
        if (props.error) {
          return (
            <ErrorMessage data={{ error: { message: props.error.message } }} />
          );
        }

        if (
          props.data &&
          props.data.searchCollections &&
          Array.isArray(props.data.searchCollections.content)
        ) {
          const collections = R.path<ICollection[]>([
            "searchCollections",
            "content",
          ])(props.data);

          return Array.isArray(collections) && collections.length > 0 ? (
            <AlertView
              closeModalAction={closeModalAction}
              confirmButtonAction={() => {
                if (state.chosenCollection && state.chosenSection) {
                  const chosenSectionid = state.chosenSection.id;
                  const chosenCollectionSections = state.chosenCollection.sections.find(
                    section => section.id === chosenSectionid
                  );

                  // Always insert article at the end
                  const position = chosenCollectionSections
                    ? Array.isArray(chosenCollectionSections.resources)
                      ? chosenCollectionSections.resources.length - 1
                      : 0
                    : 0;

                  addArticleToCollectionAction(
                    {
                      id: state.chosenCollection.id,
                      position,
                      resourceId: {
                        id: articleId,
                        type: "ARTICLE",
                        version,
                      },
                      sectionId: state.chosenSection
                        ? state.chosenSection.id
                        : "",
                    },
                    closeModalAction
                  );
                }
              }}
              content={
                <AddToCollectionModalContent
                  parentState={state}
                  collections={collections ? collections : []}
                  setCollection={({ chosenCollection }) =>
                    setState({ ...state, chosenCollection })
                  }
                  setSection={({ chosenSection }) =>
                    setState({ ...state, chosenSection })
                  }
                />
              }
              title={"Add to Collection"}
            />
          ) : (
            <AlertView
              title={"Create collection"}
              closeModalAction={closeModalAction}
              confirmButtonAction={() => {
                routeChangeAction("/create-collection");
                closeModalAction();
              }}
              content={
                <section>
                  <Label>You don't have any collections.</Label>
                </section>
              }
            />
          );
        }
      }}
    </Query>
  );
};

export default Component;
