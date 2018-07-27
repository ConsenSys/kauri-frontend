open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Articles", ~decorators=[], ~_module, ());

myStory.add("Two line title", () => <ArticleTwoLineTitle />);