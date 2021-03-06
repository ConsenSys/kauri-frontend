import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import gql from "graphql-tag";
import { ApolloClient, ApolloQueryResult } from "apollo-client";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import {
  showNotificationAction,
  routeChangeAction,
  IReduxState,
} from "../../../lib/Module";
import { publishArticle } from "./__generated__/publishArticle";
import generatePublishArticleHash from "../../../lib/generate-publish-article-hash";
import analytics from "../../../lib/analytics";

const publishArticleMutation = gql`
  mutation publishArticle(
    $id: String
    $version: Int
    $owner: ResourceIdentifierInput
    $signature: String
    $updateComment: String
  ) {
    publishArticle(
      id: $id
      version: $version
      owner: $owner
      signature: $signature
      updateComment: $updateComment
    ) {
      hash
    }
  }
`;

export interface IDependencies {
  apolloClient: ApolloClient<{}>;
  apolloSubscriber: <T>(hash: string) => Promise<{ data: { output: T } }>;
  smartContracts: any;
  web3: any;
  fetch: any;
  web3PersonalSign: any;
  getGasPrice: any;
  driverJS: any;
  personalSign: (dataToSign: string) => Promise<string>;
}

interface IAction {
  type: string;
  payload?: {};
}

export interface IOwnerPayload {
  type: string;
  id: string;
}

export interface IPublishArticlePayload {
  id: string;
  version: number;
  contentHash: string;
  dateCreated: string;
  contributor: string;
  owner: IOwnerPayload | null;
  updateComment?: string;
}

export interface IPublishArticleAction extends IAction {
  type: "PUBLISH_ARTICLE";
  payload: IPublishArticlePayload;
}

const PUBLISH_ARTICLE = "PUBLISH_ARTICLE";

export const publishArticleAction = (
  payload: IPublishArticlePayload
): IPublishArticleAction => ({
  payload,
  type: PUBLISH_ARTICLE,
});

interface IPublishArticleCommandOutput {
  id: string;
  version: number;
}

const CommandOutput = t.interface({
  hash: t.string,
});

export const publishArticleEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  { getState },
  { apolloClient, apolloSubscriber, personalSign }
) =>
  action$
    .ofType(PUBLISH_ARTICLE)
    .switchMap(
      ({
        payload: {
          id,
          version,
          contentHash,
          contributor,
          dateCreated,
          owner,
          updateComment,
        },
      }: IPublishArticleAction) => {
        const signatureToSign = generatePublishArticleHash(
          id,
          version,
          contentHash,
          contributor,
          dateCreated
        );

        const articleOwner = owner
          ? {
              id: owner.id,
              type: owner.type === "COMMUNITY" ? "COMMUNITY" : "USER",
            }
          : null;

        const canPublish =
          !articleOwner ||
          (articleOwner && articleOwner.id === contributor) ||
          getState().app.user.communities.map(({ community }) => community.id)
            .length > 0;

        return Observable.fromPromise(personalSign(signatureToSign))
          .mergeMap(signature =>
            Observable.fromPromise<ApolloQueryResult<publishArticle>>(
              apolloClient.mutate<publishArticle>({
                mutation: publishArticleMutation,
                variables: {
                  id,
                  owner: articleOwner,
                  signature,
                  updateComment,
                  version,
                },
              })
            )
          )
          .mergeMap(({ data: { publishArticle: publishArticleData } }) =>
            apolloSubscriber<IPublishArticleCommandOutput>(
              CommandOutput.decode(publishArticleData).getOrElseL(errors => {
                throw new Error(failure(errors).join("\n"));
              }).hash
            )
          )
          .do(() => apolloClient.resetStore())
          .do(() => {
            analytics.track(
              canPublish ? "Publish Article" : "Propose Article Update",
              {
                category: "article_actions",
              }
            );
          })
          .mergeMap(() =>
            Observable.merge(
              Observable.of(
                showNotificationAction({
                  description: canPublish
                    ? `Your article has been published.`
                    : `Your article has been submitted for review.`,
                  message: canPublish
                    ? "Article Published"
                    : "Article submitted",
                  notificationType: "success",
                })
              ),
              Observable.of(
                routeChangeAction(
                  `/article/${id}/v${version}/${
                    !owner ||
                    (owner && owner.id === contributor) ||
                    getState()
                      .app.user.communities.map(({ community }) => community.id)
                      .includes(owner.id)
                      ? "article-published"
                      : "article-proposed"
                  }`
                )
              )
            )
          );
      }
    );
