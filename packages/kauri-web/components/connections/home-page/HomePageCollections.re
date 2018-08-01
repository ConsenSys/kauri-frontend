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

let component = ReasonReact.statelessComponent("HomePageCollections");

let sumArticles = sections =>
  switch (sections) {
  | Some(sections) =>
    Js.Array.reduce(
      (a, b) => {
        let hey = b |? (b => b##articles);
        switch (hey) {
        | Some(a) => Js.Array.length(a)
        | None => 0
        };
      },
      0,
      sections,
    )
  };

let renderCollectionCards = response =>
  switch (response##searchCollections |? (x => x##content)) {
  | Some(content) =>
    content
    |> Js.Array.map(collection =>
         <CollectionCard
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

let make = _children => {
  ...component,
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
                 (renderCollectionCards(response))
               </div>
             }
         )
    </GetCollectionQuery>;
  },
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make());