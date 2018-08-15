open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="TagList", ~decorators=[], ~_module, ());

myStory.add("List of tags", () =>
  <TagList tags=[|"test", "foo", "bar", "ethereum"|] />
);