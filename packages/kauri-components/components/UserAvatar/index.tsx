import React from "react";
import styled from "../../lib/styled-components";
import { H5, H6 } from "../Typography";
import userIdTrim from "../../../kauri-web/lib/userid-trim";
import Image from "../Image";

interface IContainerProps {
  fullWidth: boolean;
  imageURL?: string | null;
  variant: "white" | undefined;
  color: string | undefined;
  cardType?: "COLLECTION" | "ARTICLE";
  hideUsername?: boolean;
}

const Container = styled<IContainerProps, "div">("div")`
  display: flex;
  align-items: center;
  width: ${props =>
    props.fullWidth ? "100%" : props.hideUsername ? "inherit" : "140px"};
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
  height?: number;
  width?: number;
  borderRadius?: "4px";
}

const Avatar = styled<IAvatarProps, "div">("div")`
  display: flex;
  height: ${props => (props.height ? `${props.height}px` : "30px")};
  width: ${props => (props.width ? `${props.width}px` : "30px")};
  justify-content: center;
  align-items: center;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "4px")};
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

export interface IProps {
  color?: string;
  avatar: string | null;
  username: string | null;
  userId: string;
  imageURL?: string | null;
  fullWidth?: boolean;
  variant?: "white";
  cardType?: "COLLECTION" | "ARTICLE";
  height?: number;
  width?: number;
  hideUsername?: boolean;
  borderRadius?: string;
  name?: string | null | undefined;
}

const UserAvatarComponent: React.SFC<IProps> = props => (
  <Container
    key={props.userId}
    hideUsername={props.hideUsername}
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
      height={props.height ? props.height : 30}
      width={props.width ? props.width : 30}
    >
      {typeof props.avatar === "string" && props.avatar.length > 1 ? (
        <Image
          borderRadius={props.borderRadius ? props.borderRadius : "4px"}
          image={props.avatar}
          height={props.height ? props.height : 30}
          width={props.width ? props.width : 30}
        />
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
          {props.name
            ? props.name.charAt(0)
            : props.username
            ? props.username.charAt(0)
            : typeof props.userId === "string"
            ? props.userId.charAt(0)
            : "A"}
        </H6>
      )}
    </Avatar>
    {!props.hideUsername && (
      <H5>
        {props.name ||
          props.username ||
          (props.userId && userIdTrim(props.userId)) ||
          "Anonymous"}
      </H5>
    )}
  </Container>
);

export default UserAvatarComponent;
