import React from "react";
import styled from "../../lib/styled-components";
import { H5, H6 } from "../Typography";
import userIdTrim from "../../../kauri-web/lib/userid-trim";

interface IContainerProps {
  fullWidth: boolean;
  imageURL?: string | null;
  variant: "white" | undefined;
  color: string | undefined;
  cardType?: "COLLECTION" | "ARTICLE";
}

const Container = styled<IContainerProps, "div">("div")`
  display: flex;
  align-items: center;
  width: ${props => !props.fullWidth && "140px"};
  > :first-child {
    margin-right: ${props => props.theme.space[1]}px;
  }
  > :nth-child(2) {
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: ${props => !props.fullWidth && "100px"};
    color: ${props => {
      if (props.imageURL && props.cardType === "COLLECTION") {
        return "white";
      }
      if (props.variant === "white") {
        return "white";
      }
      if (props.color) {
        return props.theme.colors[props.color];
      }
      return props.theme.colors.textPrimary;
    }};
  }
`;

interface IAvatarProps {
  variant: "white" | undefined;
  avatar: string | "none" | null;
  color: string;
}

const Avatar = styled<IAvatarProps, "div">("div")`
  display: flex;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${props =>
    props.avatar
      ? "none"
      : props.variant === "white"
      ? props.theme.colors.white
      : props.theme.colors.textPrimary};
  > * {
    color: ${props =>
      props.variant === "white"
        ? props.theme.colors.textPrimary
        : props.theme.colors[props.color]};
    text-transform: uppercase;
    line-height: 10px;
  }
`;

const ProfileImage = styled<{ avatar: string | "none" }, "div">("div")`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-position: center center;
  background: url(${props => props.avatar}) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

interface IProps {
  color?: string;
  avatar: string | null;
  username: string | null;
  userId: string;
  imageURL?: string | null;
  fullWidth?: boolean;
  variant?: "white";
  cardType?: "COLLECTION" | "ARTICLE";
}

const UserAvatarComponent: React.SFC<IProps> = props => (
  <Container
    cardType={props.cardType}
    variant={props.variant}
    color={typeof props.color === "string" ? props.color : "textPrimary"}
    imageURL={props.imageURL}
    fullWidth={Boolean(props.fullWidth)}
  >
    <Avatar
      variant={props.variant}
      color={typeof props.color === "string" ? props.color : "white"}
      avatar={props.avatar}
    >
      {typeof props.avatar === "string" && props.avatar.length > 1 ? (
        <ProfileImage avatar={props.avatar} />
      ) : (
        <H6
          color={
            props.variant === "white"
              ? "textPrimary"
              : props.color
              ? props.color
              : "white"
          }
        >
          {props.username
            ? props.username.charAt(0)
            : typeof props.userId === "string"
            ? props.userId.charAt(0)
            : "A"}
        </H6>
      )}
    </Avatar>
    <H5>
      {props.username
        ? props.username
        : typeof props.userId === "string"
        ? props.userId.length > 15
          ? userIdTrim(props.userId)
          : props.userId
        : "Anonymous"}
    </H5>
  </Container>
);

export default UserAvatarComponent;
