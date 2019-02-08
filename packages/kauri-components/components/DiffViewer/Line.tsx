import styled from "../../lib/styled-components";
import { IDiff } from "./types";
import theme from '../../../kauri-web/lib/theme-config';
const JsDiff = require('diff');

const defaultCss = `
  & > pre {
    padding: ${theme.space[1]}px;
    background: ${theme.colors.bgPrimary};
    color: white;
    border-radius: 4px;
  }
  & > p > img {
    width: 100%;
  }
`;

const AddedLine = styled.div`
  margin-bottom: ${props => props.theme.space[1]}px;
  margin-top: 0;
  background: #e6ffed;
  color: #126511;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  & > * {
    & > add {
      background: rgb(172, 242, 189);
    }
  }
  ${defaultCss}
`;

const RemovedLine = styled.div`
  margin-top: ${props => props.theme.space[1]}px;
  margin-bottom: 0;
  background: #ffeef0;
  color: #800000;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  & > *  {
    & > del, & > * del {
      background: rgb(253, 184, 192);
      text-decoration: none;
    }
  }
  ${defaultCss}
`;

const Untouched = styled.p`
  ${defaultCss}
`;

const Line = (props: IDiff) => {
    if (props.added) {
      const wordDiff = JsDiff.diffChars(props.value, props.compareValue) as IDiff[];
      const updatedString = wordDiff.reduce((join: string, item: IDiff) => {
        if (item.removed) {
          item.value = `<add>${item.value}</add>`;
        } else if (item.added) {
          item.value = '';
        }
        return join + item.value;
      }, '');
      return (
        <AddedLine
          dangerouslySetInnerHTML={{
            __html: updatedString,
          }}
        />
      );
    } else if (props.removed) {
      const wordDiff = JsDiff.diffChars(props.value, props.compareValue) as IDiff[];
      const updatedString = wordDiff.reduce((join: string, item: IDiff) => {
        if (item.removed) {
          item.value = `<del>${item.value}</del>`;
        } else if (item.added) {
          item.value = '';
        }
        return join + item.value;
      }, '');
      return (
        <RemovedLine
          dangerouslySetInnerHTML={{
            __html: updatedString,
          }}
        />
      );
    } else {
      return (
        <Untouched dangerouslySetInnerHTML={{ __html: props.value.replace('\n', '<br />')}} />
      );
    }
  };

export default Line;