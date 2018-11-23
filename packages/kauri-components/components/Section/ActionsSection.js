// @flow
import * as React from "react";
import styled from "styled-components";
import Stack from "stack-styled";
import { bgColor } from "styled-system";

const ActionsSectionStack = styled(Stack)`
  ${bgColor};
  width: 100%;
  padding: 15px ${props => props.theme.padding};
`;

type ActionSectionType = {
  bg?: string,
  children?: React.Node,
};

const ActionsSection = ({ bg = "bgPrimary", children }: ActionSectionType) => (
  <ActionsSectionStack
    bg={bg}
    justifyContent={["", "start"]}
    gridAutoFlow={["", "column"]}
    gridTemplateColumns="minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)"
  >
    {children}
  </ActionsSectionStack>
);

export default ActionsSection;
