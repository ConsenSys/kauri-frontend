import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import TertiaryButton from "../Button/TertiaryButton";
import { Tooltip } from "react-tippy";
import {ShareButtons} from './ShareButtons';
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";

const containerWidth = 70;

const ReferenceContainer = styled.section`
  display: flex;
  width: ${containerWidth}px;
`;

const TooltipContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  padding: 15px 0px 15px 0px;
  padding: ${theme.space[2]}px 0px ${theme.space[2]}px 0px;
  width: ${containerWidth}px;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[1]}px;
  }
  > * {
    cursor: pointer;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
`;

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  top: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(-45deg);
  border-radius: 2px;
`;

const icon = (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="#0BA986"
      d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
      className=""
    />
  </svg>
);

const RuntimeProps = t.interface({
  color: t.string,
  title: t.string,
  url: t.string,
});

type Props = t.TypeOf<typeof RuntimeProps>;

export const Content: React.SFC<{ title: string; url: string }> = ({ url, title }) => (
  <TooltipContainer>
    <TooltipArrow />
    <ShareButtons url={url} title={title} />
  </TooltipContainer>
);

const Container: React.SFC<Props> = props => {
  const { url, title, color } = RuntimeProps.decode(props).getOrElseL(
    errors => {
      throw new Error(failure(errors).join("\n"));
    }
  );
  return (
    <ReferenceContainer>
      <Tooltip
        html={<Content url={url} title={title} />}
        position="bottom"
        trigger="click"
        unmountHTMLWhenHide={true}
      >
        <TertiaryButton color={color} icon={icon}>
          Share
        </TertiaryButton>
      </Tooltip>
    </ReferenceContainer>
  );
};

export default Container;
