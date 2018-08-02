[@bs.module]
external homepage : ReasonReact.reactClass =
  "../../components/containers/Homepage/View";

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

type action =
  | Any;

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let (|??) = (a, b) =>
  switch (a) {
  | None => ""
  | Some(a) =>
    switch (b(a)) {
    | Some(a) => a
    | None => ""
    }
  };

module Styles = {
  let container =
    Css.(
      [%css
        {|
      {
          display: flexBox;
          flex-direction: row;
          justify-content: flex-start;
          padding: 10px;
          flex: 1;
          flex-wrap: wrap;
    }
    |}
      ]
    )
    |> Css.style;

  let sectionTitle =
    Css.([%css {|
  {
      width: 100%;
      text-align: center;
}
|}])
    |> Css.style;
};

module GetCollections = [%graphql
  {|
    query searchCollections ($size: Int) {
        searchCollections (size: $size) {
            content {
                id
                name
                description
                date_created
                owner_id
                sections {
                    name
                    description
                    article_id
                    articles {
                        article_id,
                        subject,
                        article_version
                    }
                }
            }
            totalPages
            totalElements
        }
    }
|}
];

module GetCollectionQuery = ReasonApollo.CreateQuery(GetCollections);

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
    content
    |> Js.Array.map(collection =>
         <CollectionCard
           collectionId=(collection |?? (x => x##id))
           changeRoute=routeChangeAction
           /* changeRoute={() => props.routeChangeAction(`/article/${props.data.searchArticles.content[0].article_id}`)} */
           key=(collection |?? (collection => collection##id))
           collectionName=(collection |?? (collection => collection##name))
           collectionDescription=(
             collection |?? (collection => collection##description)
           )
           articles=(
             sumArticles(collection |? (collection => collection##sections))
             |. string_of_int
           )
         />
       )
    |. ReasonReact.array
  | None => <p> ("No collections found boo" |. ReasonReact.string) </p>
  };

let make = (~routeChangeAction, _children) => {
  ...component,
  reducer: (action, state) =>
    switch (action) {
    | Any => ReasonReact.Update(state)
    },
  render: _self => {
    let collectionQuery = GetCollections.make(~size=4, ());
    <GetCollectionQuery variables=collectionQuery##variables>
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
    </GetCollectionQuery>;
  },
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~routeChangeAction=jsProps |. routeChangeActionGet, [||])
  );

/* make(~user=jsProps, [||]) */