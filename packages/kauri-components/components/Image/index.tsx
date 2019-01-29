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
  children?: any;
}

const Img = styled.div<ImgProps>`
    height: ${props => props.height};
    width: ${props => props.width};
    border-radius: ${props => props.borderRadius};
    background: ${props =>
      `${props.theme.colors.white} ${
        props.inView ? `url(${props.image})` : ``
      }`};
    background-size: cover;
    opacity: ${props => (props.inView ? 1 : 0)};
    transition: opacity 1s;
    border-top-left-radius: ${props => props.borderTopLeftRadius};
    border-top-right-radius ${props => props.borderTopRightRadius};
`;

const Image = (props: ImgProps) => (
  <InView>
    {({ inView, ref }) => (
      <div ref={ref}>
        <Img {...props} inView={inView}>
          {props.children}
        </Img>
      </div>
    )}
  </InView>
);
export default Image;
