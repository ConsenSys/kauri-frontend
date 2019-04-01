import * as React from "react";
import styled from "styled-components";
import Stack, { IStackStyledProps } from "stack-styled";
import { bgColor, BgColorProps } from "styled-system";
import theme from "../../lib/theme-config";

const ActionsSectionStack = styled<BgColorProps & IStackStyledProps>(Stack)`
  ${bgColor};
  width: 100%;
  padding: 15px ${props => props.theme.padding};
`;

export const ActionsContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${props => props.theme.primaryTextColor};
  & > div {
    z-index: 10;
  }
`;

export const MiddleActionsStack: React.FunctionComponent = ({ children }) => (
  <Stack
    alignItems={["", "center"]}
    justifyContent={["", "center"]}
    gridAutoFlow={["row"]}
    gap={20}
  >
    {children}
  </Stack>
);

export const RightActionsRow = styled.div`
  display: flex;
  align-self: center;
  justify-self: flex-end;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[2]}px;
  }
  > :last-child {
    margin-right: 0px;
  }
`;

interface IActionSection {
  justifyContent?: string[];
  gridAutoFlow?: string[];
  gridTemplateColumns?: string;
  alignItems?: string[];
  bg?: string;
  width?: string;
  gap?: number;
}

const ActionsSection: React.FunctionComponent<IActionSection> = ({
  alignItems = ["", "center"],
  bg = "bgPrimary",
  gap = theme.space[3],
  justifyContent = ["", "start"],
  gridAutoFlow = ["", "column"],
  gridTemplateColumns = "minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)",
  width = "100%",
  children,
}) => (
  <ActionsSectionStack
    alignItems={alignItems}
    bg={bg}
    width={width}
    gap={gap}
    justifyContent={justifyContent}
    gridAutoFlow={gridAutoFlow}
    gridTemplateColumns={gridTemplateColumns}
  >
    {children}
  </ActionsSectionStack>
);

export default ActionsSection;
