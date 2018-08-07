open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Typography", ~decorators=[Knobs.withKnobs], ~_module, ());

myStory.add("Heading", () => <Heading
    text=Knobs.text(~label="Text", ~defaultValue="Nice heading", ()) />);
myStory.add("Paragraph", () => <Paragraph
    text=Knobs.text(~label="Text", ~defaultValue="Nice paragraph!", ()) />);
myStory.add("Label", () => <Label 
    text=Knobs.text(~label="Text", ~defaultValue="Label Text", ()) />);