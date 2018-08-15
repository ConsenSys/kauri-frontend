open Jest;

Enzyme.configureEnzyme(Enzyme.react_16_adapter());

let setup = (~title="Test", ~handleClick=_evt => (), ()) =>
  Enzyme.shallow(<DummyComponent title handleClick />);

let header = wrapper => wrapper |> Enzyme.find("#header") |> Enzyme.first;

let listItems = wrapper =>
  wrapper |> Enzyme.find("#list") |> Enzyme.children;

describe(
  "DummyComponent",
  () => {
    open Expect;

    test(
      "renders a #header",
      () => {
        let title = "A test title";
        let wrapper = setup(~title, ());
        let headerNodes = wrapper |> header;
        expect(Enzyme.length(headerNodes)) |> toBe(1);
      },
    );

    test(
      "has the expected h1 tag in the #header",
      () => {
        let title = "A test title";
        let wrapper = setup(~title, ());
        let expectedNode = <h1> (ReasonReact.string(title)) </h1>;
        expect(Enzyme.contains(expectedNode, wrapper)) |> toBe(true);
      },
    );

    test(
      "initially has its `clicked` state set to false",
      () => {
        let wrapper = setup();
        let {clicked}: DummyComponent.state = Enzyme.state(wrapper);
        expect(clicked) |> toBe(false);
      },
    );
    /*

     Commented out since I changed the functionaltiy of the onClick for the latter sleep

      test("initially has its `clicked` state set to false but can be clicked", () => {
        let wrapper = setup();
        let hey = wrapper |> Enzyme.find("#click-me");
        hey |> Enzyme.simulate("click");
        let {clicked}: DummyComponent.state = Enzyme.state(wrapper);
        expect(clicked) |> toBe(true);
      }); */

    test(
      "folds left properly",
      () => {
        let items = setup() |> listItems;
        let result =
          Enzyme.foldLeft(
            (text, node) => text ++ Enzyme.text(node),
            "",
            items,
          );
        expect(result) |> toBe("OneTwoThree");
      },
    );

    test(
      "takes a handleClick and executes it when clicked properly",
      () => {
        let spy = ref(0);
        let incSpy = () => spy := spy^ + 1;
        let setup = (~title="Test", ~handleClick=_evt => incSpy(), ()) =>
          Enzyme.shallow(<DummyComponent title handleClick />);
        let wrapper = setup();
        wrapper |> Enzyme.find("#click-me") |> Enzyme.simulate("click");
        expect(spy^) |> toBe(1);
      },
    );
  },
);