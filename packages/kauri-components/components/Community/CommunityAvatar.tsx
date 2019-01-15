import * as React from "react";
import styled from "../../lib/styled-components";

const containerSize = 96;
const avatarSize = 54;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${containerSize}px;
  width: ${containerSize}px;
  border-radius: 4px;
  background-color: white;
`;

const Logo = styled.img`
  height: ${avatarSize}px;
  width: ${avatarSize}px;
`;

interface IProps {
  avatar: null | string;
}

const Container: React.SFC<IProps> = ({ avatar }) => {
  return <AvatarContainer>{avatar && <Logo src={avatar} />}</AvatarContainer>;
};

export default Container;
