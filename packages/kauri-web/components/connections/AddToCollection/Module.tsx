import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import gql from "graphql-tag";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import {
  IReduxState,
  IDependencies,
  IAction,
  showNotificationAction,
  routeChangeAction,
  Actions,
} from "../../../lib/Module";
import {
  getArticleTitle,
  getArticleTitleVariables,
} from "../../containers/Article/__generated__/getArticleTitle";
import { getArticleTitleQuery } from "../../containers/ArticleDraft/DeleteDraftArticleModule";
import { addArticleToCollection } from "./__generated__/addArticleToCollection";
import AlertViewComponent from "../../../../kauri-components/components/Modal/AlertView";
import {
  closeModalAction,
  openModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import {
  BodyCard,
  H4,
} from "../../../../kauri-components/components/Typography";
import { getCollectionTitle } from "./__generated__/getCollectionTitle";
import styled from "../../../../kauri-components/lib/styled-components";
import analytics from "../../../lib/analytics";

export const addArticleToCollectionMutation = gql`
  mutation addArticleToCollection(
    $id: String
    $sectionId: String
    $resourceId: ResourceIdentifierInput
    $position: Int
  ) {
    addCollectionResource(
      id: $id
      sectionId: $sectionId
      resourceId: $resourceId
      position: $position
    ) {
      hash
    }
  }
`;

export const getCollectionTitleQuery = gql`
  query getCollectionTitle($id: String) {
    getCollection(id: $id) {
      name
    }
  }
`;

export interface IAddArticleToCollectionPayload {
  id: string;
  sectionId: string;
  resourceId: {
    id: string;
    version: number;
    type: "ARTICLE";
  };
  position: number;
}

export interface IAddArticleToCollectionAction extends IAction {
  callback: () => void;
  payload: IAddArticleToCollectionPayload;
  type: "ADD_ARTICLE_TO_COLLECTION";
}

const ADD_ARTICLE_TO_COLLECTION = "ADD_ARTICLE_TO_COLLECTION";

export const addArticleToCollectionAction = (
  payload: IAddArticleToCollectionPayload,
  callback: () => void
): IAddArticleToCollectionAction => ({
  callback,
  payload,
  type: ADD_ARTICLE_TO_COLLECTION,
});

interface IAddArticleToCollectionCommandOutput {
  id: string;
  version: number;
}

const CommandOutput = t.interface({
  hash: t.string,
});

const GetArticle = t.interface({
  title: t.string,
});

const Row = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 130px;
  align-items: center;
  > :first-child {
    margin-right: 3px;
  }
`;

export const addArticleToCollectionEpic: Epic<
  Actions,
  IReduxState,
  IDependencies
> = (action$, store, { apolloClient, apolloSubscriber }) =>
  action$.ofType(ADD_ARTICLE_TO_COLLECTION).switchMap(actions =>
    Observable.fromPromise(
      apolloClient.mutate<addArticleToCollection>({
        mutation: addArticleToCollectionMutation,
        variables: (actions as IAddArticleToCollectionAction).payload,
      })
    )
      .mergeMap(({ data: { addCollectionResource } }) =>
        apolloSubscriber<IAddArticleToCollectionCommandOutput>(
          CommandOutput.decode(addCollectionResource).getOrElseL(errors => {
            throw new Error(failure(errors).join("\n"));
          }).hash
        )
      )
      .mergeMap(() =>
        apolloClient.query<getArticleTitle>({
          query: getArticleTitleQuery,
          variables: {
            id: (actions as IAddArticleToCollectionAction).payload.resourceId
              .id,
            version: (actions as IAddArticleToCollectionAction).payload
              .resourceId.version,
          },
        })
      )
      .map(
        ({ data: { getArticle } }) =>
          GetArticle.decode(getArticle).getOrElseL(errors => {
            throw new Error(failure(errors).join("\n"));
          }).title
      )
      .do(() => typeof actions.callback === "function" && actions.callback())
      .do(() => {
        analytics.track("Add To Collection", {
          category: "collection_actions",
          resourceId: "4e1a8de4dece4736bd0b9c33b9225c92",
          resourceType: actions.payload.resourceId.type,
        });
      })
      .switchMap(title =>
        Observable.fromPromise(
          apolloClient.query<getCollectionTitle, getArticleTitleVariables>({
            query: getCollectionTitleQuery,
            variables: {
              id: (actions as IAddArticleToCollectionAction).payload.id,
            },
          })
        )
          .mergeMap(({ data: { getCollection } }) =>
            Observable.merge(
              Observable.of(
                (showNotificationAction as any)({
                  description: `The article "${title}" has been added to your collection!`,
                  message: "Article added to collection",
                  notificationType: "success",
                })
              ),
              Observable.of(
                openModalAction({
                  children: (
                    <AlertViewComponent
                      title="Add to Collection"
                      content={
                        <Row>
                          <BodyCard>Article successfully added to</BodyCard>
                          <H4>{` ${getCollection &&
                            getCollection.name} Collection`}</H4>
                        </Row>
                      }
                      closeModalAction={() =>
                        store.dispatch(closeModalAction())
                      }
                      confirmButtonText={"View Collection"}
                      closeButtonText={"Close"}
                      confirmButtonAction={() => {
                        store.dispatch(closeModalAction());
                        store.dispatch(
                          routeChangeAction(
                            `/collection/${
                              (actions as IAddArticleToCollectionAction).payload
                                .id
                            }/update-collection`
                          )
                        );
                      }}
                    />
                  ),
                })
              )
            )
          )
          .do(() => apolloClient.resetStore())
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                description: "Please try again",
                message: "Submission error",
                notificationType: "error",
              })
            );
          })
      )
      .catch(err => {
        console.error(err);
        return Observable.of(
          showNotificationAction({
            description: "Please try again",
            message: "Submission error",
            notificationType: "error",
          })
        );
      })
  );
