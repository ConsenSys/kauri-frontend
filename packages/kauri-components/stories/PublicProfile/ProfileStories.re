open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Profile", ~decorators=[], ~_module, ());

myStory.add("Profile Statistics", () =>
  <StatisticsContainer
    statistics=[|
      {"name": "Articles", "count": 1},
      {"name": "Article Views", "count": 4832},
      {"name": "Upvotes", "count": 1000},
      {"name": "Followers", "count": 4240000},
    |]
  />
);

myStory.add("Collection Statistics", () =>
  <div
    className=Css.(
      style([display(`inlineBlock), backgroundColor(hex("1E2428"))])
    )>
    <StatisticsContainer
      pageType=StatisticsContainer.CollectionPage
      statistics=[|
        {"name": "Articles", "count": 0},
        {"name": "Views", "count": 0},
        {"name": "Upvotes", "count": 0},
        {"name": "Followers", "count": 0},
      |]
    />
  </div>
);