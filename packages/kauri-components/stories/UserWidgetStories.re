open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(
    ~title="User Widget",
    ~decorators=[Knobs.withKnobs],
    ~_module,
    (),
  );

myStory.add("Small", () =>
  <UserWidgetSmall
    pageType=None
    username="davodesign84"
    profileImage="https://randomuser.me/api/portraits/women/51.jpg"
  />
);