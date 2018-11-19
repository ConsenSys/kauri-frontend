import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
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
  height: ${avatarSize} px;
  width: ${avatarSize} px;
`;

const RuntimeProps = t.interface({
  avatar: t.string,
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  const { avatar } = RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  return (
    <AvatarContainer>
      <Logo src={avatar} />
    </AvatarContainer>
  );
};

export default Container;
