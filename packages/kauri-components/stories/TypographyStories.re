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
    text=(Knobs.text(~label="Text", ~defaultValue="Nice heading", ()))
  />
);
myStory.add("Paragraph", () =>
  <Paragraph
    text=(Knobs.text(~label="Text", ~defaultValue="Nice paragraph!", ()))
  />
);
myStory.add("Label", () =>
  <Label text=(Knobs.text(~label="Text", ~defaultValue="Label Text", ())) />
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
myStory.add("Username handle - Article page type", () =>
  <Username pageType=Article username="@writereyes" />
);
myStory.add("Username handle - PublicProfile page type", () =>
  <Username pageType=PublicProfile username="@writereyes" />
);

myStory.add("FullName handle", () => <FullName fullName="Name Surname" />);
myStory.add("User title/Blurb", () =>
  <Blurb
    blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed cursus purus."
  />
);
myStory.add("PersonalWebsite", () =>
  <PersonalWebsite website="www.personalwebsite.com" />
);
myStory.add("Profile Header Label - Badges", () =>
  <ProfileHeaderLabel header="Badges" />
);
myStory.add("Profile Header Label - Contributor", () =>
  <ProfileHeaderLabel header="Contributor" />
);
myStory.add("Statistic Count", () =>
  <StatisticCount count=3 name="Article Views" />
);