open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(
    ~title="Typography",
    ~decorators=[Knobs.withKnobs],
    ~_module,
    (),
  );

myStory.add("Heading", () =>
  <Heading
    text={Knobs.text(~label="Text", ~defaultValue="Nice heading", ())}
  />
);
myStory.add("Paragraph", () =>
  <Paragraph
    text={Knobs.text(~label="Text", ~defaultValue="Nice paragraph!", ())}
  />
);
myStory.add("Label", () =>
  <Label text={Knobs.text(~label="Text", ~defaultValue="Label Text", ())} />
);
myStory.add("Posted From Now", () =>
  <PostedDate
    date_field="2018-07-25T14:28:36.532Z"
    dateType=PostedDate.FromNow
  />
);

myStory.add("Posted Date", () =>
  <PostedDate
    date_field="2018-07-25T14:28:36.532Z"
    dateType=PostedDate.Posted
  />
);

myStory.add("Updated Date", () =>
  <PostedDate
    date_field="2018-07-25T14:28:36.532Z"
    dateType=PostedDate.Updated
  />
);

myStory.add("Profile Header Label - Badges", () =>
  <ProfileHeaderLabel header="Badges" />
);
myStory.add("Profile Header Label - Contributor", () =>
  <ProfileHeaderLabel header="Contributor" />
);