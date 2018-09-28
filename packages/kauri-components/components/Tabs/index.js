// @flow
import * as React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div``;

const Tabs = styled.div`
    height: 50px;
    width: 100%;
    background-color: #1E3D3B;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px calc((100vw - 1280px) / 2);
`;

const Panels = styled.div``;

const Tab = styled.div`
    padding: 0px 20px;
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
    panels: Array<React.Node>,
  }

type State = {
    selectedTabIndex: number,
};

class TabsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTabIndex: 0,
        }
    }

    changeTab(index: number) {
        this.setState({ selectedTabIndex: index });
    }

    render () {
        const index = this.state.selectedTabIndex;
        const props = this.props;
        return (
            <TabContainer>
                <Tabs>
                    {this.props.tabs.map((tab, index) =>
                        <Tab key={index}
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