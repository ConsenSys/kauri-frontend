let hey = MomentRe.(momentNow());
let component = ReasonReact.statelessComponent("Greeting");

module Styles = {
  open Css;
  let baseCard = [%css
    {|
      {
        display: flexBox;
        flex-direction: column;
        padding-top: 11px;
        padding-bottom: 11px;
        border-radius: 4px;
        box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.11);
        background: rgb(255, 255, 255);
    }
    |}
  ];

  let calcCardWidth = cardWidth =>
    switch (cardWidth) {
    | Some(cardWidth) => cardWidth |. int_of_string |. px
    | None => 15 |. px
    };
  let blackCard = cardWidth => [%css
    {|
    {
      background-color: black;
      width: calcCardWidth(cardWidth);
    }
  |}
  ];
  let card = (~cardWidth: option(string), ~color: string) => {
    let cardCssRules =
      color === "black" ?
        List.(concat([baseCard, blackCard(cardWidth)]) |. rev) : baseCard;
    cardCssRules |. style;
  };
};

let make = _children => {
  ...component,
  render: _self =>
    Vrroom.(
      <div className=(Styles.card(~cardWidth=Some("52"), ~color="black"))>
        <div className="articles-0-0-0">
          <div className="articles-posted_3">
            ("posted 3 june 2018" |> text)
          </div>
        </div>
        <div className="articles-0-0-1">
          <div className="articles-two_line_title_two_l_copy-1">
            <div> ("Two line title" |> text) </div>
            <div> ("Two line title" |> text) </div>
          </div>
        </div>
        <div className="articles-0-0-2">
          <div className="articles-three_line_descripti_copy-1">
            <div> ("Three line description" |> text) </div>
            <div> ("Three line description" |> text) </div>
            <div> ("Three line description" |> text) </div>
          </div>
        </div>
        <div className="articles-0-0-3">
          <img
            src="https://pagedraw-images.s3-us-west-1.amazonaws.com/2534017087978734-1531049880527-900E794B-60FC-4FA7-A677-24647C609992.png"
            className="articles-line_4"
          />
        </div>
        <div className="articles-0-0-4">
          <div className="articles-0-0-4-0">
            <div className="articles-0-0-4-0-0">
              <img
                src="https://pagedraw-images.s3-us-west-1.amazonaws.com/3530107108107375-1531049880528-093E1245-F5F7-44E8-AD88-CA742897C6C3.png"
                className="articles-oval_copy_1"
              />
            </div>
          </div>
          <div className="articles-0-0-4-1">
            <div className="articles-0-0-4-1-0">
              <div className="articles-username_copy_2">
                ("username" |> text)
              </div>
            </div>
          </div>
          <div className="articles-0-0-4-2">
            <div className="articles-0-0-4-2-0">
              <div className="articles-0-3"> ("0" |> text) </div>
            </div>
            <div className="articles-0-0-4-2-1">
              <div className="articles-up_votes-8"> ("up votes" |> text) </div>
            </div>
          </div>
          <div className="articles-0-0-4-3">
            <div className="articles-0-0-4-3-0">
              <div className="articles-0-1"> ("0" |> text) </div>
            </div>
            <div className="articles-0-0-4-3-1">
              <div className="articles-views_copy_2"> ("views" |> text) </div>
            </div>
          </div>
        </div>
      </div>
    ),
};