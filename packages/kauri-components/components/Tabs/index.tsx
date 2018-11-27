import * as React from 'react';
import styled from 'styled-components';

interface ITheme {
  bg: {[val: string]: string}
  space: {
    [val: number]: number;
  };
};

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
  theme?: ITheme;
}
const Tabs = styled.div`
    height: 50px;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${(props: ITabsProps) => props.theme && props.theme.bg[props.bg]};
    ${props => props.padContent && 'padding: 0px calc((100vw - 1280px) / 2)'};
    ${props => props.centerTabs && 'justify-content: center'};
`;

interface ITabProps {
  selected: boolean;
  theme?: ITheme;
  minWidth?: string;
}
const Tab = styled.div`
    margin: 0px ${(props: ITabProps) => props.theme && props.theme.space[2]}px;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: ${props => props.selected ? '4px solid #0ba986' : 'none'};
    padding-top: ${props => props.selected ? '4px' : 0};
    cursor: pointer;
    font-weight: 700;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSizes[1]}px;
`;

type Props = {
    tabs: Array<String>,
    panels: Element[],
    padContent?: boolean,
    centerTabs?: boolean,
    bg?: string,
    minWidth?: string
  }

type State = {
    selectedTabIndex: number,
};

class TabsComponent extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    }
  }

  changeTab (index: number) {
    this.setState({ selectedTabIndex: index });
  }

  render () {
    const index = this.state.selectedTabIndex;
    const props = this.props;
    const { padContent = true, bg = 'bgSecondary', minWidth, centerTabs } = this.props

    return (
      <TabContainer
        minWidth={minWidth}
      >
        <Tabs
          bg={bg}
          padContent={padContent}
          centerTabs={centerTabs}
        >
          {this.props.tabs.map((tab, index) =>
            <Tab key={index}
              minWidth={minWidth}
              selected={index === this.state.selectedTabIndex}
              onClick={() => this.changeTab(index)}
            >
              {tab}
            </Tab>)}
        </Tabs>
        {props.panels[index]}
      </TabContainer>
    );
  }
}

export default TabsComponent;
