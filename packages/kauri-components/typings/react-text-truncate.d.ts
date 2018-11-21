declare module "react-text-truncate" {
  import * as React from "react";

  interface IProps {
    line: number;
    truncateText: string;
    text: string;
  }
  const TextTruncate: React.SFC<IProps>;
  export default TextTruncate;
}
