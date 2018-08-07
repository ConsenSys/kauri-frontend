[@bs.module]
external homepage : ReasonReact.reactClass =
  "../../components/containers/Collection/View";

[@bs.deriving abstract]
type user = {username: string};

[@bs.deriving abstract]
type article = {
  article_id: string,
  date_created: string,
  subject: string,
  text: string,
  imageURL: string,
  user,
  profileImage: string,
  article_version: int,
};

module Styles = {
  let container =
    Css.(
      [%css
        {|
      {
          display: flexBox;
          flex-direction: column;
          width: 100%;
          text-align: center;
    }
    |}
      ]
    )
    |> Css.style;

  let section =
    Css.(
      [%css
        {|
  {
      width: 100%;
      display: flexBox;
      flex-direction: row;
      justify-content: center;
}
|}
      ]
    )
    |> Css.style;
};

let component = ReasonReact.statelessComponent("CollectionSection");

let make = (~routeChangeAction, ~name, ~description="", ~articles, _children) => {
  ...component,
  render: _self =>
    switch (articles) {
    | None => ReasonReact.null
    | Some(x) =>
      <div className=Styles.container>
        <Paragraph text=name size=22 />
        <Paragraph text=description />
        <div className=Styles.section>
          (
            Js.Array.map(
              article =>
                <ArticleCard
                  articleId=(article |. article_idGet)
                  articleVersion=(article |. article_versionGet)
                  key=(article |. article_idGet)
                  changeRoute=routeChangeAction
                  title=(article |. subjectGet)
                  content=(article |. textGet)
                  date=(
                    article
                    |. date_createdGet
                    |. MomentRe.moment
                    |. MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)))
                  )
                  username=(article |. userGet |. usernameGet)
                />,
              x,
            )
            |. ReasonReact.array
          )
        </div>
      </div>
    },
};

[@bs.deriving abstract]
type jsProps = {
  name: string,
  description: string,
  articles: Js.Nullable.t(array(article)),
  routeChangeAction: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      Js.log(jsProps);
      make(
        ~routeChangeAction=jsProps |. routeChangeActionGet,
        ~name=jsProps |. nameGet,
        ~description=jsProps |. descriptionGet,
        ~articles=jsProps |> articlesGet |> Js.Nullable.toOption,
        [||],
      );
    },
  );