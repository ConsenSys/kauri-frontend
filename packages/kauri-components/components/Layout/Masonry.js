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

const Masonry = ({ columns, children }) => {
    const columnsArray = [];
    for (let j = 0; j < columns; j++) {
        columnsArray.push([]);
    }

    for (let i = 0; i < children.length; i ++) {
        const columnIndex = i % columns;
        columnsArray[columnIndex].push(children[i]);
    }
    return <MasonryContainer>
        {columnsArray.map(i => <Column>{i}</Column>)}
    </MasonryContainer>
}


export default Masonry;