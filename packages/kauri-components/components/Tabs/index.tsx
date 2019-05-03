import * as React from "react";
import styled from "../../lib/styled-components";

interface ITheme {
  bg: { [val: string]: string };
  space: {
    [val: number]: number;
  };
}

interface ITabContainerProps {
  minWidth?: string;
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: ${(props: ITabContainerProps) => props.minWidth};
`;

interface ITabsProps {
  dark?: boolean;
  padContent: boolean;
  centerTabs?: boolean;
  bg: string;
  router?: any;
}
const Tabs = styled<ITabsProps, "div">("div")`
  height: 50px;
  width: 100%;
  color: ${props =>
    props.dark ? "white" : props.theme.colors.primaryTextColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.dark ? props.theme && props.theme.bg[props.bg] : "transparent"};
  ${props =>
    props.padContent &&
    `padding: 0px calc((100vw - ${props.theme.breakpoints[2]}) / 2)`};
  ${props => props.centerTabs && "justify-content: center"};
  > :not(:last-child) {
    margin-right: ${props => props.theme && props.theme.space[2]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: 0px ${props => props.theme.space[1]}px;
  }
`;

interface ITabProps {
  selected: boolean;
  theme?: ITheme;
  minWidth?: string;
}

const Tab = styled<ITabProps, "div">("div")`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: ${props => (props.selected ? "4px solid #0ba986" : "none")};
  padding-top: ${props => (props.selected ? "4px" : 0)};
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes[0]}px;
`;

interface ITab {
  name: string;
  callback?: (args?: any) => void;
}

interface IProps {
  tabs: Array<ITab | null>;
  panels: Element[] | JSX.Element[];
  padContent?: boolean;
  centerTabs?: boolean;
  bg?: string;
  minWidth?: string;
  dark?: boolean;
  router?: any;
  passChangeTabFunction?: (func: any) => void;
}

interface IState {
  selectedTabIndex: number;
}

class TabsComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidMount() {
    if (this.props.passChangeTabFunction) {
      this.props.passChangeTabFunction(this.changeTab.bind(this));
    }
  }

  public changeTab(index: number) {
    this.setState({ selectedTabIndex: index });
  }

  public handleClick(index: number, tab: ITab) {
    this.changeTab(index);
    if (tab.callback) {
      tab.callback();
    }
  }

  public render() {
    const props = this.props;
    const {
      padContent = true,
      bg = "bgSecondary",
      minWidth,
      centerTabs,
      dark,
    } = this.props;

    return (
      <TabContainer minWidth={minWidth}>
        <Tabs
          dark={dark}
          bg={bg}
          padContent={padContent}
          centerTabs={centerTabs}
        >
          {this.props.tabs.map(
            (tab, index) =>
              tab && (
                <Tab
                  key={index}
                  minWidth={minWidth}
                  onClick={() => this.handleClick(index, tab)}
                  selected={index === this.state.selectedTabIndex}
                >
                  {tab.name}
                </Tab>
              )
          )}
        </Tabs>
        {props.panels[this.state.selectedTabIndex]}
      </TabContainer>
    );
  }
}

export default TabsComponent;
