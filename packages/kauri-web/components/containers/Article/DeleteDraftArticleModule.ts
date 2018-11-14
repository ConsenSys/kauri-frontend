import { Epic } from 'redux-observable';
import { showNotificationAction } from '../../../lib/Module';
import { Observable } from 'rxjs/Observable';
import { deleteDraftArticle } from './__generated__/deleteDraftArticle';
import { getArticleTitle } from './__generated__/getArticleTitle';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';

export const deleteDraftArticleMutation = gql`
  mutation deleteDraftArticle($id: String, $version: Int) {
    cancelArticle(id: $id, version: $version) {
      hash
    }
  }
`;

export const getArticleTitleQuery = gql`
  query getArticleTitle($id: String, $version: Int) {
    getArticle(id: $id, version: $version) {
      title
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
  personalSign: any;
}

interface IAction {
  type: string;
  payload?: {};
}

interface IDeleteDraftArticlePayload {
  id: string;
  version: number;
}

interface IDeleteDraftArticleAction extends IAction {
  type: 'DELETE_DRAFT_ARTICLE';
  payload: IDeleteDraftArticlePayload;
}

const DELETE_DRAFT_ARTICLE = 'DELETE_DRAFT_ARTICLE';

export const deleteDraftArticleAction = (
  payload: IDeleteDraftArticlePayload
): IDeleteDraftArticleAction => ({
  payload,
  type: DELETE_DRAFT_ARTICLE,
});

interface IDeleteDraftArticleCommandOutput {
  id: string;
  version: number;
}

export const deleteDraftArticleEpic: Epic<IAction, {}, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(DELETE_DRAFT_ARTICLE)
    .switchMap(({ payload: variables }: IDeleteDraftArticleAction) =>
      Observable.fromPromise(
        apolloClient.query<deleteDraftArticle>({
          query: deleteDraftArticleMutation,
          variables,
        })
      )
        .mergeMap(({ data: { cancelArticle: { hash } } }) =>
          apolloSubscriber<IDeleteDraftArticleCommandOutput>(hash)
        )
        .mergeMap(({ data: { output: { id, version } } }) =>
          apolloClient.query<getArticleTitle>({
            query: getArticleTitleQuery,
            variables: { id, version },
          })
        )
        .mergeMap(({ data: { getArticle: { title } } }) =>
          Observable.merge(
            Observable.of(
              showNotificationAction({
                description: `Your draft article "${title}" has been deleted!`,
                message: 'Draft article deleted',
                notificationType: 'success',
              })
            )
          )
        )
    );
