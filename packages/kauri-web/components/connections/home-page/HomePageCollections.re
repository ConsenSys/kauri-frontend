open Infix_Utilities;

[@bs.module]
external homepage: ReasonReact.reactClass =
  "../../components/containers/Homepage/View";

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

type action =
  | Any;

module Styles = {
  let container = HomePageArticles.Styles.container;
  let sectionTitle = HomePageArticles.Styles.sectionTitle;
};

let component = ReasonReact.reducerComponent("HomePageCollections");

let sumArticles = sections =>
  switch (sections) {
  | Some(sections) =>
    Js.Array.reduce(
      (_current, next) => {
        let articles = next |? (next => next##articles);
        switch (articles) {
        | Some(articles) => Js.Array.length(articles)
        | None => 0
        };
      },
      0,
      sections,
    )
  | None => 0
  };

let renderCollectionCards = (~response, ~routeChangeAction) =>
  switch (response##searchCollections |? (x => x##content)) {
  | Some(content) =>
    (
      content
      |> Js.Array.map(collection =>
           <CollectionCard
             collectionId=(collection |? (x => x##id) |> default(""))
             changeRoute=routeChangeAction
             /* changeRoute={() => props.routeChangeAction(`/article/${props.data.searchArticles.content[0].article_id}`)} */
             key=(collection |? (collection => collection##id) |> default(""))
             collectionName=(
               collection |? (collection => collection##name) |> default("")
             )
             collectionDescription=(
               collection
               |? (collection => collection##description)
               |> default("")
             )
             articles=
               sumArticles(collection |? (collection => collection##sections))
               ->string_of_int
           />
         )
    )
    ->ReasonReact.array
  | None => <p> "No collections found boo"->ReasonReact.string </p>
  };

let make = (~routeChangeAction, _children) => {
  ...component,
  reducer: (action, state) =>
    switch (action) {
    | Any => ReasonReact.Update(state)
    },
  render: _self => {
    let collectionQuery =
      Collection_Queries.GetCollections.make(
        ~size=4,
        ~dir=`DESC,
        ~sort="date_created",
        (),
      );
    <Collection_Queries.GetCollectionQuery
      variables=collectionQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <div> (ReasonReact.string("Loading")) </div>
             | Error(error) =>
               <div> (ReasonReact.string(error##message)) </div>
             | Data(response) =>
               <div className=Styles.container>
                 <h1 className=Styles.sectionTitle>
                   (ReasonReact.string("Kauri Collections"))
                 </h1>
                 (renderCollectionCards(~response, ~routeChangeAction))
               </div>
             }
         )
    </Collection_Queries.GetCollectionQuery>;
  },
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~routeChangeAction=jsProps->routeChangeActionGet, [||])
  );