import React, { Component } from 'react';
import styled from 'styled-components';

const Column = styled.div`
    flex: 1;
    flex-direction: column;
    & > div {
        margin-top: ${props => props.theme.space[3]}px;
        margin-left: ${props => props.theme.space[3]/2}px;
        margin-right: ${props => props.theme.space[3]/2}px;
    }
`;

const MasonryContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

class Masonry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minWidth: props.minWidth,
            columns: props.columns,
            numCol: props.columns <= Math.floor(window.innerWidth / props.minWidth) ? props.columns : Math.floor(window.innerWidth / props.minWidth),
        }

        this.updateColumns = this.updateColumns.bind(this);
    }

    updateColumns () {
        const newMaxCol = Math.floor(window.innerWidth / this.props.minWidth)
        const newNumCol = this.props.columns <= newMaxCol ? this.props.columns : newMaxCol
        if (newNumCol !== this.state.numCol) this.setState({ numCol:newNumCol  })
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateColumns);
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateColumns);
    }

    render () {
        const { children } = this.props;
        const columnsArray = [];
    
        for (let j = 0; j < this.state.numCol; j++) {
            columnsArray.push([]);
        }
    
        for (let i = 0; i < children.length; i ++) {
            const columnIndex = i % this.state.numCol;
            columnsArray[columnIndex].push(children[i]);
        }
        return <MasonryContainer>
            {columnsArray.map(i => <Column>{i}</Column>)}
        </MasonryContainer>
    }
    
}

export default Masonry;