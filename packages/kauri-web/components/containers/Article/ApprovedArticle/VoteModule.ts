import { Observable } from "rxjs/Observable";
import {
  showNotificationAction,
  IDependencies,
  IReduxState,
  Actions,
} from "../../../../lib/Module";
import { Epic } from "redux-observable";
import { vote as voteMutation } from "../../../../queries/Article";
import { vote, voteVariables } from "../../../../queries/__generated__/vote";
import analytics from "../../../../lib/analytics";

// import { // } from '../../../../queries/Article';

export interface IVoteAction {
  type: string;
  payload: voteVariables;
  callback?: any;
}

const VOTE = "VOTE";

export const voteAction = (payload: voteVariables): IVoteAction => ({
  payload,
  type: VOTE,
});

export const voteEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _: any,
  { apolloClient, apolloSubscriber }
) =>
  action$.ofType(VOTE).switchMap(({ payload }: IVoteAction) =>
    Observable.fromPromise(
      apolloClient.mutate<vote, voteVariables>({
        mutation: voteMutation,
        variables: payload,
      })
    )
      .mergeMap(({ data: { vote: { hash } } }) => apolloSubscriber(hash))
      .do(() =>
        analytics.track("Vote Content", {
          category: "article_actions",
          type: payload.value === 1 ? "Upvoted" : "Downvoted",
        })
      )
      .do(() => apolloClient.resetStore())
      .mergeMap(() =>
        Observable.of(
          showNotificationAction({
            description:
              (payload as voteVariables) &&
              typeof payload.value === "number" &&
              payload.value > 0
                ? "Your vote has been counted! Thanks for your feedback!"
                : "Please leave a comment below with your feedback to the author to help them improve the article.",
            message: `Voted`,
            notificationType: "success",
          })
        )
      )
      .catch(err => {
        console.error(err);
        return Observable.of(
          showNotificationAction({
            description: "Please try again!",
            message: "Voting error",
            notificationType: "error",
          })
        );
      })
  );
