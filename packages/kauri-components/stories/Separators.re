open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(
    ~title="Separators",
    ~decorators=[Knobs.withKnobs],
    ~_module,
    (),
  );

myStory.add("Separator", () =>
  <BaseCard>
    <Separator
      direction=(
        Knobs.text(~label="Direction", ~defaultValue="horizontal", ())
      )
    />
  </BaseCard>
);