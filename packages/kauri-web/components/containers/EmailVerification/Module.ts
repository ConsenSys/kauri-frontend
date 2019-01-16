import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
// import { showNotificationAction } from '../../../lib/Module';
import { IDependencies } from "../../../lib/Module";

// @ts-ignore
import { mockQuery } from "../../../queries/User";
// @ts-ignore
import { mockQueryType } from "../../../queries/__generated__/User";

interface IVerifyEmailAction {
  type: "VERIFY_EMAIL";
  uuid: string;
}

const VERIFY_EMAIL = "VERIFY_EMAIL";

export const verifyEmail = (uuid: string): IVerifyEmailAction => ({
  type: VERIFY_EMAIL,
  uuid,
});

export const verifyEmailEpic: Epic<any, {}, IDependencies> = (
  action$,
  _,
  { apolloClient }
) =>
  action$.ofType(VERIFY_EMAIL).switchMap(
    ({ uuid }: IVerifyEmailAction) =>
      Observable.fromPromise(
        apolloClient.mutate<mockQueryType>({
          mutation: mockQuery,
          variables: { uuid },
        })
      )
    // .mergeMap(({ data: { cancelArticle } }) =>
    //     apolloSubscriber<IDeleteDraftArticleCommandOutput>(
    //     CommandOutput.decode(cancelArticle).getOrElseL(errors => {
    //         throw new Error(failure(errors).join('\n'));
    //     }).hash
    //     )
    // )
  );
