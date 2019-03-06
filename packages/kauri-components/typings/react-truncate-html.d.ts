declare module "react-truncate-html" {
  import * as React from "react";

  interface IProps {
    lines: number;
    breakWord?: boolean;
    dangerouslySetInnerHTML: { __html: string };
    className?: string;
  }

  const Truncate: React.SFC<IProps>;
  export default Truncate;
}
