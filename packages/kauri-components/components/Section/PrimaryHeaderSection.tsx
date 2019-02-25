// @flow
import * as React from "react";
import styled, { css } from "../../lib/styled-components";
import Stack, { IStackStyledProps } from "stack-styled";
import { bgColor, BgColorProps } from "styled-system";

const withBackgroundURLCss = css<{ backgroundURL?: string }>`
  background: ${props =>
    props.backgroundURL &&
    `url(${props.backgroundURL.replace("dev2", "beta")}) center center`};
  background-size: cover;
  margin-top: -76px;
  padding-top: 106px;
  padding-bottom: 50px;
  box-shadow: inset 0px 0px 140px 120px rgba(0, 0, 0, 0.5);
`;

const PrimaryHeaderSectionStack = styled<
  { backgroundURL?: string } & IStackStyledProps & BgColorProps
>(Stack)`
  ${bgColor};
  min-height: 250px;
  padding: 0px ${props => props.theme.padding};
  ${props => props.backgroundURL && withBackgroundURLCss};
`;

interface IPrimaryHeaderSectionProps {
  bg?: string;
  backgroundURL?: string;
  gridTemplateColumns?: string;
  justifyContent?: string[];
}

const PrimaryHeaderSection: React.FunctionComponent<
  IPrimaryHeaderSectionProps
> = ({
  bg = "bgPrimary",
  backgroundURL,
  gridTemplateColumns = "minmax(auto, 1fr) minmax(auto, 1fr)",
  justifyContent = ["", "start"],
  children,
}) => (
  <PrimaryHeaderSectionStack
    gap={30}
    backgroundURL={backgroundURL}
    bg={bg}
    justifyContent={justifyContent}
    alignItems={["", "center"]}
    gridAutoFlow={["", "column"]}
    gridTemplateColumns={gridTemplateColumns}
  >
    {children}
  </PrimaryHeaderSectionStack>
);

export default PrimaryHeaderSection;
