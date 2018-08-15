type action =
  | Click;
type state = {clicked: bool};

let se = ReasonReact.string;

let component = ReasonReact.reducerComponent("DummyComponent");

let make = (~title, ~handleClick, _children) => {
  ...component,
  initialState: () => {clicked: false},
  reducer: (action, _state) =>
    switch (action) {
    | Click => ReasonReact.Update({clicked: true})
    },
  render: ({state}) =>
    <div className="dummy">
      <div id="header"> <h1> (se(title)) </h1> </div>
      <div id="content">
        <button id="click-me" onClick=(_ => handleClick())>
          (se(state.clicked ? "I've been clicked!" : "Click Me!"))
        </button>
        <ul id="list">
          <li> (se("One")) </li>
          <li> (se("Two")) </li>
          <li> (se("Three")) </li>
        </ul>
      </div>
    </div>,
};