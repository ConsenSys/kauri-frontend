import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import { Label } from "../Typography";
import OutlineHeading from "./OutlineHeading";
import styled from "../../lib/styled-components";
import UserAvatarComponent from "../UserAvatar";
import NFTList, { INFT } from '../Kudos/NFTList';

const OutlineContainer = styled.div`
  width: 300px;
  margin-top: ${props => props.theme.space[1]}px;
`;

const List = styled.ul`
  padding-left: ${props => props.theme.space[2]}px;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${props => props.theme.colors.divider};
  margin: ${props => props.theme.space[2]}px 0px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;


const RuntimeProps = t.interface({
  headings: t.array(t.string),
  linkComponent: t.union([t.undefined, t.any]),
  nfts: t.any,
  text: t.string,
  userAvatar: t.union([t.null, t.string]),
  userId: t.string,
  username: t.union([t.null, t.string]),
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  const {
    headings,
    linkComponent,
    text,
    userId,
    userAvatar,
    username,
    nfts,
  } = RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  return (
    <OutlineContainer>
      {Array.isArray(headings) && headings.length > 0 && (
        <React.Fragment>
          <Label>Outline</Label>
          <List>
            {headings.map((heading, index) => (
              <OutlineHeading key={index} heading={heading} />
            ))}
          </List>
          <Divider />
        </React.Fragment>
      )}
      <UserContainer>
        <Label textTransform="uppercase">{text}</Label>
        {linkComponent ? (
          linkComponent(
            <UserAvatarComponent
              userId={userId}
              avatar={userAvatar}
              username={username}
            />
          )
        ) : (
          <UserAvatarComponent
            userId={userId}
            avatar={userAvatar}
            username={username}
          />
        )}
      </UserContainer>
      <Divider />
      {nfts && nfts.length > 0 && <><Label>Article Kudos</Label>
      <NFTList nftSize={30} nfts={nfts} />
      <Divider /></>}
    </OutlineContainer>
  );
};

export default Container;
