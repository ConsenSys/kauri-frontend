import React, { Component } from 'react';
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
`;

class TabsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabIndex: 0,
        }
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(index) {
        this.setState({ selectedTabIndex: index });
    }

    render () {
        return (
            <TabContainer>
                <Tabs>
                    {this.props.tabs.map((tab, index) => <Tab key={index} selected={index === this.state.selectedTabIndex} onClick={() => this.changeTab(index)}>{tab}</Tab>)}
                </Tabs>
                {this.props.panels[this.state.selectedTabIndex]}
            </TabContainer>
        );
    }
}

export default TabsComponent;