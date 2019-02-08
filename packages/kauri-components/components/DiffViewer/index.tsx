import styled from "../../lib/styled-components";
import Line from './Line';
// tslint:disable-next-line
const JsDiff = require('diff');

interface IProps {
  current: string;
  proposed: string;
}

const Content = styled.div`
  padding: ${props => props.theme.space[3]}px;
  font-size: ${props => props.theme.fontSizes[3]}px;
`;

const Diffs = ({ current, proposed}: IProps) => {
  const contentDiff = JsDiff.diffLines(current, proposed);
  return (
    <Content>
      {contentDiff.map((i: any, key: number) => {
        const compareValue = i.removed ? contentDiff[key+ 1].value : i.added ? contentDiff[ key - 1].value : null;
        return(
          <Line compareValue={compareValue} key={key} {...i} />
        )}
      )}
    </Content>
)};

export default Diffs;
