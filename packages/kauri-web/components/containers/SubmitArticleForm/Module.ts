import { Observable } from "rxjs/Observable";
import { Epic } from "redux-observable";
import {
  submitArticleVersion,
  editArticle,
  getArticle as getArticleQuery,
  submitNewArticle,
} from "../../../queries/Article";
import {
  showNotificationAction,
  routeChangeAction,
  IDependencies,
} from "../../../lib/Module";
import { trackMixpanelAction } from "../Link/Module";
import { publishArticleAction, IOwnerPayload } from "./PublishArticleModule";
import { IOption } from "./PublishingSelector";

interface IGetArticleResult {
  getArticle: {
    id: string;
    version: number;
    contentHash: string;
    dateCreated: string;
    authorId: string;
    owner: IOwnerPayload;
  };
}

export interface IAttributesPayload {
  version?: string;
  background?: string;
}

export interface ISubmitArticlePayload {
  id?: string;
  subject: string;
  tags: string[];
  text: string;
  attributes?: IAttributesPayload;
  selfPublish?: boolean;
  destination?: IOption;
}

export interface ISubmitArticleVersionPayload {
  id: string;
  subject: string;
  tags: string[];
  text: string;
  attributes?: IAttributesPayload;
  owner?: any;
  selfPublish?: boolean;
  updateComment?: string;
}

export interface IDraftArticleActionPayload {
  text: string;
  subject: string;
  tags: string[];
  attributes?: IAttributesPayload;
}

const SUBMIT_ARTICLE = "SUBMIT_ARTICLE";

const EDIT_ARTICLE = "EDIT_ARTICLE";

const SUBMIT_ARTICLE_VERSION = "SUBMIT_ARTICLE_VERSION";

const DRAFT_ARTICLE = "DRAFT_ARTICLE";

export interface IEditArticlePayload {
  id: string;
  version: number;
  text: string;
  subject: string;
  tags: string[];
  attributes?: IAttributesPayload;
  selfPublish?: boolean;
}

export interface ISubmitArticleAction {
  type: string;
  payload: ISubmitArticlePayload;
}

export interface ISubmitArticleVersionAction {
  type: string;
  payload: ISubmitArticleVersionPayload;
}

export interface IEditArticleAction {
  type: string;
  payload: IEditArticlePayload;
}

export interface IDraftArticleAction {
  type: string;
  payload: IDraftArticleActionPayload;
}

export const submitArticleAction = (
  payload: ISubmitArticlePayload
): ISubmitArticleAction => ({
  payload,
  type: SUBMIT_ARTICLE,
});

export const editArticleAction = (
  payload: IEditArticlePayload
): IEditArticleAction => ({
  payload,
  type: EDIT_ARTICLE,
});

export const submitArticleVersionAction = (
  payload: ISubmitArticleVersionPayload
): ISubmitArticleVersionAction => ({
  payload,
  type: SUBMIT_ARTICLE_VERSION,
});

export const draftArticleAction = (
  payload: IDraftArticleActionPayload
): IDraftArticleAction => ({
  payload,
  type: DRAFT_ARTICLE,
});

export const submitArticleEpic: Epic<any, {}, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }: IDependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE)
    .switchMap(
      ({
        payload: { text, subject, tags, attributes, selfPublish, destination },
      }) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: submitNewArticle,
            variables: { content: text, title: subject, tags, attributes },
          })
        )
          .do(h => console.log("submitNewArticle", h))
          .flatMap(
            ({
              data: {
                submitNewArticle: { hash },
              },
            }: {
              data: { submitNewArticle: { hash: string } };
            }) => apolloSubscriber<{ id: string; version: number }>(hash)
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { output } }) =>
            apolloClient.query<IGetArticleResult>({
              fetchPolicy: "network-only",
              query: getArticleQuery,
              variables: {
                id: output.id,
                version: output.version,
              },
            })
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { getArticle } }) =>
            typeof selfPublish !== "undefined"
              ? Observable.of(
                  publishArticleAction({
                    contentHash: getArticle.contentHash,
                    contributor: getArticle.authorId,
                    dateCreated: getArticle.dateCreated,
                    id: getArticle.id,
                    owner:
                      destination.__typename === "CommunityDTO"
                        ? { type: "COMMUNITY", id: destination.id }
                        : getArticle.owner,
                    version: getArticle.version,
                  })
                )
              : Observable.of(
                  routeChangeAction(
                    `/article/${getArticle.id}/v${
                      getArticle.version
                    }/article-published`
                  ),
                  trackMixpanelAction({
                    event: "Offchain",
                    metaData: {
                      resource: "article",
                      resourceAction: "submit article",
                      resourceID: getArticle.id,
                      resourceVersion: getArticle.version,
                    },
                  }),
                  showNotificationAction({
                    description:
                      "Your personal article has now been published!",
                    message: "Article published",
                    notificationType: "success",
                  })
                )
          )
          .catch((err: string) => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                description: "Please try again!",
                message: "Submission error",
                notificationType: "error",
              })
            );
          })
    );

export const submitArticleVersionEpic: Epic<any, {}, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }: IDependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE_VERSION)
    .switchMap(
      ({
        payload: {
          text,
          subject,
          tags,
          id,
          attributes,
          selfPublish,
          updateComment,
        },
      }) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: submitArticleVersion,
            variables: {
              attributes,
              id,
              subject,
              tags,
              text,
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
              data: { submitArticleVersion: { hash: string } };
            }) => apolloSubscriber<{ id: string; version: number }>(hash)
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { output } }) =>
            apolloClient.query<IGetArticleResult>({
              fetchPolicy: "network-only",
              query: getArticleQuery,
              variables: {
                id: output.id,
                version: output.version,
              },
            })
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { getArticle } }) =>
            typeof selfPublish !== "undefined"
              ? Observable.of(
                  publishArticleAction({
                    contentHash: getArticle.contentHash,
                    contributor: getArticle.authorId,
                    dateCreated: getArticle.dateCreated,
                    id: getArticle.id,
                    owner: getArticle.owner,
                    updateComment,
                    version: getArticle.version,
                  })
                )
              : Observable.of(
                  routeChangeAction(
                    `/article/${getArticle.id}/v${getArticle.version}/article-${
                      typeof selfPublish === "undefined"
                        ? "drafted"
                        : getArticle.owner.id === getArticle.authorId
                        ? "published"
                        : "proposed"
                    }`
                  ),
                  trackMixpanelAction({
                    event: "Offchain",
                    metaData: {
                      resource: "article",
                      resourceAction: "submit article version",
                      resourceID: id,
                      resourceVersion: getArticle.version,
                    },
                  }),
                  showNotificationAction({
                    description:
                      typeof selfPublish === "undefined"
                        ? "Your article has now been drafted to be updated or published in the future"
                        : getArticle.owner.id === getArticle.authorId
                        ? "Your personal article has now been published!"
                        : "Waiting for it to be reviewed!",
                    message: `Article ${
                      typeof selfPublish === "undefined"
                        ? "drafted"
                        : getArticle.owner.id === getArticle.authorId
                        ? "published"
                        : "proposed"
                    }`,
                    notificationType: "success",
                  })
                )
          )
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                description: "Please try again!",
                message: "Submission error",
                notificationType: "error",
              })
            );
          })
    );

export const editArticleEpic: Epic<any, {}, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }: IDependencies
) =>
  action$
    .ofType(EDIT_ARTICLE)
    .switchMap(
      ({
        payload: { id, version, text, subject, tags, attributes, selfPublish },
      }: IEditArticleAction) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: editArticle,
            variables: { id, version, text, subject, tags, attributes },
          })
        )
          .flatMap(
            ({
              data: {
                editArticleVersion: { hash },
              },
            }: {
              data: { editArticleVersion: { hash: string } };
            }) => apolloSubscriber<{ id: string; version: number }>(hash)
          )
          .do(h => console.log(h))
          .mergeMap(({ data: { output } }) =>
            apolloClient.query<IGetArticleResult>({
              fetchPolicy: "network-only",
              query: getArticleQuery,
              variables: {
                id: output.id,
                version: output.version,
              },
            })
          )
          .mergeMap(({ data: { getArticle } }) =>
            typeof selfPublish !== "undefined"
              ? Observable.of(
                  publishArticleAction({
                    contentHash: getArticle.contentHash,
                    contributor: getArticle.authorId,
                    dateCreated: getArticle.dateCreated,
                    id: getArticle.id,
                    owner: getArticle.owner,
                    version: getArticle.version,
                  })
                )
              : Observable.of(
                  routeChangeAction(
                    `/article/${id}/v${version}/article-updated`
                  ),
                  trackMixpanelAction({
                    event: "Offchain",
                    metaData: {
                      resource: "article",
                      resourceAction: "update article",
                      resourceID: id,
                      resourceVersion: version,
                    },
                  }),
                  showNotificationAction({
                    description: "The article version has been updated!",
                    message: "Article updated",
                    notificationType: "info",
                  })
                )
          )
    );

export const draftArticleEpic: Epic<any, {}, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }: IDependencies
) =>
  action$
    .ofType(DRAFT_ARTICLE)
    .switchMap(
      ({ payload: { text, subject, tags, attributes } }: IDraftArticleAction) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: submitNewArticle,
            variables: { content: text, title: subject, tags, attributes },
          })
        )
          .flatMap(
            ({
              data: {
                submitNewArticle: { hash },
              },
            }: {
              data: { submitNewArticle: { hash: string } };
            }) => apolloSubscriber<{ id: string; version: number }>(hash)
          )
          .do(() => apolloClient.resetStore())
          .flatMap(({ data: { output: { id, version } } }) =>
            Observable.of(
              routeChangeAction(`/article/${id}/v${version}/article-drafted`),
              trackMixpanelAction({
                event: "Offchain",
                metaData: {
                  resource: "article",
                  resourceAction: "article-drafted",
                  resourceID: id,
                  resourceVersion: version,
                },
              }),
              showNotificationAction({
                description:
                  "The draft has just been saved. You can go back and submit it whenever you are ready.",
                message: "Draft Created",
                notificationType: "info",
              })
            )
          )
    );
