import * as React from "react";
import styled from "../../lib/styled-components";
import Stack, { IStackStyledProps } from "stack-styled";
import { bgColor, BgColorProps } from "styled-system";

const ContentSectionStack = styled<BgColorProps & IStackStyledProps>(Stack)`
  ${bgColor};
  min-height: calc(100vh - 220px);
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`;

interface IProps {
  alignItems?: [string, string];
  bg?: string;
  justifyContent?: [string, string];
}

const ContentSection: React.FunctionComponent<IProps> = ({
  alignItems = ["", "start"],
  bg = "tertiaryBackgroundColor",
  children,
  justifyContent = ["", "start"],
}) => (
  <ContentSectionStack
    bg={bg}
    alignItems={alignItems}
    justifyContent={justifyContent}
    gridAutoFlow={["", "row"]}
  >
    {children}
  </ContentSectionStack>
);

export default ContentSection;
