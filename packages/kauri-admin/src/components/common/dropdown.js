import React, { Component } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    position: relative;
`;

const DropdownHeader = styled.div`
&:hover {
    & > div {
        display: flex;
    }
}
`;

const DropdownContent = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    background: white;
    border-radius: 4px;
    position: absolute;
    flex-direction: column;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    z-index: 10;
    width: max-content;
    color: #0BA986;
`;

const DropdownListItem = styled.div`
    padding: 8px 16px;
    display: flex;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        color: #1E2428;
        padding-left: 24px;
        padding-right: 8px;
    }
`;


class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        return (
            <DropdownContainer
                onMouseEnter={() => this.setState({ open: !this.state.open })}>
                <DropdownHeader>{this.props.header}</DropdownHeader>
                <DropdownContent
                    onMouseLeave={() => this.setState({ open: false })}
                    open={this.state.open}>
                    {this.props.list.map((i, key) => <DropdownListItem key={key} onClick={i.action} >{i.name}</DropdownListItem>)}
                </DropdownContent>
            </DropdownContainer>
        );
    }
};

export default Dropdown;