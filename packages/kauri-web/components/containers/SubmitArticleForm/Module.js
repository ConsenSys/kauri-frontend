// @flow

import { Observable } from 'rxjs/Observable';
import {
  submitArticleVersion,
  editArticle,
  getArticle,
  submitNewArticle,
  approveArticle,
  rejectArticle,
} from '../../../queries/Article';
import { showNotificationAction, routeChangeAction } from '../../../lib/Module';
import { trackMixpanelAction } from '../Link/Module';
import { publishArticleAction } from './PublishArticleModule';

import type { Classification } from '../Link/Module';
import type { Dependencies } from '../../../lib/Module';

export type AttributesPayload = {
  version?: string,
  background?: string,
};

export type SubmitArticlePayload = {
  article_id?: string,
  subject: string,
  text: string,
  attributes?: AttributesPayload,
  selfPublish?: boolean,
};

export type SubmitArticleVersionPayload = {
  id: string,
  subject: string,
  text: string,
  attributes?: AttributesPayload,
  owner?: ?AbstractResourceDTO,
  selfPublish?: boolean,
};

export type DraftArticleActionPayload = {
  text: string,
  subject: string,
  attributes?: AttributesPayload,
};

const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE';

const EDIT_ARTICLE = 'EDIT_ARTICLE';

const SUBMIT_ARTICLE_VERSION = 'SUBMIT_ARTICLE_VERSION';

const DRAFT_ARTICLE = 'DRAFT_ARTICLE';

export type EditArticlePayload = {
  id: string,
  version: number,
  text: string,
  subject: string,
  attributes?: AttributesPayload,
  selfPublish?: boolean,
};

export type SubmitArticleAction = {
  type: string,
  payload: SubmitArticlePayload,
};

export type SubmitArticleVersionAction = {
  type: string,
  payload: SubmitArticleVersionPayload,
};

export type EditArticleAction = { type: string, payload: EditArticlePayload };

export type DraftArticleAction = {
  type: string,
  payload: DraftArticleActionPayload,
};

export type ApproveArticleAction = {
  type: string,
  payload: ApproveArticlePayload,
};

export type RejectArticleAction = {
  type: string,
  payload: RejectArticlePayload,
};

export const submitArticleAction = (
  payload: SubmitArticlePayload
): SubmitArticleAction => ({
  type: SUBMIT_ARTICLE,
  payload,
});

export const editArticleAction = (
  payload: EditArticlePayload
): EditArticleAction => ({
  type: EDIT_ARTICLE,
  payload,
});

export const submitArticleVersionAction = (
  payload: SubmitArticleVersionPayload
): SubmitArticleVersionAction => ({
  type: SUBMIT_ARTICLE_VERSION,
  payload,
});

export const draftArticleAction = (
  payload: DraftArticleActionPayload
): DraftArticleAction => ({
  type: DRAFT_ARTICLE,
  payload,
});

export const submitArticleEpic = (
  action$: Observable<SubmitArticleAction>,
  _: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE)
    .switchMap(
      ({
        payload: {
          request_id,
          text,
          subject,
          article_id,
          attributes,
          selfPublish,
        },
      }) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: submitNewArticle,
            variables: { content: text, title: subject, attributes },
          })
        )
          .do(h => console.log('submitNewArticle'))
          .do(h => console.log(h))
          .flatMap(
            ({
              data: {
                submitNewArticle: { hash },
              },
            }: {
              data: { submitNewArticle: { hash: string } },
            }) => apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { output: { id, version } } }) =>
            apolloClient.query({
              query: getArticle,
              variables: {
                id,
                version,
              },
              fetchPolicy: 'network-only',
            })
          )
          .do(h => console.log(h))
          .mergeMap(
            ({
              data: {
                getArticle: {
                  id,
                  version,
                  contentHash,
                  dateCreated,
                  authorId,
                  owner,
                },
              },
            }) =>
              typeof selfPublish !== 'undefined'
                ? Observable.of(
                  publishArticleAction({
                    id,
                    version,
                    contentHash,
                    dateCreated,
                    contributor: authorId,
                    owner,
                  })
                )
                : Observable.of(
                  routeChangeAction(
                    `/article/${id}/v${version}/article-published`
                  ),
                  trackMixpanelAction({
                    event: 'Offchain',
                    metaData: {
                      resource: 'article',
                      resourceID: id,
                      resourceVersion: version,
                      resourceAction: 'submit article',
                    },
                  }),
                  showNotificationAction({
                    notificationType: 'success',
                    message: 'Article published',
                    description:
                        'Your personal article has now been published!',
                  })
                )
          )
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                notificationType: 'error',
                message: 'Submission error',
                description: 'Please try again!',
              })
            );
          })
    );

export const submitArticleVersionEpic = (
  action$: Observable<SubmitArticleVersionAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE_VERSION)
    .switchMap(
      ({ payload: { text, subject, id, attributes, owner, selfPublish } }) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: submitArticleVersion,
            variables: {
              id,
              text,
              subject,
              attributes,
            },
          })
        )
          .do(h => console.log(h))
          .flatMap(
            ({
              data: {
                submitArticleVersion: { hash },
              },
            }: {
              data: { submitArticleVersion: { hash: string } },
            }) => apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { output: { id, version } } }) =>
            apolloClient.query({
              query: getArticle,
              variables: {
                id,
                version,
              },
              fetchPolicy: 'network-only',
            })
          )
          .do(h => console.log(h))
          .mergeMap(
            ({
              data: {
                getArticle: { id, version, contentHash, dateCreated, authorId },
              },
            }) =>
              typeof selfPublish !== 'undefined'
                ? Observable.of(
                  publishArticleAction({
                    id,
                    version,
                    contentHash,
                    dateCreated,
                    contributor: authorId,
                    owner,
                  })
                )
                : Observable.of(
                  routeChangeAction(
                    `/article/${id}/v${version}/article-${
                      typeof selfPublish === 'undefined'
                        ? 'drafted'
                        : owner.id === authorId
                          ? 'published'
                          : 'proposed'
                    }`
                  ),
                  trackMixpanelAction({
                    event: 'Offchain',
                    metaData: {
                      resource: 'article',
                      resourceID: id,
                      resourceVersion: version,
                      resourceAction: 'submit article version',
                    },
                  }),
                  showNotificationAction({
                    notificationType: 'success',
                    message: `Article ${
                      typeof selfPublish === 'undefined'
                        ? 'drafted'
                        : owner.id === authorId
                          ? 'published'
                          : 'proposed'
                    }`,
                    description:
                        typeof selfPublish === 'undefined'
                          ? 'Your article has now been drafted to be updated or published in the future'
                          : owner.id === authorId
                            ? 'Your personal article has now been published!'
                            : 'Waiting for it to be reviewed!',
                  })
                )
          )
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                notificationType: 'error',
                message: 'Submission error',
                description: 'Please try again!',
              })
            );
          })
    );

export const editArticleEpic = (
  action$: Observable<EditArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(EDIT_ARTICLE)
    .switchMap(
      ({
        payload: { id, version, text, subject, attributes, selfPublish },
      }: EditArticleAction) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: editArticle,
            variables: { id, version, text, subject, attributes },
          })
        )
          .flatMap(
            ({
              data: {
                editArticleVersion: { hash },
              },
            }: {
              data: { editArticleVersion: { hash: string } },
            }) => apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { output: { id, version } } }) =>
            apolloClient.query({
              query: getArticle,
              variables: {
                id,
                version,
              },
              fetchPolicy: 'network-only',
            })
          )
          .mergeMap(
            ({
              data: {
                getArticle: { id, version, contentHash, dateCreated, authorId },
              },
            }) =>
              typeof selfPublish !== 'undefined'
                ? Observable.of(
                  publishArticleAction({
                    id,
                    version,
                    contentHash,
                    dateCreated,
                    contributor: authorId,
                    owner: null,
                  })
                )
                : Observable.of(
                  routeChangeAction(
                    `/article/${id}/v${version}/article-updated`
                  ),
                  trackMixpanelAction({
                    event: 'Offchain',
                    metaData: {
                      resource: 'article',
                      resourceID: id,
                      resourceVersion: version,
                      resourceAction: 'update article',
                    },
                  }),
                  showNotificationAction({
                    notificationType: 'info',
                    message: 'Article updated',
                    description: 'The article version has been updated!',
                  })
                )
          )
    );

export const draftArticleEpic = (
  action$: Observable<DraftArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(DRAFT_ARTICLE)
    .switchMap(
      ({ payload: { text, subject, attributes } }: DraftArticleAction) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: submitNewArticle,
            variables: { content: text, title: subject, attributes },
          })
        )
          .flatMap(
            ({
              data: {
                submitNewArticle: { hash },
              },
            }: {
              data: { submitNewArticle: { hash: string } },
            }) => apolloSubscriber(hash)
          )
          .do(() => apolloClient.resetStore())
          .flatMap(({ data: { output: { id, version } } }) =>
            Observable.of(
              routeChangeAction(`/article/${id}/v${version}/article-drafted`),
              trackMixpanelAction({
                event: 'Offchain',
                metaData: {
                  resource: 'article',
                  resourceID: id,
                  resourceVersion: version,
                  resourceAction: 'article-drafted',
                },
              }),
              showNotificationAction({
                notificationType: 'info',
                message: 'Draft Created',
                description:
                  'The draft has just been saved. You can go back and submit it whenever you are ready.',
              })
            )
          )
    );
