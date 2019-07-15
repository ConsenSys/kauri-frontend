import React from "react";
import styled from "../../lib/styled-components";
import Stack from "stack-styled";
import theme from "../../lib/theme-config";

const columnWidth = `${theme.DEFAULT_CARD_WIDTH}px`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

interface IProps {
  setRef: any;
}

const ChooseArticleContent: React.FunctionComponent<IProps> = ({
  children,
  setRef,
}) => (
  <Content ref={(ref: any) => setRef && setRef(ref)}>
    <Stack
      gridAutoFlow={[""]}
      alignItems={[""]}
      justifyContent={["", "center"]}
      gap={30}
      gridTemplateColumns={`${columnWidth} ${columnWidth} ${columnWidth}`}
    >
      {children}
    </Stack>
  </Content>
);

export default ChooseArticleContent;
