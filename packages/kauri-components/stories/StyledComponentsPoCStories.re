module type StyledConfig = {
  type pageType;
  /* let getParamsType: string => list(Css.rule); */
  let style: option(pageType) => list(Css.rule);
};

/* ReasonReact.createElement(); */
module Styled = {
  module Div = (Config: StyledConfig) => {
    let component = ReasonReact.statelessComponent("Div");
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
};

module Wrapper =
  Styled.Div({
    type pageType = [ | `White | `Black];

    let getPageStyle = pageType =>
      switch (pageType) {
      | `White => Css.[background(hex("FFFFFF"))]
      | `Black => Css.[background(black)]
      | _ => Css.[background(pink)]
      };

    let baseStyle =
      Css.[flex(1), flexDirection(`column), justifyContent(`center)];

    let style = pageType =>
      switch (pageType) {
      | Some(pageType) => List.append(getPageStyle(pageType), baseStyle)
      | None => baseStyle
      };
  });

module BasicWrapper =
  Styled.Div({
    type pageType = unit;
    let style = _ => Css.[background(black)];
  });

open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(
    ~title="StyledComponents Functor PoC",
    ~decorators=[],
    ~_module,
    (),
  );

myStory.add("With Base Style", () =>
  <div> <Wrapper> <p> "White"->ReasonReact.string </p> </Wrapper> </div>
);

myStory.add("With Styled Prop", () =>
  <div>
    <Wrapper pageType=`White> <p> "White"->ReasonReact.string </p> </Wrapper>
  </div>
);

myStory.add("With Black Styled Prop", () =>
  <div>
    <Wrapper pageType=`Black> <p> "White"->ReasonReact.string </p> </Wrapper>
  </div>
);

myStory.add("With String Styled Prop and Override", () =>
  <div>
    <Wrapper pageType=`Black style=Css.[background(blue)]>
      <p> "White"->ReasonReact.string </p>
    </Wrapper>
  </div>
);

myStory.add("Basic wrapper", () =>
  <BasicWrapper> <p> "Black"->ReasonReact.string </p> </BasicWrapper>
);