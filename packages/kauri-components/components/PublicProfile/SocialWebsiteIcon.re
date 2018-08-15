let component = ReasonReact.statelessComponent("SocialWebsiteIcon");

let calcHeight = height =>
  switch (height) {
  | Some(height) => height
  | None => "20"
  };

let make = (~socialURL, ~brand, ~height, _children) => {
  ...component,
  render: _self => {
    let height = calcHeight(height);
    <a href=socialURL>
      <img
        style=(ReactDOMRe.Style.make(~filter="invert(100%)", ()))
        height
        width=height
        src={j|https://unpkg.com/simple-icons@latest/icons/$brand.svg|j}
      />
    </a>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  brand: string,
  height: Js.Nullable.t(string),
  socialURL: string,
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let height = Js.Nullable.toOption(jsProps |. heightGet);

      make(
        ~brand=jsProps |. brandGet,
        ~height,
        ~socialURL=jsProps |. socialURLGet,
        [||],
      );
    },
  );