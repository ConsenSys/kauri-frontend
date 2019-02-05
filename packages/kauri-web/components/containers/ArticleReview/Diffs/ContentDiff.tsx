import Showdown from "showdown";
import styled from "../../../../lib/styled-components";
import { IDiff } from "../types";

Showdown.extension("highlightjs", () => {
  return [
    {
      regex: new RegExp("<code \\b[^>]*>", "g"),
      replace: '<code class="hljs">',
      type: "output",
    },
  ];
});

interface IProps {
  contentDiff: IDiff[];
}

const Content = styled.div`
  max-width: 960px;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
  font-size: ${props => props.theme.fontSizes[3]}px;
`;

const converter = new Showdown.Converter({
  extensions: ["highlightjs"],
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
});

const Added = styled.div`
  margin-bottom: ${props => props.theme.space[1]}px;
  background: #e6ffed;
  color: #126511;
`;

const Removed = styled.div`
  margin-top: ${props => props.theme.space[1]}px;
  background: #ffeef0;
  color: #800000;
  text-decoration: line-through;
`;

const Untouched = styled.div``;

const Diff = (props: IDiff) => {
  if (props.added) {
    return (
      <Added
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(props.value as string),
        }}
      />
    );
  } else if (props.removed) {
    return (
      <Removed
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(props.value as string),
        }}
      />
    );
  } else {
    return (
      <Untouched
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(props.value as string),
        }}
      />
    );
  }
};

const Diffs = (props: IProps) => (
  <Content>
    {props.contentDiff.map((i: IDiff, key: number) => (
      <Diff key={key} {...i} />
    ))}
  </Content>
);

export default Diffs;
