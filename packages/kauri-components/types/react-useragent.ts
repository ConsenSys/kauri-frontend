// @ts-ignore
declare module "@quentin-sommer/react-useragent" {
  import * as React from "react";

  interface IAvailableProps {
    computer?: boolean;
    windows?: boolean;
    linux?: boolean;
    mac?: boolean;
    mobile?: boolean;
    tablet?: boolean;
    android?: boolean;
    ios?: boolean;
    firefox?: boolean;
    chrome?: boolean;
    edge?: boolean;
    safari?: boolean;
  }

  const UserAgentProvider: React.FunctionComponent<{ ua: any }>;
  const UserAgent: React.FunctionComponent<
    IAvailableProps & { children(props: boolean): React.ReactElement<any> }
  >;

  export { UserAgentProvider, UserAgent };
}
