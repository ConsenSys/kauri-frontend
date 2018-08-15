module FacebookShareButton = {
  [@bs.module "react-share"]
  external facebookShareButton : ReasonReact.reactClass =
    "FacebookShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    quote: string,
  };

  let make = (~url, ~quote, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=facebookShareButton,
      ~props=jsProps(~url, ~quote),
      children,
    );
};

module FacebookIcon = {
  [@bs.module "react-share"]
  external facebookShareButton : ReasonReact.reactClass = "FacebookIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=facebookShareButton,
      ~props={"size": 26, "round": true},
      children,
    );
};

module TwitterShareButton = {
  [@bs.module "react-share"]
  external twitterShareButton : ReasonReact.reactClass = "TwitterShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    title: string,
  };

  let make = (~url, ~title, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=twitterShareButton,
      ~props=jsProps(~url, ~title),
      children,
    );
};

module TwitterIcon = {
  [@bs.module "react-share"]
  external twitterIcon : ReasonReact.reactClass = "TwitterIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=twitterIcon,
      ~props={"size": 26, "round": true},
      children,
    );
};

module LinkedinShareButton = {
  [@bs.module "react-share"]
  external linkedInShareButton : ReasonReact.reactClass =
    "LinkedinShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    title: string,
  };

  let make = (~title, ~url, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=linkedInShareButton,
      ~props=jsProps(~url, ~title),
      children,
    );
};

module LinkedinIcon = {
  [@bs.module "react-share"]
  external linkedInIcon : ReasonReact.reactClass = "LinkedinIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=linkedInIcon,
      ~props={"size": 26, "round": true},
      children,
    );
};