module type StyledConfig = {
  type pageType;
  let displayName: string;
  /* let getParamsType: string => list(Css.rule); */
  let style: option(pageType) => list(Css.rule);
};

/* ReasonReact.createElement(); */
module Div = (Config: StyledConfig) => {
  let component = ReasonReact.statelessComponent(Config.displayName);
  module MyElement = {
    let make = (~style, children) => {
      ...component,
      render: _self =>
        ReactDOMRe.createElementVariadic(
          "div",
          ~props=ReactDOMRe.objToDOMProps({"className": style}),
          children,
        ),
    };
  };
  let make = (~pageType=?, ~style as additionalStyle=[]) =>
    MyElement.make(
      ~style=
        Css.style(List.append(additionalStyle, Config.style(pageType))),
    );
};

module Img = (Config: StyledConfig) => {
  let component = ReasonReact.statelessComponent(Config.displayName);
  module MyElement = {
    let make = (~style, ~src, children) => {
      ...component,
      render: _self =>
        ReactDOMRe.createElementVariadic(
          "img",
          ~props=ReactDOMRe.objToDOMProps({"className": style, "src": src}),
          children,
        ),
    };
  };
  let make = (~pageType=?, ~style as additionalStyle=[], ~src) =>
    MyElement.make(
      ~style=
        Css.style(List.append(additionalStyle, Config.style(pageType))),
      ~src,
    );
};

module H2 = (Config: StyledConfig) => {
  let component = ReasonReact.statelessComponent(Config.displayName);
  module MyElement = {
    let make = (~style, children) => {
      ...component,
      render: _self =>
        ReactDOMRe.createElementVariadic(
          "h2",
          ~props=ReactDOMRe.objToDOMProps({"className": style}),
          children,
        ),
    };
  };
  let make = (~pageType=?, ~style as additionalStyle=[]) =>
    MyElement.make(
      ~style=
        Css.style(List.append(additionalStyle, Config.style(pageType))),
    );
};

module A = (Config: StyledConfig) => {
  let component = ReasonReact.statelessComponent(Config.displayName);
  module MyElement = {
    let make = (~href, ~style, children) => {
      ...component,
      render: _self =>
        ReactDOMRe.createElementVariadic(
          "a",
          ~props=ReactDOMRe.objToDOMProps({"className": style, "href": href}),
          children,
        ),
    };
  };
  let make = (~href, ~pageType=?, ~style as additionalStyle=[]) =>
    MyElement.make(
      ~href,
      ~style=
        Css.style(List.append(additionalStyle, Config.style(pageType))),
    );
};