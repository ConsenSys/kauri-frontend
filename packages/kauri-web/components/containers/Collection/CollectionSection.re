[@bs.module "../../../routes"]
external linkComponent: Link.linkComponent = "Link";

[@bs.deriving abstract]
type author = {
  name: Js.Nullable.t(string),
  id: string,
};

[@bs.deriving abstract]
type article = {
  id: string,
  authorId: string,
  datePublished: string,
  title: string,
  content: string,
  imageURL: string,
  author,
  profileImage: Js.Nullable.t(string),
  version: int,
};

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        width(`percent(100.0)),
        textAlign(center),
      ])
    );

  let section =
    Css.(
      style([
        display(`flex),
        width(`percent(100.0)),
        flexDirection(row),
        justifyContent(center),
        flexWrap(`wrap),
      ])
    );
};

let component = ReasonReact.statelessComponent("CollectionSection");

let make = (~name, ~description="", ~articles, _children) => {
  ...component,
  render: _self =>
    switch (articles) {
    | None => ReasonReact.null
    | Some(articles) =>
      <div className=Styles.container>
        <Paragraph text=name size=22 />
        <Paragraph text=description />
        <div className=Styles.section>
          {
            Js.Array.map(
              article => {
                let (articleId, articleVersion) =
                  article->(idGet, versionGet);
                <ArticleCard
                  key=article->idGet
                  articleId
                  articleVersion
                  linkComponent={
                    (childrenProps, route) =>
                      <Link
                        useAnchorTag=true
                        linkComponent
                        toSlug={
                          route |> Js.String.includes("article") ?
                            Js.Nullable.return(article->titleGet) :
                            Js.Nullable.null
                        }
                        route>
                        ...childrenProps
                      </Link>
                  }
                  title=article->titleGet
                  content=article->contentGet
                  cardHeight=500
                  imageURL=article->imageURLGet
                  date=
                    article
                    ->datePublishedGet
                    ->MomentRe.moment
                    ->MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)))
                  username=article->authorGet->nameGet->Js.Nullable.toOption
                  userId=article->authorIdGet
                />;
              },
              articles,
            )
            |> ReasonReact.array
          }
        </div>
      </div>
    },
};

[@bs.deriving abstract]
type jsProps = {
  name: string,
  description: string,
  articles: Js.Nullable.t(array(article)),
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~name=jsProps->nameGet,
      ~description=jsProps->descriptionGet,
      ~articles=jsProps |> articlesGet |> Js.Nullable.toOption,
      [||],
    )
  );