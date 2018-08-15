open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tabs", ~decorators=[], ~_module, ());

let tabNames = [|"all", "general", "tutorials"|];

myStory.add("Basic", () =>
  BasicTabs.(
    <Tabs
      defaultTabName=(tabNames[0])
      tabs=(
        (setCurrentTabName, currentTabName) =>
          <TabList>
            <Tab setCurrentTabName currentTabName name=(tabNames[0])>
              "All"->String.uppercase->ReasonReact.string
            </Tab>
            <Tab setCurrentTabName currentTabName name=(tabNames[1])>
              "General Articles"->String.uppercase->ReasonReact.string
            </Tab>
            <Tab setCurrentTabName currentTabName name=(tabNames[2])>
              "Tutorials"->String.uppercase->ReasonReact.string
            </Tab>
            <PullRight>
              <Badge>
                "X Total Articles"->String.uppercase->ReasonReact.string
              </Badge>
            </PullRight>
          </TabList>
      )
      content=(
        currentTabName =>
          <PanelList>
            <Panel name=(tabNames[0]) currentTabName>
              <p> "Content"->ReasonReact.string </p>
            </Panel>
            <Panel name=(tabNames[1]) currentTabName>
              <p> "Content2"->ReasonReact.string </p>
            </Panel>
            <Panel name=(tabNames[2]) currentTabName>
              <p> "Content3"->ReasonReact.string </p>
            </Panel>
          </PanelList>
      )
    />
  )
);