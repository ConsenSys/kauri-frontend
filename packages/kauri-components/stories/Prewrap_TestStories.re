open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Prewrap", ~decorators=[], ~_module, ());

myStory.add("example", () => <Prewrap />);