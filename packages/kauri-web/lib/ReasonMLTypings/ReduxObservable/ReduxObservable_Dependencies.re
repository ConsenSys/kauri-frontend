type apolloClient;

[@bs.deriving abstract]
type smartContractInstances = {
  [@bs.as "KauriCore"]
  kauriCore: KauriCore.deployedContract,
};

type smartContracts = unit => smartContractInstances;

[@bs.deriving abstract]
type eth = {accounts: array(string)};

[@bs.deriving abstract]
type web3 = {eth};

type fetch;

type apolloSubscriber;

type web3PersonalSign;

type personalSign = string => Js.Promise.t(string);

type getGasPrice;

type driverJS;

/* [@bs.deriving abstract]
   type store = {dispatch: string => unit}; */

/* [@bs.send] external dispatch : (store, string) => unit = ""; */
/* [@bs.deriving abstract]
   type store = {dispatch: string => unit}; */
/* open ApolloClient; */
[@bs.deriving abstract]
type dependencies = {
  apolloClient: ApolloClient.generatedApolloClient,
  smartContracts,
  web3,
  fetch,
  apolloSubscriber,
  web3PersonalSign,
  personalSign,
  getGasPrice,
  driverJS,
};

[@bs.splice] [@bs.send]
external subscribeToOffchainEvent :
  (dependencies, array(string)) => Js.Promise.t(string) =
  "apolloSubscriber";