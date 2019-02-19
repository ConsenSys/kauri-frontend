import styled, { css } from "styled-components";

interface IProps {
  chosenCategory: string;
  height: number;
  width: number;
  avatarWidth: number;
  avatarHeight: number;
  type: string;
}

const articleMaskCss = css`
  height: 96px;
  width: 96px;
`;

export const Mask = styled<
  { height?: number; width?: number; type: string; avatarHeight?: number },
  "div"
>("div")`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: ${props => props.height || "76"}px;
  width: ${props => props.width || "76"}px;
  border-radius: 4px;
  background-color: #ffffff;
  ${props => props.type === "article" && articleMaskCss};
`;

const Logo = styled<{ avatarHeight?: number }, "img">("img")`
  max-height: ${props => props.avatarHeight || "37.71"}px;
  max-width: 55px;
`;

export const CreateRequestLogo = ({
  chosenCategory,
  height,
  width,
  avatarHeight,
  type,
}: IProps) => (
  <Mask height={height} width={width} type={type}>
    {chosenCategory ? (
      <Logo
        avatarHeight={type === "article" ? 46 : avatarHeight}
        src={`/static/images/${chosenCategory}/avatar.png`}
      />
    ) : (
      <Logo
        avatarHeight={type === "article" ? 46 : avatarHeight}
        src={`/static/images/help-logo.svg`}
      />
    )}
  </Mask>
);
