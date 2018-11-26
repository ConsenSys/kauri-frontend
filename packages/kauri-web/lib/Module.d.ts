type NotificationType = "success" | "info" | "warning" | "error";

export function showNotificationAction(payload: {
  notificationType: NotificationType;
  message: string;
  description: string;
}): void;

export function routeChangeAction(url: string): void;

export const setNavcolorOverrideAction = any;

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
