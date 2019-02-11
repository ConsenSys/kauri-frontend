import styled from "../../lib/styled-components";
import ReactDiffViewer from "react-diff-viewer";

interface IProps {
  current: string;
  proposed: string;
}

const Content = styled.div`
  font-size: ${props => props.theme.fontSizes[3]}px;
  width: 100%;
  background: white;
`;

const Line = styled.span`
  font-family: 'Roboto'
`;

const styleObj = {
  diffAdded: {
    maxWidth: '95vh',
    padding: 4,
  }, // style object
  diffRemoved: {
    maxWidth: '95vh',
    padding: 4,
  }, // style object
  gutter: {
    display: 'none'
  },
  line: {
    fontFamily: "Roboto",
  },
  lineNumber: {
    display: "none",
  }, // style object
  marker: {
    display: "none",
  }, // style object
  wordAdded: { fontWeight: 700, color: "#006d27 !important" }, // style object
  wordRemoved: { fontWeight: 700, color: "#960016 !important" }, // style object
};

const renderLine = (str: string) => {
  return <Line>{str}</Line>;
}


const Diffs = ({ current, proposed }: IProps) => {
  return (
    <Content className="DiffViewer">
      <ReactDiffViewer
        oldValue={current}
        newValue={proposed}
        splitView={false}
        styles={styleObj}
        renderContent={renderLine}
      />
    </Content>
  );
};

export default Diffs;
