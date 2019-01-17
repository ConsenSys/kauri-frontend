import * as React from "react";
import styled from "../../lib/styled-components";
import Stack, { IStackStyledProps } from "stack-styled";
import { bgColor, BgColorProps } from "styled-system";
import theme from "../../lib/theme-config";

const ContentSectionStack = styled<BgColorProps & IStackStyledProps>(Stack)`
  ${bgColor};
  min-height: calc(100vh - 220px);
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`;

interface IProps {
  alignItems?: [string, string];
  bg?: string;
  justifyContent?: [string, string];
  gridAutoFlow?: [string, string];
  gap?: number;
}

const ContentSection: React.FunctionComponent<IProps> = ({
  alignItems = ["", "start"],
  bg = "tertiaryBackgroundColor",
  children,
  justifyContent = ["", "start"],
  gridAutoFlow = ["", "row"],
  gap = theme.space[3],
}) => (
  <ContentSectionStack
    bg={bg}
    alignItems={alignItems}
    justifyContent={justifyContent}
    gridAutoFlow={gridAutoFlow}
    gap={gap}
  >
    {children}
  </ContentSectionStack>
);

export default ContentSection;
