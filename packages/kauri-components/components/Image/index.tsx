import styled from "../../lib/styled-components";
import { InView } from "react-intersection-observer";

interface ImgProps {
  image: string;
  height?: string;
  width: string;
  borderRadius?: string;
  inView?: boolean;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  children?: any;
  overlay?: {
    color?: string;
    opacity: number;
  };
  asBackground?: boolean;
  delay?: number;
}

const Img = styled.div<ImgProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  ${props => props.borderRadius && `border-radius: ${props.borderRadius}`};
  background: ${props =>
    `${props.inView ? `url(${props.image}) center center` : ``}`};
  background-size: cover;
  opacity: ${props => (props.inView ? 1 : 0)};
  transition: opacity ${props => props.delay || 0.4}s;
  ${props =>
    props.borderTopLeftRadius &&
    `border-top-left-radius: ${props.borderTopLeftRadius}`};
  ${props =>
    props.borderTopRightRadius &&
    `border-top-right-radius: ${props.borderTopRightRadius}`};
  position: ${props => (props.asBackground ? "absolute" : "relative")};

  ${props =>
    props.overlay &&
    `&:after {
      content: "";
      opacity: ${props.overlay.opacity};
      background: ${props.overlay.color || props.theme.colors.bgPrimary};
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      ${props.borderRadius && `border-radius: ${props.borderRadius}`};
      ${props.borderTopLeftRadius &&
        `border-top-left-radius: ${props.borderTopLeftRadius}`};
      ${props.borderTopRightRadius &&
        `border-top-right-radius: ${props.borderTopRightRadius}`};
      ${props.borderBottomLeftRadius &&
        `border-bottom-left-radius: ${props.borderBottomLeftRadius}`};
      ${props.borderBottomRightRadius &&
        `border-bottom-right-radius: ${props.borderBottomRightRadius}`};
    }`}
`;

const Image = (props: ImgProps) => (
  <InView>
    {({ inView, ref }) => (
      <Img innerRef={ref} {...props} inView={inView}>
        {props.children}
      </Img>
    )}
  </InView>
);
export default Image;
