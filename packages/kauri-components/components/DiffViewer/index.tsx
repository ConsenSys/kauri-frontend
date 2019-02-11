import styled from "../../lib/styled-components";
import ReactDiffViewer from "react-diff-viewer";

interface IProps {
  current: string;
  proposed: string;
}

const Content = styled.div`
  padding: ${props => props.theme.space[3]}px;
  font-size: ${props => props.theme.fontSizes[3]}px;
  width: 100%;
  background: white;
`;

const styleObj = {
  diffAdded: {
    padding: 4,
  }, // style object
  diffContainer: {
    fontFamily: "Roboto",
  }, // style object
  diffRemoved: {
    padding: 4,
  }, // style object
  lineNumber: {
    display: "none",
  }, // style object
  marker: {
    display: "none",
  }, // style object
  wordAdded: { fontWeight: 700, color: "#006d27 !important" }, // style object
  wordRemoved: { fontWeight: 700, color: "#960016 !important" }, // style object
};

const Diffs = ({ current, proposed }: IProps) => {
  return (
    <Content>
      <ReactDiffViewer
        oldValue={current}
        newValue={proposed}
        splitView={false}
        styles={styleObj}
      />
    </Content>
  );
};

export default Diffs;
