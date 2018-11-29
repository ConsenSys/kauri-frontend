import React, { Component } from "react";
import styled from "../../lib/styled-components";

const Column = styled.div`
  flex: 1;
  flex-direction: column;
  & > div {
    margin-top: ${props => props.theme.space[3]}px;
    margin-left: ${props => props.theme.space[3] / 2}px;
    margin-right: ${props => props.theme.space[3] / 2}px;
  }
`;

const MasonryContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

interface IProps {
  minWidth: number;
  columns: number;
  children: Array<React.ReactElement<any>>;
}

interface IState {
  minWidth: number;
  columns: number;
  numCol: number;
}

class Masonry extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      columns: props.columns,
      minWidth: props.minWidth,
      numCol: (global as any).window
        ? props.columns <= Math.floor(window.innerWidth / props.minWidth)
          ? props.columns
          : Math.floor(window.innerWidth / props.minWidth)
        : 1,
    };

    this.updateColumns = this.updateColumns.bind(this);
  }

  public updateColumns() {
    const newMaxCol = Math.floor(window.innerWidth / this.props.minWidth);
    const newNumCol =
      this.props.columns <= newMaxCol ? this.props.columns : newMaxCol;
    if (newNumCol !== this.state.numCol) {
      this.setState({ numCol: newNumCol });
    }
  }

  public componentDidMount() {
    window.addEventListener("resize", this.updateColumns);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateColumns);
  }

  public render() {
    const { children } = this.props;
    const columnsArray: Array<Array<React.ReactElement<any>>> = [];
    for (let j = 0; j < this.state.numCol; j++) {
      columnsArray.push([]);
    }

    for (let i = 0; i < children.length; i++) {
      const columnIndex = i % this.state.numCol;
      columnsArray[columnIndex].push(children[i]);
    }
    return (
      <MasonryContainer>
        {columnsArray.map((i, index) => (
          <Column key={index}>{i}</Column>
        ))}
      </MasonryContainer>
    );
  }
}

export default Masonry;
