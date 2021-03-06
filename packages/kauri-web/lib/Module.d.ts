import { ApolloClient } from "apollo-client";
import { IAddArticleToCollectionAction } from "../components/connections/AddToCollection/Module";
import IVoteAction from "../components/containers/Article/ApprovedArticle/VoteModule";
import { ICommunityCreatedAction } from "../components/containers/CreateCommunityForm/Module";

type NotificationType = "success" | "info" | "warning" | "error";

export interface IShowNotificationPayload {
  notificationType: NotificationType;
  message: string;
  description: string;
}

interface IShowNotificationAction {
  callback: undefined;
  type: "SHOW_NOTIFICATION";
  payload: IShowNotificationPayload;
}

export function showNotificationAction(
  payload: IShowNotificationPayload
): IShowNotificationAction;

interface IRouteChangeAction {
  callback: undefined;
  type: "ROUTE_CHANGE";
  payload: string;
}

export function routeChangeAction(url: string): IRouteChangeAction;

export const setNavcolorOverrideAction = any;

export interface IDependencies {
  apolloClient: ApolloClient<{}>;
  apolloSubscriber: <T>(
    hash: string,
    filterName?: string
  ) => Promise<{ data: { output: T } }>;
  apolloChildHashesSubscriber: <T>(
    childHashes: string[]
  ) => Array<Promise<{ data: { output: T } }>>;
  smartContracts: any;
  web3: any;
  fetch: any;
  web3PersonalSign: any;
  getGasPrice: any;
  driverJS: any;
  personalSign: (message: string) => Promise<string>;
}

export interface IAction {
  callback?: () => void | undefined;
  payload?: {};
  type: string;
}

export type Actions =
  | IVoteAction
  | IRouteChangeAction
  | IShowNotificationAction
  | ICommunityCreatedAction
  | IAddArticleToCollectionAction;

export interface IUser {
  id: string;
  avatar: string | null;
  username: string | null;
}

export interface ICommunity {
  role: string;
  community: {
    id: string;
    name: string;
    members: Array<{
      id: string;
      role: string;
    }>;
  };
}

export type ICommunities = ICommunity[];

export interface IReduxState {
  app: {
    hostName: string;
    user: {
      id: string;
      avatar: string;
      username: string;
      communities: ICommunity[];
      status: string; // [NOT_REGISTERED|CREATED]EMAIL_VERIFIED]
    };
  };
}
