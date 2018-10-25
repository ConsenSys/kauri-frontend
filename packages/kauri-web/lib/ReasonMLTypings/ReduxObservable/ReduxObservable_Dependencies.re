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

type getGasPrice = unit => Js.Promise.t(int);

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

module OffchainEvent = {
  [@bs.deriving abstract]
  type submitArticle = {
    id: string,
    version: int,
  };

  type offchainEventResponseData;

  [@bs.get]
  external submitArticleResponseGet: offchainEventResponseData => submitArticle =
    "output";

  [@bs.deriving abstract]
  type response = {data: offchainEventResponseData};
};

[@bs.send]
external subscribeToOffchainEvent:
  (dependencies, string) => Js.Promise.t(OffchainEvent.response) =
  "apolloSubscriber";

[@bs.deriving jsConverter]
type smartContractEvent = [ | [@bs.as "ArticlePublished"] `ArticlePublished];

[@bs.send]
external _subscribeToOnchainEvent:
  (dependencies, string, string) => Js.Promise.t(string) =
  "apolloSubscriber";

let subscribeToOnchainEvent = (dependencies, hash, eventFilter) =>
  _subscribeToOnchainEvent(
    dependencies,
    hash,
    smartContractEventToJs(eventFilter),
  );