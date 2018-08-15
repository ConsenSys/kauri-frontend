open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Outline Headings", ~decorators=[], ~_module, ());

myStory.add("Outline Header", () => <OutlineHeader />);
myStory.add("Outline Headings", () =>
  <OutlineHeadings
    headings=[|"Intro", "Turning Web3.js functions into JavaScript promises"|]
  />
);
myStory.add("Outline", () =>
  <Outline
    pageType=None
    routeChangeAction=(_ => ())
    userId="0x1337"
    headings=[|"Intro", "Turning Web3.js functions into JavaScript promises"|]
    username="rej156"
  />
);

myStory.add("Outline on SubmittingArticle page", () =>
  <Outline
    pageType=(Some("SubmittingArticle"))
    routeChangeAction=(_ => ())
    userId="0x1337"
    headings=[||]
    username="rej156"
  />
);