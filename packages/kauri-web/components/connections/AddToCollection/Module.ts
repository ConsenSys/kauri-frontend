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
import { getArticleTitle } from "../../containers/Article/__generated__/getArticleTitle";
import { getArticleTitleQuery } from "../../containers/Article/DeleteDraftArticleModule";
import { addArticleToCollection } from "./__generated__/addArticleToCollection";

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
      .mergeMap(title => {
        const user = store.getState().app.user;
        const userId = user ? user.id : "";

        return Observable.merge(
          Observable.of(
            (showNotificationAction as any)({
              description: `The article "${title}" has been added to your collection!`,
              message: "Article added to collection",
              notificationType: "success",
            })
          ),
          Observable.of(routeChangeAction(`/public-profile/${userId}`))
        );
      })
      .do(() => apolloClient.resetStore())
  );
