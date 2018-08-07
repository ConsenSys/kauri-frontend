module GetArticle = [%graphql
  {|
  query getArticle($id: String!) {
      getArticle(id: $id) {
        article_id
        text
      }
  }
|}
];

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

/* module GetArticleQuery = ReasonApollo.CreateQuery(GetArticle);

   let component = ReasonReact.statelessComponent("Greeting");

   let make = _children => {
     ...component,
     render: _ => {
       let pokemonQuery = GetArticle.make(~id="Pikachu", ());
       <GetArticleQuery variables=pokemonQuery##variables>
         ...(
              ({result}) =>
                switch (result) {
                | Loading => <div> (ReasonReact.string("Loading")) </div>
                | Error(error) =>
                  <div> (ReasonReact.string(error##message)) </div>
                | Data(response) =>
                  switch (response##getArticle |? (a => a##article_id)) {
                  | Some(value) => <div> (ReasonReact.string(value)) </div>

                  | _ => <div> (ReasonReact.string("lol")) </div>
                  }
                }
            )
       </GetArticleQuery>;
     },
   }; */