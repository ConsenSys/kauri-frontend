let component = ReasonReact.statelessComponent("UserWidgetSmall");

module Styles = {
  let container =
    Css.(
      [%css
        {|{ display: flexBox; flex-direction: row; align-items: center; margin: 10px 0px 10px 0px}|}
      ]
    )
    |> Css.style;
  let image =
    Css.(
      [%css
        {|{height: 30px;width: 30px;border-radius: 15px; margin-right: 8px}|}
      ]
    )
    |> Css.style;

  let username =
    Css.([%css {|{font-size: 14px; font-weight: 700}|}]) |> Css.style;
};

let make = (~username, ~profileImage, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <img className=Styles.image src=profileImage />
      <div className=Styles.username> (ReasonReact.string(username)) </div>
    </div>,
};