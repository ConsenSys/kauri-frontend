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
  ${props => props.padContent && "padding: 0px calc((100vw - 1280px) / 2)"};
  ${props => props.centerTabs && "justify-content: center"};
`;

interface ITabProps {
  selected: boolean;
  theme?: ITheme;
  minWidth?: string;
}

const Tab = styled<ITabProps, "div">("div")`
  margin: 0px ${props => props.theme && props.theme.space[2]}px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: ${props => (props.selected ? "4px solid #0ba986" : "none")};
  padding-top: ${props => (props.selected ? "4px" : 0)};
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes[1]}px;
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
  hash?: number;
  router?: any;
}

interface IState {
  selectedTabIndex: number;
}

class TabsComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedTabIndex: props.hash ? props.hash : 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  public changeTab(index: number) {
    if (this.props.router) {
      const { push, asPath } = this.props.router;
      const url = asPath.split("#")[0];
      push(url + `#${index}`);
    }

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
      hash,
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
                  selected={
                    hash
                      ? index === hash
                      : index === this.state.selectedTabIndex
                  }
                  onClick={() => this.handleClick(index, tab)}
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
