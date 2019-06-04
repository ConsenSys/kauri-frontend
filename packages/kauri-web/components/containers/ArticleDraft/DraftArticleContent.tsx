import Showdown from "showdown";

const converter = new Showdown.Converter();

interface IProps {
  content: string;
}

export default ({ content }: IProps) => (
  <div
    dangerouslySetInnerHTML={{
      __html: converter.makeHtml(JSON.parse(content).markdown),
    }}
  />
);
