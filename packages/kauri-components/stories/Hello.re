open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="My First Reason Story", ~decorators=[], ~_module, ());

myStory.add("first chapter", () =>
  <span> (ReasonReact.string("YEAH WHATEVER")) </span>
);

let hey = 1;

myStory.add("UpdatedAt", () => <PostedAt postType=PostedAt.Posted />);

myStory.add("Posted", () => <PostedAt postType=PostedAt.UpdatedAt />);

myStory.add("Index", () => <Index />);