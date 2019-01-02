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
  min-width: ${(props: ITabContainerProps) => props.minWidth};
`;

interface ITabsProps {
  padContent: boolean;
  centerTabs?: boolean;
  bg: string;
}
const Tabs = styled<ITabsProps, "div">("div")`
  height: 50px;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme && props.theme.bg[props.bg]};
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

interface IProps {
  tabs: string[];
  panels: Element[] | JSX.Element[];
  padContent?: boolean;
  centerTabs?: boolean;
  bg?: string;
  minWidth?: string;
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
  }

  public changeTab(index: number) {
    this.setState({ selectedTabIndex: index });
  }

  public render() {
    const props = this.props;
    const {
      padContent = true,
      bg = "bgSecondary",
      minWidth,
      centerTabs,
    } = this.props;

    const handleClick = (index: number) => () => this.changeTab(index);

    return (
      <TabContainer minWidth={minWidth}>
        <Tabs bg={bg} padContent={padContent} centerTabs={centerTabs}>
          {this.props.tabs.map((tab, index) => (
            <Tab
              key={index}
              minWidth={minWidth}
              selected={index === this.state.selectedTabIndex}
              onClick={handleClick(index)}
            >
              {tab}
            </Tab>
          ))}
        </Tabs>
        {props.panels[this.state.selectedTabIndex]}
      </TabContainer>
    );
  }
}

export default TabsComponent;
