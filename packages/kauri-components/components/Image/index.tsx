import styled from "../../lib/styled-components";
import { InView } from "react-intersection-observer";

interface ImgProps {
  image: string;
  height?: number | string;
  width: number | string;
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

const getURL = (
  url: string,
  height?: number | string,
  width?: number | string
) => {
  if (true) {
    const heightParam = typeof height === "number" ? `h_${height},` : "";
    const widthParam = typeof width === "number" ? `w_${width},` : "w_2560,";
    return `https://res.cloudinary.com/${
      process.env.cloudinaryId
    }/image/fetch/${widthParam}${heightParam}c_mfit,f_auto/${url}`;
  } else {
    return url;
  }
};

const Img = styled.div<ImgProps>`
  height: ${props =>
    typeof props.height === "number" ? `${props.height}px` : props.height};
  width: ${props =>
    typeof props.width === "number" ? `${props.width}px` : props.width};
  ${props => props.borderRadius && `border-radius: ${props.borderRadius}`};
  background: ${props =>
    `${
      props.inView
        ? `url(${getURL(props.image, props.height, props.width)}) center center`
        : ``
    }`};
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
    {({ inView, ref }: any) => (
      <Img innerRef={ref} {...props} inView={inView}>
        {props.children}
      </Img>
    )}
  </InView>
);
export default Image;
