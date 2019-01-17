declare module "stack-styled" {
  export interface IStackStyledProps {
    alignItems: string[];
    justifyContent: string[];
    gridAutoFlow: string[];
  }

  import styled from "styled-components";
  import * as React from "react";

  const Stack: React.ComponentType<IStackStyledProps>;

  export default Stack;
}
