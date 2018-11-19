import * as React from "react";
import * as t from "io-ts";
import moment from "moment";
import { failure } from "io-ts/lib/PathReporter";
import styled from "../../lib/styled-components";
import {
  Title1,
  Label,
  PageDescription,
} from "../../../kauri-components/components/Typography";
import ShareArticle from "../../../kauri-components/components/Tooltip/ShareArticle";
import UserAvatar from "../../../kauri-components/components/UserAvatar";
import PrimaryButton from "../../../kauri-components/components/Button/PrimaryButton";

const CollectionHeaderSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 1;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: ${props => props.theme.space[1]}px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  color: white;
`;

const RightSide = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  > button:last-child {
    margin-top: ${props => props.theme.space[3]}px;
  }
`;

const changeRoute = (
  routeChangeAction: (route: string) => void,
  id: string
) => () => routeChangeAction(`/collection/${id}/update-collection`);

const RuntimeProps = t.interface({
  description: t.union([t.string, t.undefined]),
  id: t.string,
  linkComponent: t.any,
  name: t.string,
  ownerId: t.string,
  routeChangeAction: t.any,
  updated: t.string,
  url: t.string,
  userAvatar: t.union([t.string, t.undefined]),
  userId: t.string,
  username: t.union([t.string, t.undefined]),
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  const {
    description,
    id,
    linkComponent,
    name,
    ownerId,
    updated,
    url,
    userAvatar,
    username,
    userId,
    routeChangeAction,
  } = RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  return (
    <CollectionHeaderSection>
      <LeftSide>
        <Label>Updated {moment(updated).fromNow()}</Label>
        <Title1 color="white">{name}</Title1>
        <PageDescription color="white">{description}</PageDescription>
        <ShareArticle url={url} title={name} />
      </LeftSide>
      <RightSide>
        <Label color="ffffff">Curator</Label>
        {linkComponent ? (
          linkComponent(
            <UserAvatar
              variant="white"
              fullWidth={true}
              username={username ? username : "0x" + ownerId}
              avatar={userAvatar}
              userId={"0x" + ownerId}
            />
          )
        ) : (
          <UserAvatar
            variant="white"
            username={username ? username : "0x" + ownerId}
            avatar={userAvatar}
            fullWidth={true}
            userId={"0x" + ownerId}
          />
        )}
        {userId === ownerId ? (
          <PrimaryButton onClick={changeRoute(routeChangeAction, id)}>
            "Update Collection
          </PrimaryButton>
        ) : null}
      </RightSide>
    </CollectionHeaderSection>
  );
};

export default Container;