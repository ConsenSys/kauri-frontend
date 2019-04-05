// @flow

import { Observable } from "rxjs/Observable";
import {
  createCollection,
  editCollection,
  composeCollection,
} from "../../../queries/Collection";
import { showNotificationAction, routeChangeAction } from "../../../lib/Module";
import analytics from "../../../lib/analytics";

import type { Dependencies } from "../../../lib/Module";

export type CreateCollectionPayload = {
  name: string,
  background: ?string,
  description: ?string,
  sections: Array<SectionDTO>,
};

export type EditCollectionPayload = CreateCollectionPayload & { id: string };

export type ComposeCollectionPayload = {
  id: string,
  sections: Array<SectionDTO>,
  updating?: boolean,
};

type CreateCollectionAction = {
  type: string,
  payload: CreateCollectionPayload,
  callback: any,
};

type EditCollectionAction = {
  type: string,
  payload: EditCollectionPayload,
  callback: any,
};

type ComposeCollectionAction = {
  type: string,
  payload: ComposeCollectionPayload,
  callback: any,
};

const CREATE_COLLECTION: string = "CREATE_COLLECTION";

const EDIT_COLLECTION: string = "EDIT_COLLECTION";

const COMPOSE_COLLECTION: string = "COMPOSE_COLLECTION";

export const createCollectionAction = (
  payload: CreateCollectionPayload,
  callback: any
): CreateCollectionAction => ({
  type: CREATE_COLLECTION,
  payload,
  callback,
});

export const editCollectionAction = (
  payload: EditCollectionPayload,
  callback: any
): EditCollectionAction => ({
  type: EDIT_COLLECTION,
  payload,
  callback,
});

export const composeCollectionAction = (
  payload: ComposeCollectionPayload,
  callback: any
): ComposeCollectionAction => ({
  type: COMPOSE_COLLECTION,
  payload,
  callback,
});

export const composeCollectionEpic = (
  action$: Observable<ComposeCollectionAction>,
  { getState, dispatch }: any,
  {
    apolloClient,
    smartContracts,
    web3,
    apolloSubscriber,
    web3PersonalSign,
    getGasPrice,
  }: Dependencies
) =>
  action$
    .ofType(COMPOSE_COLLECTION)
    .switchMap(
      ({
        payload: { id, sections, updating },
        callback,
      }: ComposeCollectionAction) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: composeCollection,
            variables: {
              id,
              sections,
            },
          })
        )
          .mergeMap(({ data: { composeCollection: { hash } } }) =>
            Observable.fromPromise(apolloSubscriber(hash))
          )
          .do(h => console.log(h))
          .mergeMap(() => apolloClient.resetStore())
          .mergeMap(() =>
            Observable.of(
              showNotificationAction({
                notificationType: "success",
                message:
                  typeof updating !== "undefined"
                    ? "Collection updated!"
                    : "Collection created!",
                description: "Your collection is now available for viewing!",
              }),
              routeChangeAction(
                `/collection/${id}/collection-${
                  typeof updating !== "undefined" ? "updated" : "created"
                }`
              )
            )
          )
          .do(() => {
            analytics.track(
              updating ? "Update Collection" : "Create Collection",
              {
                category: "collection_actions",
                sections: sections.length,
                resources: sections.reduce(
                  (all, item) => (all += item.resourcesId.length),
                  0
                ),
              }
            );
          })
          .do(() => callback && callback())
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                notificationType: "error",
                message: "Submission error",
                description: "Please try again!",
              })
            );
          })
    );

export const createCollectionEpic = (
  action$: Observable<CreateCollectionAction>,
  { getState, dispatch }: any,
  {
    apolloClient,
    smartContracts,
    web3,
    apolloSubscriber,
    web3PersonalSign,
    getGasPrice,
  }: Dependencies
) =>
  action$
    .ofType(CREATE_COLLECTION)
    .switchMap(
      ({
        payload: { name, background, description, sections, tags },
        callback,
      }: CreateCollectionAction) => {
        return Observable.fromPromise(
          apolloClient.mutate({
            mutation: createCollection,
            variables: {
              name,
              background,
              description,
              tags,
            },
          })
        )
          .mergeMap(({ data: { createCollection: { hash } } }) =>
            apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .map(({ data: { output: { id } } }) =>
            composeCollectionAction({ id, sections, tags }, callback)
          );
      }
    );

export const editCollectionEpic = (
  action$: Observable<EditCollectionAction>,
  { getState, dispatch }: any,
  {
    apolloClient,
    smartContracts,
    web3,
    apolloSubscriber,
    web3PersonalSign,
    getGasPrice,
  }: Dependencies
) =>
  action$
    .ofType(EDIT_COLLECTION)
    .switchMap(
      ({
        payload: { id, name, background, description, sections, tags },
        callback,
      }: EditCollectionAction) => {
        return Observable.fromPromise(
          apolloClient.mutate({
            mutation: editCollection,
            variables: {
              id,
              name,
              background,
              description,
              tags,
            },
          })
        )
          .mergeMap(({ data: { createCollection: { hash } } }) =>
            apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .map(({ data: { output: { id } } }) =>
            composeCollectionAction({ id, sections, updating: true }, callback)
          );
      }
    );
