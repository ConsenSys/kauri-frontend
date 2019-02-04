import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import { H4, ListBulletPoint } from "../Typography";
import TextTruncate from 'react-text-truncate';

const handleClick = (heading: string) => (
  event: React.MouseEvent<HTMLElement>
) => {
  event.preventDefault();

  const newHeading = heading
    .replace(/[\W_]+/g,"")
    .toLowerCase();
  const headerDOMNode = document.getElementById(newHeading);

  if (headerDOMNode) {
    headerDOMNode.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      window.location.hash = newHeading;
    }, 700);
  }
};

const RuntimeProps = t.interface({ heading: t.string });

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  const { heading } = RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  return (
    <ListBulletPoint>
      <H4 hoverColor={"hoverTextColor"} onClick={handleClick(heading)}>
        <TextTruncate
            line={2}
            truncateText="…"
            text={heading}
        />
      </H4>
    </ListBulletPoint>
  );
};

export default Container;
